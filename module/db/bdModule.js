const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({ 
    fild:String,
    value:Number
});

var countermodul = mongoose.model('moneycounters', counterSchema);

const userSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    password:String,
    email:String,
    address:String,
    mobile:String,
    panNo:String,
    adharNo:String,
    westrenUnionUser:String,
    westrenUnionPass:String,
    BinanceUser:String,
    BinancePass:String,
    EmlID:String,
    EmlPsd:String,
    BankDelais:String,
    bankName:String,
    bankAccount:String,
    bankIfsc:String,
    bnakBranch:String,
    c:String,
    regdate: { type: Date, default: Date.now },
    lastlogin: { type: Date}
});



var usermodul = mongoose.model('moneyusers', userSchema);

const adminSchema = new mongoose.Schema({ 
    userID:Number,
    password:String,
    address:String,
    mobile:String,
    type:String,
    status:String,
});

var adminmodul = mongoose.model('moneyadmins', adminSchema);

const forgetPasswordSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    email:String,
    mobile:String,
    newPassword:String,
    status:String,
    daterequest: { type: Date, default: Date.now }
});
var forgetPasswordmodul = mongoose.model('moneyforgetpasswords', forgetPasswordSchema);


const fundrequestSchema = new mongoose.Schema({ 
    userName:String,
    userID:String,
    accounttype:String,
    inr:String,
    usdt:String,
    utrno:String,
    refno:String,
    fundrequestStatus:String,
    fundtransferpicture:String,
    upiID:String,
    upiName:String,
    daterequest: { type: Date, default: Date.now }
});

var fundrequestmodul = mongoose.model('moneyfundrequests', fundrequestSchema);


const upiidlistSchema = new mongoose.Schema({ 
    upiid:String,
    upiName:String,
    qrCode:String,
    upilimit:String,
    useamount:String,
    balanceamount:String,
    upistatus:String

});
var upiidlistmodul = mongoose.model('moneyupilists', upiidlistSchema);

const totayUSDTSchema = new mongoose.Schema({ 
    usdtrate:String,
    currency:String
});
var totayUSDTmodul = mongoose.model('moneyusdtrates', totayUSDTSchema);





const userLavelLedgerSchema = new mongoose.Schema({ 
    userName:String,
    userID:Number,
    rootID:String,
    lavelrootID:String,
    address:String,
    lavel:String,
    lavelEarning:String,
    paidEarninyStatus:String,
    paymentScrnSort:String,
    paydate: { type: Date },

    investNumber:String,
    investDate:{ type: Date },
    investAmount:String,

    principalPaid:String,
    interestPaid:String,
    maturity:String,
    maturitydate: { type: Date }



});
var userLavelLedgermodul = mongoose.model('moneyuserlavelledger', userLavelLedgerSchema);








module.exports={
    counter:countermodul,
    user:usermodul,
    lavelLedger:userLavelLedgermodul,
    forgetPasswor:forgetPasswordmodul,
    admin:adminmodul,
    fundrequest:fundrequestmodul,
    upiidlist:upiidlistmodul,
    totayUSDT:totayUSDTmodul
}