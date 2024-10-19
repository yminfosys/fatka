var express = require('express');
var router = express.Router();
var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');
var dotenv=require('dotenv').config();
const moment=require('moment');



const bcrypt = require('bcrypt');
const { ExplainVerbosity } = require('mongodb');
const saltRounds = 10;


/* GET home page. */
router.get('/', async function(req, res, next) {
    try {
      // await dbCon.connectDB();
      // await dbCon.closeDB();
      //console.log(req.query)
      if(req.query.side && req.query.refid){
       var sponsID= req.query.refid
       var sponsSide =req.query.side
       
      }else{
        var sponsID= "";
        var sponsSide = "";
      }
      var allredylogin=req.cookies.traningUserID;
      res.render('training/trainingUser',{allredylogin:allredylogin,sponsID:sponsID,sponsSide:sponsSide})
    }catch (error) {
      console.log(error);
      return error;
    }
    
  });

  router.post('/loginprocess', async function(req, res, next) {
    try {
      await dbCon.connectDB();
      const user= await db.traininguser.findOne({email:req.body.loginEmail})
      ///console.log(user);
      await dbCon.closeDB();
      if(user){
        bcrypt.compare(req.body.loginPassword,user.password, async function(err,match){
          if(match){
            res.cookie("traningUserID", user.userID, { maxAge:  24 * 60 * 60 * 1000 });
            res.json(user);
          }else{
            res.send(null);
          }
        })
      }else{
        res.send(null);
      }
      
      
    }catch (error) {
      console.log(error);
      return error;
    }
  
  });

  router.post('/logout', async function(req, res, next) {
    res.clearCookie("traningUserID");
    res.send("ok")
  
  })




  router.post('/GetUser', async function(req, res, next) {
    try {
    await dbCon.connectDB();
    const user= await db.traininguser.findOne({userID:req.body.userID});
    await dbCon.closeDB();
    //console.log("check done")
    res.json(user)
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });



  
  
  router.post('/checkExistuser', async function(req, res, next) {
    try {
    await dbCon.connectDB();
    const user= await db.traininguser.findOne({$or: [{mobile:req.body.mobileNo},{email:req.body.email}]});
    await dbCon.closeDB();
    //console.log("check done")
    res.json(user)
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });

  router.post('/newregister', async function(req, res, next) {
    try {
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {

      auto_incriment.auto_incriment("trainingUserID").then(async function(inc_val){
        const parentID = await  findParent(req.body.refID, req.body.parentSide)
        console.log(parentID)
        await dbCon.connectDB();
        const user = await db.traininguser.findOne({userID:parentID}) ;
        if(req.body.parentSide=="L"){
          var rootID=''+user.rootID+'-'+1+'';
        }else{
          var rootID=''+user.rootID+'-'+2+'';
        }

         
          const register= await db.traininguser({
            userName:req.body.userName,
            userID:'RR-'+inc_val+'',
            rootID:rootID,
            parentID:parentID,
            directParentID:req.body.refID,
            parentSide:req.body.parentSide,
            activationPin:"",
            email:req.body.email,
            password:hash,
            mobile:req.body.mobileNo,
            varyficatinStatus:"NotVerify"
          })
          await register.save();
          await dbCon.closeDB();
          res.send("ok");
      })
    })
   
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });

  async function findParent(refID,Side){
    var parentID="";
    var id=refID;
    try {
      await dbCon.connectDB();
   
      for ( var i=0; i<1000000000; i++) {
        const user = await db.traininguser.findOne({parentID:id,parentSide:Side}) ;
        if(!user){
          parentID=id;
          i= 1000000000+10;
          break;
        }
        id=user.userID;
       
        
      }
      await dbCon.closeDB();

      return parentID;
      
    } catch (error) {
    console.log(error);
    return error;
  }

  }

  router.post('/activateAccountUser', async function(req, res, next) {
    try {
    await dbCon.connectDB();
    const user= await db.traininguser.findOne({activationPin:req.body.activationPinNo,userID:req.body.userID});
    if(user){
      const use= await db.traininguser.findOneAndUpdate({userID:req.body.userID},{$set:{
        varyficatinStatus:"Verify",
        activationDate: new Date()
      }});
      await dbCon.closeDB();
      res.send("ok");
    }else{
      await dbCon.closeDB();
      res.send("worng");
    }
    //console.log("check done")
   // res.json(user)
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });

  router.post('/getGeonologyNode', async function(req, res, next) {
    try {
      console.log(req.body)
    await dbCon.connectDB();
    const root= await db.traininguser.findOne({userID:req.body.userID});
    const rootLeft= await db.traininguser.findOne({parentID:req.body.userID,parentSide:"L"});
    const rootRight= await db.traininguser.findOne({parentID:req.body.userID,parentSide:"R"});
    await dbCon.closeDB();
    var left = "";
    var right = "";
    var leftName = "";
    var rightName = "";
    var leftVeryfy = "";
    var rightVeryfy = ""
    if(rootLeft){
      left=rootLeft.userID;
      leftVeryfy=rootLeft.varyficatinStatus;
      leftName=rootLeft.userName;
    }
    if(rootRight){
      right=rootRight.userID;
      rightVeryfy=rootRight.varyficatinStatus;
      rightName=rootRight.userName;
    }
    //console.log(root)
    res.json({
      root:root.userID,
      rootName:root.userName,
      rootLeft:left,
      leftName:leftName,
      rootRight:right,
      rightName :rightName,
      rootVerify:root.varyficatinStatus,
      leftVeryfy:leftVeryfy,
      rightVeryfy:rightVeryfy
    });
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });

  router.post('/generalData', async function(req, res, next) {
    try {
    await dbCon.connectDB();
    const user = await db.traininguser.findOne({userID:req.body.userID});
    const leftCount = await db.traininguser.countDocuments({rootID: { $regex: '.*' + user.rootID + '-1.*' , $options: 'i' } } );
    const rightCount = await db.traininguser.countDocuments({rootID: { $regex: '.*' + user.rootID + '-2.*' , $options: 'i' } } );
    const leftVerify = await db.traininguser.countDocuments({rootID: { $regex: '.*' + user.rootID + '-1.*' , $options: 'i' }, varyficatinStatus:"Verify" } );
    const rightVerify = await db.traininguser.countDocuments({rootID: { $regex: '.*' + user.rootID + '-2.*' , $options: 'i' }, varyficatinStatus:"Verify" } );
    await dbCon.closeDB();
    res.json({
      leftCount:leftCount,
      rightCount:rightCount,
      leftVerify:leftVerify,
      rightVerify:rightVerify
    })
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });


router.post('/mydirect', async function(req, res, next) {
    try {
    await dbCon.connectDB();
    const direct = await db.traininguser.countDocuments({directParentID:req.body.userID});
    const directVerify = await db.traininguser.countDocuments({directParentID:req.body.userID, varyficatinStatus:"Verify"});
    const myDirect = await db.traininguser.find({directParentID:req.body.userID, varyficatinStatus:"Verify"});

    await dbCon.closeDB();
    res.json({
      direct:direct,
      directVerify:directVerify,
      myDirect:myDirect
    })
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });




  router.post('/earningData',  async function(req, res, next) {
    try {
      await dbCon.connectDB();
      const benifit = await db.benifit.findOne({userID:req.body.userID});
      await dbCon.closeDB();
      res.json(benifit)
  } catch (error) {
    console.log(error);
    return error;
  }
  
  });

  



   



router.post('/earningCalculation',  async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user = await db.traininguser.findOne({userID:req.body.userID});
    const benifit = await db.benifit.findOne({userID:req.body.userID});
    console.log(benifit)
   if(benifit){
    var  StartTime = moment(benifit.lastCheckDate).startOf('day').utc();
   }else{
    var  StartTime = moment(user.regdate).startOf('day').utc();
   }
    var  EndTime = moment().subtract(1, 'days').endOf('day').utc();
    //var  EndTime = moment().endOf('day').utc();

    console.log("StartTime",StartTime,"EndTime",EndTime)

    const distingDate = await db.traininguser.distinct("activationDate",{ 
      activationDate: { $gte: StartTime.toDate(), $lte: EndTime.toDate()},
      rootID: { $regex: '.*' + user.rootID + '.*' , $options: 'i' }, 
      varyficatinStatus:"Verify"
      }); 

      const directL = await db.traininguser.countDocuments({
        parentSide:"L",
        directParentID:user.userID, 
        varyficatinStatus:"Verify", 
        activationDate: { $gte: StartTime.toDate(), $lte: EndTime.toDate()}
      });
      const directR = await db.traininguser.countDocuments({
        parentSide:"R",
        directParentID:user.userID, 
        varyficatinStatus:"Verify", 
        activationDate: { $gte: StartTime.toDate(), $lte: EndTime.toDate()}
      });
      await dbCon.closeDB();

      console.log(distingDate)

      var leftVerify=0;
      var rightVerify=0;
      //// Caping///////////
      var dateProtectArry=[];
    for(var i=0; i<distingDate.length; i++ ){

     console.log(i,distingDate[i],"Lenght",distingDate.length)

      var dat=moment(distingDate[i]).utc().format("L");
      // console.log(dat)
      const check = dateProtectArry.includes(dat)
     // console.log(check);
      if(!check){
        dateProtectArry.push(dat)
        // console.log("Caping");
        // console.log(dateProtectArry);
        const data = await dailyCaping(distingDate[i],user.rootID);
      // console.log( data.left, data.right);
      if(data.left < 21){
        leftVerify=Number(leftVerify)+ Number(data.left);
      }else{
        leftVerify=Number(leftVerify)+ 20;
      }
      if(data.right < 21){
        rightVerify=Number(rightVerify)+ Number(data.right)
      }else{
        rightVerify=Number(rightVerify)+ 20;
      }
     console.log("leftVerify", leftVerify ,"rightVerify",rightVerify)
      }
    }


     ///////Pair match//////////

      if(benifit){
        leftVerify = Number(leftVerify) + Number(benifit.leftVerify );
        rightVerify = Number(rightVerify) + Number(benifit.rightVerify);
      if(leftVerify!=rightVerify){
      if(leftVerify > rightVerify){
       var match=rightVerify;
      }else{
       var match=leftVerify;
      }
      }else{
        var match=leftVerify;
      }
      }else{
        if(leftVerify!=rightVerify){
          if(leftVerify > rightVerify){
           var match=rightVerify;
          }else{
           var match=leftVerify;
          }
          }else{
            var match=leftVerify;
          }
      }


    var totalMatch = Number(match) ;
    var totaldirectL = Number(directL);
    var totaldirectR = Number(directR);
    var direct = Number(directL)+ Number(directR);
    var totalDirect = Number(directL)+ Number(directR);

    var pecentage10 = Number(user.activationAmt) * 10/100;
    var directAmt= Number(pecentage10) * direct
    var pairMatchAmt = pecentage10 * Number(match)
    var totalEarning= Number(pairMatchAmt) + Number(directAmt);

    if(benifit){
      totalMatch =  Number(match);
      totaldirectL= Number(benifit.directL)+ Number(directL);
      totaldirectR = Number(benifit.directR)+ Number(directR);
      totalDirect = Number(totaldirectL) + Number(totaldirectR);
     // pairMatchAmt = Number(benifit.machingPairAmt) + Number(pairMatchAmt);
      pairMatchAmt = Number(pairMatchAmt)
      // if(Number(directAmt) > 0){
      //   directAmt = Number(benifit.directAmt) + Number(directAmt);
      // }else{
      //   directAmt =  Number(directAmt);
      // }
      directAmt = Number(benifit.directAmt) + Number(directAmt);
      
      totalEarning =  Number(pairMatchAmt) + Number(directAmt);
    }
  

    console.log("directL",totaldirectL,"directR",totaldirectR, "direct",direct,"match",match,"totalMatch",totalMatch)

    console.log("directAmt",directAmt,"pairMatchAmt",pairMatchAmt,"totalEarning",totalEarning, "direct",direct,"match",match,"totalMatch",totalMatch)



    if(totaldirectL > 0  && totaldirectR > 0 && user.varyficatinStatus=="Verify"){
      //////condition 2//////
      if(totalMatch > 24){
        //////condition 3//////
        if(totalMatch > 49 && totalDirect > 3){
          //////condition 4//////
          if(totalMatch > 99 && totalDirect > 3){
            //////condition 5//////
            if(totalMatch > 99 && totalDirect > 6){
              //////condition 6//////
              if(totalMatch > 249 && totalDirect > 8){
                //////condition 7//////
              if(totalMatch > 500 && totalDirect > 10){

              }else{
                ////procid to 6th result
              }

              }else{
                ////procid to 5th result
              }
            
            }else{
              ////procid to 4th result
            }

          }else{
            ////procid to 3rd result

            // const earningres =  await updateEarning({
            //   directL:totaldirectL,
            //   directR:totaldirectR ,
            //   directAmt:directAmt,
            //   machingPair:totalMatch,
            //   machingPairAmt:pairMatchAmt,
            //   tourAchive:"Local Tour",
            //   incentive:1500,
            //   incentiveMonthCount:0,
            //   giftAchive:"Bag or T-Shart",
            //   userID:user.userID,
            //   userName:user.userName,
            //   designation:"Premium Club Member",
            //   totalEarning:totalEarning,
            //   })
            //   console.log(earningres)
            //   res.json(user)


          }

        }else{
           ////procid to 2nd result
           const earningres =  await updateEarning({
            directL:totaldirectL,
            directR:totaldirectR ,
            leftVerify:leftVerify,
            rightVerify:rightVerify,
            directAmt:directAmt,
            machingPair:totalMatch,
            machingPairAmt:pairMatchAmt,
            tourAchive:"Local Tour",
            incentive:1500,
            incentiveMonthCount:0,
            giftAchive:"Bag or T-Shart",
            userID:user.userID,
            userName:user.userName,
            designation:"Premium Club Member",
            totalEarning:totalEarning,
            })
            console.log(earningres)
            res.json(user)

        }

      }else{
        ////procid to 1st result
       const earningres =  await updateEarning({
        directL:totaldirectL,
        directR:totaldirectR ,
        leftVerify:leftVerify,
        rightVerify:rightVerify,
        directAmt:directAmt,
        machingPair:totalMatch,
        machingPairAmt:pairMatchAmt,
        tourAchive:"Not Appeared",
        incentive:0,
        incentiveMonthCount:0,
        giftAchive:"Not Appeared",
        userID:user.userID,
        userName:user.userName,
        designation:"General",
        totalEarning:totalEarning,
        })
        console.log(earningres)
        res.json(user)
      }
    }else{
      res.json(user)
    }
 
   
} catch (error) {
  console.log(error);
  return error;
}

});


async function dailyCaping(date,rootID){
  try {
   var out={left:0, right:0};
   var StartTime = "";
   var EndTime = ""; 
   
   await dbCon.connectDB();
   StartTime = moment(date).startOf('day').utc();
   EndTime = moment(date).endOf('day').utc();
   console.log("StartTime",StartTime,"EndTime",EndTime,"rootID",rootID)
  const leftVerify = await db.traininguser.countDocuments({
    rootID: { $regex: '.*' + rootID + '-1.*' , $options: 'i' }, 
    varyficatinStatus:"Verify",
    activationDate: { $gte: StartTime.toDate(), $lte: EndTime.toDate() },
  } );
  const rightVerify = await db.traininguser.countDocuments({
    rootID: { $regex: '.*' + rootID + '-2.*' , $options: 'i' },
     varyficatinStatus:"Verify" ,
     activationDate: { $gte: StartTime.toDate(), $lte: EndTime.toDate() },
    } );
    await dbCon.closeDB();
  out={left:leftVerify, right:rightVerify}
    return out;
  } catch (error) {
    console.log(error);
    return error;
  }

}


async function updateEarning(req){
console.log(req);
await dbCon.connectDB();
const benifit = await db.benifit.findOne({userID:req.userID});
if(benifit ){
  const beni = await db.benifit.findOneAndUpdate({userID:req.userID},{$set:{
    designation:req.designation,
    directL:req.directL,
    directR:req.directR,
    leftVerify:req.leftVerify,
    rightVerify:req.rightVerify,
    directAmt: req.directAmt,
    machingPair: req.machingPair,
    machingPairAmt: req.machingPairAmt,
    tourAchive: req.tourAchive,
    incentive: req.incentive,
    incentiveMonthCount:req.incentiveMonthCount,
    giftAchive: req.giftAchive,
    totalEarning: req.totalEarning,
    lastCheckDate: moment().utc()
  }});
  await dbCon.closeDB();
  
}else{
  
  const benifi = await db.benifit({
    userID:req.userID,
    userName:req.userName,
    designation:req.designation,
    directL:req.directL,
    directR:req.directR,
    leftVerify:req.leftVerify,
    rightVerify:req.rightVerify,
    directAmt: req.directAmt,
    machingPair: req.machingPair,
    machingPairAmt: req.machingPairAmt,
    tourAchive: req.tourAchive,
    incentive: req.incentive,
    incentiveMonthCount:req.incentiveMonthCount,
    giftAchive: req.giftAchive,
    totalEarning: req.totalEarning,
    totalWithdrawal:0,
    lastCheckDate: moment().utc()
  })
  await benifi.save();
  await dbCon.closeDB();
}
return "ok"
}



router.post('/getWithdrawlBalance',  async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const benifit = await db.benifit.findOne({userID:req.body.userID});
    await dbCon.closeDB();
    res.json(benifit)
} catch (error) {
  console.log(error);
  return error;
}

});

router.post('/withdrawlProcid',  async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user = await db.traininguser.findOne({userID:req.body.userID});
    const benifit = await db.benifit.findOne({userID:req.body.userID});

    const withdrawl = await db.trainingwithdrawl({
      userID:user.userID,
      userName:user.userName,
      transferAmt:req.body.transferAmt,
      adminCost:req.body.admincost,
      paaAccountno:req.body.paaAccount,
      totalWithdrawl:req.body.withAmtAdminAmt,
      status:"Pending"
    })

    await withdrawl.save()

    var newWithdrawl = Number(benifit.totalWithdrawal) + Number(req.body.withAmtAdminAmt);

    const beni = await db.benifit.findOneAndUpdate({userID:user.userID},{$set:{
      totalWithdrawal:newWithdrawl
    }});

    await dbCon.closeDB();
    res.json(user)
} catch (error) {
  console.log(error);
  return error;
}

});


