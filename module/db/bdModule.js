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
    userType:String,
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
    daterequest: { type: Date, default: Date.now },
    principalPaid:String,
    interestPaid:String,
    maturity:String,
    maturitydate: { type: Date },
    
    
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
    lavelEarning:Number,
    lavelInvestment:Number,
    paidEarninyStatus:String,
    paymentScrnSort:String,
    paydate: { type: Date },
    date: { type: Date, default: Date.now }
    // investNumber:String,
    // investDate:{ type: Date },
    // investAmount:String,

    // principalPaid:String,
    // interestPaid:String,
    // maturity:String,
    // maturitydate: { type: Date }
});
var userLavelLedgermodul = mongoose.model('moneyuserlavelledger', userLavelLedgerSchema);

const walletSchema = new mongoose.Schema({ 
    userID:String,
    commision:String,
    salary:String,
    salaryPayCount:String,
    salaryCondition:String,
    interest:String,
    principal:String,
    totalamount:String,
    totalamountwithdrawal:String,
   lastcheckdate: { type: Date}
});
var walletmodul = mongoose.model('moneywallet', walletSchema);

const withdrawalSchema = new mongoose.Schema({ 
    uid:String,
    userID:String,
    commisionwithdrawal:String,
    salarywithdrawal:String,
    salaryPayCount:String,
    salaryCondition:String,
    interestwithdrawal:String,
    principalwithdrawal:String,
    withdwaralAmount:String,
    usdtwalletAddress:String,
    withdrawalDate: { type: Date}
});
var withdrawalmodul = mongoose.model('moneywithdrawal', withdrawalSchema);


/////////Training Schema/////////////

const traininguserSchema = new mongoose.Schema({ 
    userName:String,
    userID:String,
    rootID:String,
    parentID:String,
    directParentID:String,
    parentSide:String,
    activationPin:String,
    activationAmt:String,
    email:String,
    password:String,
    mobile:String,
    varyficatinStatus:String,
    activationDate:{ type: Date},
    regdate: { type: Date, default: Date.now },
    lastlogin: { type: Date},
    
});
var trainingusermodul = mongoose.model('trainingusers', traininguserSchema);




const benifitSchema = new mongoose.Schema({ 
    direct:String,
    directAmt:String,
    machingPair:String,
    machingPairAmt:String,
    tourAchive:String,
    incentive:String,
    incentiveStartDate:{ type: Date},
    incentiveMonthCount:String,
    giftAchive:String,
    giftGot:String,
    userID:String,
    userName:String,
    designation:String,
    totalEarning:String,
    totalWithdrawal:String,
    lastCheckDate: { type: Date}

});
var benifitmodul = mongoose.model('trainingbenifit', benifitSchema);

module.exports={
    counter:countermodul,
    user:usermodul,
    lavelLedger:userLavelLedgermodul,
    forgetPasswor:forgetPasswordmodul,
    admin:adminmodul,
    fundrequest:fundrequestmodul,
    upiidlist:upiidlistmodul,
    totayUSDT:totayUSDTmodul,
    wallet:walletmodul,
    withdrawal:withdrawalmodul,
    ///////Training///////////
    traininguser:trainingusermodul,
    benifit:benifitmodul
}





