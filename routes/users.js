var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');

var smsotp=require('../module/smsotp')


var dotenv=require('dotenv').config();

const bcrypt = require('bcrypt');
const { ExplainVerbosity } = require('mongodb');
const saltRounds = 10;





/* GET users listing. */

router.get('/test', async function(req, res, next) {
  try {
    res.render('user/test',{})
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

// router.get('/test', async function(req, res, next) {
// res.send("jhdfjghjd")
// });


router.get('/', async function(req, res, next) {
  try {
    // await dbCon.connectDB();
    // await dbCon.closeDB();
    //console.log(req.query)
    if(req.query.refrootID && req.query.refname && req.query.refid){
     var sponsRootID =req.query.refrootID;
     var sponsID= req.query.refid
     var sponsName =req.query.refname
     //console.log("Fro Ref-Register",sponsRootID)
    }else{
      var sponsRootID ="";
      var sponsID= "";
      var sponsName = "";
    }
    var allredylogin=req.cookies.userID
    res.render('user/user',{allredylogin:allredylogin,sponsRootID:sponsRootID,sponsID:sponsID,sponsName:sponsName})
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

router.post('/abcd', async function(req, res, next) {
  console.log("ooo")
})



router.post('/loginUser', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({email:req.body.loginEmail})
    ///console.log(user);
    await dbCon.closeDB();
    if(user){
      bcrypt.compare(req.body.loginPassword,user.password, async function(err,match){
        if(match){
          res.cookie("userID", user.userID, { maxAge:  24 * 60 * 60 * 1000 });
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

router.post('/newPasswordRequest', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({email:req.body.loginEmail})
    if(user){
      ///////Check previous request/////////
      const fgprexist= await db.forgetPasswor.findOne({userID:user.userID,status:"New"});
      if(!fgprexist){
        const forgetPasswor= await db.forgetPasswor({
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


router.post('/checkSponsor', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.sponsorID})
    await dbCon.closeDB();
    res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/creatregColumn', async function(req, res, next) {
  console.log(req.body)
  try {
    await dbCon.connectDB();
    const user= await db.lavelLedger.find({rootID:req.body.SponsorRootID,lavel:1} );
    await dbCon.closeDB();
    res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





router.post('/checkuserexist', async function(req, res, next) {
  try {
  await dbCon.connectDB();
  const user= await db.user.findOne({$or: [{rootID:req.body.channelRoot},{email:req.body.regEmail}]});
  await dbCon.closeDB();
  //console.log("check done")
  res.json(user)
} catch (error) {
  console.log(error);
  return error;
}

})




router.post('/Getupiandusdt', async function(req, res, next) {
  try {
  await dbCon.connectDB();
  const usdtrate= await db.totayUSDT.findOne({currency:"usdt"});
  const upi= await db.upiidlist.find({upistatus:"open"});
  
  await dbCon.closeDB();
  res.json({usdtrate:usdtrate, upi:upi})
} catch (error) {
  console.log(error);
  return error;
}

})

router.post('/addfund', async function(req, res, next) {
  let refno=new Date().getTime();
  try {
  await dbCon.connectDB();
  const user= await db.user.findOne({userID:req.body.userID});
  const upi= await db.upiidlist.findOne({upiid:req.body.upiid});
  //console.log(user)
  const fundrequest= await db.fundrequest({
        userName:user.userName,
        userID:req.body.userID,
        accounttype:req.body.accounttype,
        inr:req.body.inr,
        usdt:req.body.usdt,   
        utrno:req.body.utrno,
        refno:refno,
        fundrequestStatus:"Request",
        upiID:req.body.upiid,
        upiName:upi.upiName
      });
  await fundrequest.save();
  //////Update UPI Limit ////
  var upibalanceamount=Number(upi.balanceamount) - Number(req.body.inr); 
  var upiuseamount=Number(upi.useamount) + Number(req.body.inr);
  const hht= await db.upiidlist.findOneAndUpdate({upiid:upi.upiid},{$set:{balanceamount:upibalanceamount,useamount:upiuseamount}});

  await dbCon.closeDB();
  res.json({refno:refno})
} catch (error) {
  console.log(error);
  return error;
}

})


router.post('/getWallets', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const fund= await db.fundrequest.find({userID:req.body.userID,fundrequestStatus:"Accept"});
    const wallet= await db.wallet.findOne({userID:req.body.userID});
    await dbCon.closeDB();
    res.json({fund:fund,wallet:wallet});
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

router.post('/processWithdrawal', async function(req, res, next) {
  console.log(req.body)
  var uid = (new Date().getTime()).toString(9)
  try {
    await dbCon.connectDB();
    const old= await db.wallet.findOne({userID:req.body.userID});
    if(old.totalamountwithdrawal){
      var totalwithdrawl=Number(old.totalamountwithdrawal) + Number(req.body.total);
    }else{
      var totalwithdrawl=Number(req.body.total);
    }
    const addcomision= await db.withdrawal({
      uid:uid,
      userID:req.body.userID,
      commisionwithdrawal:req.body.commision,
      salarywithdrawal:req.body.salary,
      interestwithdrawal:req.body.interest,
      principalwithdrawal:req.body.principal,
      withdwaralAmount:req.body.total,
      usdtwalletAddress:req.body.usdtwalletAddress,
      withdrawalDate: new Date()
    });
    await addcomision.save();
    const fundreee= await db.wallet.findOneAndUpdate({userID:req.body.userID},{$set:{
      commision:0,
      salary:0,
      interest:0,
      principal:0,
      totalamountwithdrawal:totalwithdrawl,
    }});
    await dbCon.closeDB();
   res.send(uid)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





// var payment = async function(inp){
//   let day
  
//     switch (inp) {
    
//       case 1:
//         day = 800;
//         break;
//       case 2:
//         day = 400;
//         break;
//       case 3:
//         day = 250;
//         break;
//       case 4:
//         day = 150;
//         break;
//       case 5:
//         day = 100;
//         break;
//       case 6:
//         day = 75;
//         break;
//       case 7:
//         day = 50;
//         break;
//       case 8:
//         day = 30;
//         break;
//       case 9:
//         day = 25;
//         break;
//       case 10:
//         day = 20;
//         break;
//       case 11:
//         day = 1;

//         break;
//       case 12:
//         day = 1;

//         break;
//       case 13:
//         day = 1;


//         break;
//       case 14:
//         day = 1;

//         break;
//       case 15:
//         day = 1;

//         break;
//       case 16:
//         day = 0.5;

//         break;
//       case 17:
//         day = 0.5;

//         break;
//       case 18:
//         day = 0.5;


//         break;
//       case 19:
//         day = 0.5;

//         break;
//       case 20:
//         day = 0.5;
        
        
//     }
//     return {day:day};
  
  
// }



// async function tt(){
//   let lavelrootID = "A-1-12-1-87-4-9-45-2-7-140-6";
//   const myArray= lavelrootID.split("-");
//   var rootID="";
//   var L=myArray.length;
//   for(i=1; i < myArray.length; i++) {
//     if(rootID){
//       rootID=''+rootID+'-'+myArray[i-1]+'';
//     }else{
//       rootID=''+myArray[i-1]+'';
//     }
//     L=L-1;
//     const payme= await payment(L); 

//       console.log(rootID,L,payme)

//   }
 
// }
// tt();




// let lavelrootID = req.body.channelRoot;
// const myArray= lavelrootID.split("-");
// var rootID="";
// var L=myArray.length;
// for(i=1; i < myArray.length; i++) {
//   if(rootID){
//     rootID=''+rootID+'-'+myArray[i-1]+'';
//   }else{
//     rootID=''+myArray[i-1]+'';
//   }
//   L=L-1;
//   const payme= await payment(L); 

    
//               // /////// Lavel input//////   
//       await dbCon.connectDB();
//       const Lavel= await db.lavelLedger.findOne({rootID:rootID,lavelrootID:lavelrootID,lavel:L});
//       if(!Lavel){
//         const newlavel= await db.lavelLedger({
//                   userName:req.body.regUserName,
//                   userID:inc_val,
//                   rootID:rootID,
//                   lavelrootID:lavelrootID,
//                   address:req.body.regAddress,
//                   lavel:L,
//                   lavelEarning:payme,
//                   paidEarninyStatus:"Due",
//                 })
//                 await newlavel.save();
//               }
//       await dbCon.closeDB();
      
// }
// ////End For////




router.post('/newPartner', async function(req, res, next) {
  try{
    await  auto_incriment.auto_incriment("userID").then(async function(inc_val){


    ////New Member Add//////
            bcrypt.hash(req.body.regPassword, saltRounds, async function(err, hash) {
              await dbCon.connectDB()
              const user= await db.user({
              userName:req.body.regUserName,
              userID:inc_val,
              rootID:req.body.channelRoot,
              password:hash,
              email:req.body.regEmail,
              address:req.body.regAddress,
              mobile:req.body.regMobile,
              userType:"New"
            })
            await user.save();
            await dbCon.closeDB();
            res.json(user)

          })


  })




//   await  auto_incriment.auto_incriment("userID").then(async function(inc_val){

// var loop=req.body.channelRoot; //// B-5-1-1


// var counter=loop.length;
// var L=0;
// for(i=0; i < counter -1;) {
//   L++;
//     i=i+2;
//     var newRoot=counter-i;
// //console.log(i);
// //console.log(loop.substring(0,newRoot));
// //console.log("L",L);
// const payme= await payment(L);
// //console.log(payme );

// /////// Lavel input//////   
// await dbCon.connectDB();
// ///const user= await db.user.findOne({$or: [{rootID:req.body.channelRoot},{panNo:req.body.regPan},{email:req.body.regEmail}]});
// const Lavel= await db.lavelLedger.findOne({rootID:loop.substring(0,newRoot),lavelrootID:loop,lavel:L});
// if(!Lavel){
//   const newlavel= await db.lavelLedger({
//             userName:req.body.regUserName,
//             userID:inc_val,
//             rootID:loop.substring(0,newRoot),
//             lavelrootID:loop,
//             address:req.body.regAddress,
//             lavel:L,
//             lavelEarning:payme,
//             paidEarninyStatus:"Due",
//           })
//           await newlavel.save();
//         }
// await dbCon.closeDB();
// };

/////// add new user///////
//   bcrypt.hash(req.body.regPassword, saltRounds, async function(err, hash) {
//         await dbCon.connectDB()
//         const user= await db.user({
//         userName:req.body.regUserName,
//         userID:inc_val,
//         rootID:req.body.channelRoot,
//         password:hash,
//         email:req.body.regEmail,
//         address:req.body.regAddress,
//         mobile:req.body.regMobile,
//         panNo:req.body.regPan
//       })
//       await user.save();
//       await dbCon.closeDB();
//       res.json(user)
// })
//   })
  } catch (error) {
    console.log(error);
    return error;
  }
})




router.post('/completeReg', async function(req, res, next) {
  try {
    await dbCon.connectDB();
  const user= await db.user.findOneAndUpdate({userID:req.body.userID},{$set:{
    westrenUnionUser:req.body.wuID,
    westrenUnionPass:req.body.wuPsd,
    BinanceUser:req.body.BinanceID,
    BinancePass:req.body.BinancePsd,
    EmlID:req.body.EmlID,
    EmlPsd:req.body.EmlPsd,
    BankDelais:req.body.BankDelais,
    userType:"Active"
  }});
  await dbCon.closeDB();
  res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/GetUser', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.userID})
    await dbCon.closeDB();
    res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});



router.post('/userProfile', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.cookies.userID})
    await dbCon.closeDB();
    res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/levelview', async function(req, res, next) {
  try {
    console.log(req.body);
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.userID})
    const member= await db.lavelLedger.find({rootID:user.rootID,lavel:req.body.level})
    //console.log(member);
    var totalearning=0;
    var totalBusiness=0;
    if(member.length > 0){
     member.forEach(val => {
      totalearning=Number(totalearning)+Number(val.lavelEarning);
      totalBusiness=Number(totalBusiness)+Number(val.lavelInvestment);
      });
    }

    await dbCon.closeDB();
    
    res.json({level:req.body.level,member:member.length,totalearning:Number(totalearning),totalBusiness:Number(totalBusiness)})
  }catch (error) {
    console.log(error);
    return error;
  }
});

router.post('/directlevelview', async function(req, res, next) {
  try {
    console.log(req.body);
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.userID});
    const member= await db.lavelLedger.find({rootID:user.rootID,lavel:req.body.level});
    await dbCon.closeDB();
    res.json(member);
  }catch (error) {
    console.log(error);
    return error;
  }
});

router.post('/getUserView', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.userID})
    await dbCon.closeDB();
    res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





////////Profile/////////////
router.post('/logout', async function(req, res, next) {
  res.clearCookie("userID");
  res.send("ok")

})




////////Profile/////////////

router.get('/resetpassword', async function(req, res, next) {
  
  bcrypt.hash(req.query.paw, saltRounds, async function(err, hash) {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({mobile:req.query.mobile},{$set:{password:hash}});
    await dbCon.closeDB();

    if(user){
      res.send("success")
    }else{
      res.send("error")
    }

  })
  
  
})

////////Update Bank/////////////
router.post('/editBank', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({userID:req.body.id},{$set:{
      bankName:req.body.bankName,
      bankAccount:req.body.bankAccount,
      bankIfsc:req.body.bankIfsc,
      bnakBranch:req.body.bankbranch,
    }});
    await dbCon.closeDB();
   // console.log("My Tree",Mytree)
    res.send(user)
  }catch (error) {
    console.log(error);
    return error;
  }
})


////////Profile/////////////

router.post('/changePasswor', async function(req, res, next) {
  
  bcrypt.hash(req.body.newPasw, saltRounds, async function(err, hash) {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({userID:req.body.id},{$set:{password:hash}});
    await dbCon.closeDB();
    if(user){
     res.send("success")
    }else{
     res.send("error")
    }

  })
  
  
})


////////ADD Member/////////

router.post('/addMember', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    await dbCon.closeDB();
    res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
})


////////Get Tree info/////////////
router.post('/getTree', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    // const Mytree=await db.user.find({rootID: { $regex: '.*' + user.rootID + '.*' , $options: 'i' } } );
    const Mytree=await db.lavelLedger.find({rootID:user.rootID,lavel:req.body.lavel } );
    const number = await  db.lavelLedger.countDocuments({rootID:user.rootID});
      
    await dbCon.closeDB();
   // console.log("My Tree",Mytree)
    res.send({user:user,Mytree:Mytree,totalChain:number})
  }catch (error) {
    console.log(error);
    return error;
  }
})




////////Ref Link/////////////
router.post('/createRefLink', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    await dbCon.closeDB();
   // console.log("My Tree",Mytree)
    res.send(user)
  }catch (error) {
    console.log(error);
    return error;
  }
});



//////// Get Trade Request/////////////
router.post('/getTradeRequest', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const trade= await db.selfTrade .find({userID:req.body.id,tradeStatus:"Request"});
   
    await dbCon.closeDB();
    
   // console.log("My Tree",Mytree)
    res.send(trade)
  }catch (error) {
    console.log(error);
    return error;
  }
})

//////// New Trade Request/////////////
router.post('/tradeRequest', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const user= await db.user.findOne({userID:req.body.id});
    const selfTrade= await db.selfTrade({
      tradeAmount:req.body.inr,
      usdtbuy:req.body.usdt,
      rootID:user.rootID,
      userID:user.userID,
      userName:user.userName,
      tradeStatus:"Request",
    })
    await selfTrade.save();
    await dbCon.closeDB();
    
   // console.log("My Tree",Mytree)
    res.send(user)
  }catch (error) {
    console.log(error);
    return error;
  }
})





module.exports = router;