router.post('/newPasswordRequest', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.traininguser.findOne({email:req.body.loginEmail})
    console.log(user)
    if(user){
      ///////Check previous request/////////
      const fgprexist= await db.trainingforgetPassword.findOne({userID:user.userID,status:"New"});
      if(!fgprexist){
        const forgetPasswor= await db.trainingforgetPassword({
          userName:user.userName,
          userID:user.userID,
          rootID:user.rootID,
          email:user.email,
          mobile:user.mobile,
          newPassword:req.body.newPasw,
          status:"New"
        })
        await forgetPasswor.save();
        await dbCon.closeDB();
        res.send("ok")
      }else{
        await dbCon.closeDB();
        res.send(null);
      }

    }else{
      await dbCon.closeDB();
      res.send(null);
    }
  }catch (error) {
    console.log(error);
    return error;
  }
})



// async function datachenge(userID,dateee){
//   await dbCon.connectDB();
//   const beni = await db.benifit.findOneAndUpdate({userID:userID},{$set:{
//     lastCheckDate: new Date(dateee) 
//   }});
//   if(!beni){
//     const beni = await db.benifit({
//       userID:userID,
//       lastCheckDate: moment(dateee).utc()
//     })
//     await beni.save()
//   }
//   await dbCon.closeDB();

// }



// datachenge('RR-3','2024-09-26T18:43:05.726Z')


// async function activationdatachenge(userID,dateee){
//   await dbCon.connectDB();
//   const beni = await db.traininguser.findOneAndUpdate({userID:userID},{$set:{
//     activationDate: new Date(dateee) ,
//     directParentID:"RR-1010"
//   }});
//   if(!beni){
//     const beni = await db.traininguser({
//       userID:userID,
//       activationDate: moment(dateee).utc()
//     })
//     await beni.save()
//   }
//   await dbCon.closeDB();

// }

// activationdatachenge('RR-1021','2024-09-26T18:43:05.726Z')

module.exports = router;
