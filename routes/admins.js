var express = require('express');
var router = express.Router();

var dbCon = require('../module/db/con');
var db=require('../module/db/bdModule')
var auto_incriment=require('../module/db/autoIncriment');
var dotenv=require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/myadmin', { title: 'Express' });
});


router.post('/checkuserexist', async function(req, res, next) {
  try {
  await dbCon.connectDB()

  const user= await db.user.findOne({$or: [{rootID:req.body.channelRoot},{email:req.body.regEmail}]})

  await dbCon.closeDB();
  //console.log("check done")
  res.json(user)
} catch (error) {
  console.log(error);
  return error;
}

})

router.post('/newPartner', async function(req, res, next) {
  try {
  bcrypt.hash(req.body.regPassword, saltRounds, function(err, hash) {
    auto_incriment.auto_incriment("userID").then(async function(inc_val){
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
      res.json(user)
      //console.log(req.body)
      await dbCon.closeDB();
    })
});
  
} catch (error) {
  console.log(error);
  return error;
}

})




router.post('/userDetails', async function(req, res, next) {
  try {
    await dbCon.connectDB();
  const user= await db.user.find();
  await dbCon.closeDB();
  res.json(user)
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/SetUserID', async function(req, res, next) {
 
  try {
    await dbCon.connectDB();
  const user= await db.counter.findOneAndUpdate({fild :"userID"},{$set:{ value: req.body.id}});
  console.log(user)
  await dbCon.closeDB();
  res.send(req.body.id);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});



router.post('/forgetpasswordlist', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const fgpsw= await db.forgetPasswor.find({status:"New"});
  
  await dbCon.closeDB();
  res.json(fgpsw);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

router.post('/setNewPassword', async function(req, res, next) {
  bcrypt.hash(req.body.newPassword, saltRounds, async function(err, hash) {
    await dbCon.connectDB();
    const user= await db.user.findOneAndUpdate({userID:req.body.userID},{$set:{password:hash}});
    const fgpsw= await db.forgetPasswor.findOneAndUpdate({userID:Number(req.body.userID),status:"New"},{$set:{status:"Resolve"}});
   //console.log(fgpsw)
    await dbCon.closeDB();
    if(user){
      res.send("ok")
    }else{
      res.send("error")
    }

  });
});


router.post('/setNewPasswordCalcel', async function(req, res, next) {
  bcrypt.hash(req.body.newPassword, saltRounds, async function(err, hash) {
    await dbCon.connectDB();
    const fgpsw= await db.forgetPasswor.findOneAndUpdate({userID:Number(req.body.userID),status:"New"},{$set:{status:"Cancel"}});
   
    await dbCon.closeDB();
    res.send("ok")
  

  });
});


router.post('/addupi', async function(req, res, next) {
  
  try {
    await dbCon.connectDB();
    const upi= await db.upiidlist({
      upiid:req.body.upiid,
      upiName:req.body.upiname,
      upilimit:req.body.upilimit,
      balanceamount:req.body.upilimit,
      upistatus:"new"
    })
    await upi.save();
  
  await dbCon.closeDB();
  res.send("ok");
  }catch (error) {
    console.log(error);
    return error;
  }
  
});

router.post('/upilist', async function(req, res, next) {
 
  try {
    await dbCon.connectDB();
    const user= await db.upiidlist.find({upistatus:req.body.upistatus})
  
  await dbCon.closeDB();
  res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/upistatusupdate', async function(req, res, next) {
 
  try {
    await dbCon.connectDB();
    const upi= await db.upiidlist.findOneAndUpdate({upiid:req.body.upiid},{$set:{upistatus:req.body.upistatus}});
  
  await dbCon.closeDB();
  res.send("upi");
  }catch (error) {
    console.log(error);
    return error;
  }
  
});





router.post('/addusdtrate', async function(req, res, next) {
  
  try {
    await dbCon.connectDB();
    const usdt= await db.totayUSDT.findOne({currency:"usdt"});
    console.log("chek",usdt)
    if(usdt){
      console.log("step1")
      const fgpsw= await db.totayUSDT.findOneAndUpdate({currency:"usdt"},{$set:{usdtrate:req.body.usdt}});
    }else{
      console.log("step12")
      const totayUSDT= await db.totayUSDT({
        usdtrate:req.body.usdt,
        currency:"usdt"
      })
      await totayUSDT.save();
    }
  await dbCon.closeDB();
  res.send("ok");
  }catch (error) {
    console.log(error);
    return error;
  }
  
});


router.post('/fundrequest', async function(req, res, next) {
 
  try {
    await dbCon.connectDB();
    const user= await db.fundrequest.find({fundrequestStatus:"Request"})
  
  await dbCon.closeDB();
  res.json(user);
  }catch (error) {
    console.log(error);
    return error;
  }
  
});



router.post('/acceptFund', async function(req, res, next) {
  try {
    await dbCon.connectDB();
    const fund= await db.fundrequest.findOne({refno:req.body.refno});
    const user= await db.user.findOne({userID:fund.userID});
    
  
  await dbCon.closeDB();
  res.json(fund);
  }catch (error) {
    console.log(error);
    return error;
  }
});


// router.post('/oldUserDetails', async function(req, res, next) {
 
//   try {
//     await dbCon.connectDB();
//     const user= await db.user.findOne({userID:req.body.id})
  
//   await dbCon.closeDB();
//   res.json(user);
//   }catch (error) {
//     console.log(error);
//     return error;
//   }
  
// });



// router.post('/paymentSearchID', async function(req, res, next) {
//   try {
//     await dbCon.connectDB();
//     const user= await db.user.findOne({userID:req.body.userID});
//     const lavel= await db.lavelLedger.find({lavelrootID:user.rootID});
//   await dbCon.closeDB();
//   res.json({user:user,lavel:lavel});
//   }catch (error) {
//     console.log(error);
//     return error;
//   }
  
// });
// router.post('/paymentrootIDdetails', async function(req, res, next) {
//   try {
//     await dbCon.connectDB();
//     const user= await db.user.findOne({rootID:req.body.rootID});
//   await dbCon.closeDB();
//   res.json(user);
//   }catch (error) {
//     console.log(error);
//     return error;
//   }
  
// });

// router.post('/markaspaid', async function(req, res, next) {
//   try {
//     await dbCon.connectDB();
//     ////rootID:rootID, lavelrootID:lavelrootID,lave:lave
//     const lavel= await db.lavelLedger.findOneAndUpdate({
//       rootID:req.body.rootID,lavelrootID:req.body.lavelrootID,lavel:req.body.lavel
//     },{$set:{paidEarninyStatus:"Paid",paydate:Date.now()}});
//   await dbCon.closeDB();
//   res.json(lavel);
//   }catch (error) {
//     console.log(error);
//     return error;
//   }
  
// });



// router.post('/updateUser', async function(req, res, next) {
//   try {
//     await dbCon.connectDB();
//     const user= await db.user.findOneAndUpdate({userID:req.body.userIDReplace},{$set:{
//       userName:req.body.nameReplace,
//       email:req.body.emailReplace,
//       address:req.body.addressReplace,
//       mobile:req.body.mobileReplace,
//       panNo:req.body.panReplace
//     }});
  
//   await dbCon.closeDB();
//   res.json(user);
//   }catch (error) {
//     console.log(error);
//     return error;
//   }
  
// });





// const user= await db.user.findOneAndUpdate({userID:req.body.userID},{$set:{
//   adharNo:req.body.Aadhar,
//   westrenUnionUser:req.body.wuID,
//   westrenUnionPass:req.body.wuPsd,
//   BinanceUser:req.body.BinanceID,
//   BinancePass:req.body.BinancePsd,
//   EmlID:req.body.EmlID,
//   EmlPsd:req.body.EmlPsd,
//   BankDelais:req.body.BankDelais
// }});


module.exports = router;
