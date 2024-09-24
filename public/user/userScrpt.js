$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();

    var sponsRootID=$("#sponsRootID").val();
    var sponsID=$("#sponsID").val();
    var sponsName=$("#sponsName").val();

    
    if(allredyloginuserID){
        $("#dashHome").css({"display":"block"});
        $("#logout").css({"display":"block"});

        $("#login").css({"display":"none"});
        $("#regit").css({"display":"none"});

        getUserprofile(allredyloginuserID);

    }else{

        if(sponsRootID && sponsID && sponsName){
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
           
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            regClick();
            $("#SponsorName").val(sponsName);
            $("#SponsorRootID").val(sponsRootID);
            $("#sponsorID").val(sponsID);

           //// http://localhost:3001/user/?rootID=A321&id=12&name=sukanta
            

        }else{
            loginClick();
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
        }

    }

    ///////For Password Toggle/////////
    
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#regPassword');
    if(togglePassword && password ){
        togglePassword.addEventListener('click', function (e) {
            // toggle the type attribute
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            // toggle the eye slash icon
            this.classList.toggle('fa-eye-slash');
        });
    }
})



function loginClick(){
    $("#view").html('<div style="margin-top:3vh;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
    <div class="panel panel-success">\
          <div class="panel-heading">\
                <h3 class="panel-title">Login</h3>\
          </div>\
          <div class="panel-body">\
                <div class="form-group">\
                    <label>Username</label>\
                        <input type="text" name="" id="loginEmail" class="form-control" placeholder="User Email">\
                </div>\
                <div class="form-group">\
                    <label>Password</label>\
                        <input type="password" name="" id="loginPassword" class="form-control" placeholder="Password">\
                </div>\
                <button onclick="loginProcess()" type="button" class="btn btn-primary">Login</button>\
                <button onclick="forgetpassword()" type="button" class="btn btn-sm-square btn-danger" style="margin-left: 4vh;">Forget Password</button>\
          </div>\
    </div>\
</div>');
}

function regClick(){
    $("#view").html('<div style="margin-top:3vh;" class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
    <div class="panel panel-success">\
          <div class="panel-heading">\
                <h3 class="panel-title">Register New Partner</h3>\
          </div>\
          <div class="panel-body">\
                <div class="form-group">\
                    <label>Username</label>\
                        <input type="text"  id="regEmail" class="form-control" placeholder="Email ie hkdhkfhs@gmail.com">\
                </div>\
                <div class="form-group">\
                    <label>Password</label>\
                        <input type="password"  id="regPassword" class="form-control" placeholder="6 to 18 Chracter">\
                        <div style=" margin-top: -3.5vh; margin-left: 90%; font-size: large;"><i id="togglePassword" class="fa fa-eye" aria-hidden="true"></i></div> \
                </div>\
                <div class="form-group">\
                    <label>Full Name</label>\
                        <input type="text"  id="regUserName" class="form-control" placeholder="ei: Basudeb Roy">\
                </div>\
                <div class="form-group">\
                    <label>Address</label>\
                       <textarea id="regAddress" class="form-control" rows="3" ></textarea>\
                </div>\
                <div class="form-group">\
                    <label>Mobile Number</label>\
                        <input type="number"  id="regMobile" class="form-control" placeholder=" 10 Digit Number">\
                </div>\
                <button onclick="newPetnerRegister()" type="button" class="btn btn-primary">Register</button>\
                <div class="form-group">\
                    <label>Sponsor ID</label>\
                        <input onkeydown="searchdown()" onkeyup="searchup()" type="text"  id="sponsorID" class="form-control" placeholder="Sponsor ID : ei 10234" readonly>\
                </div>\
                <div class="form-group">\
                    <label>Sponsor Name</label>\
                        <input type="text"  id="SponsorName" class="form-control" readonly>\
                        <input type="text"  id="SponsorRootID" class="form-control" readonly>\
                </div>\
          </div>\
    </div>\
</div>');
}

function logout(){
    $.post('/user/logout',{},function(data){
        if(data){
            loginClick();
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
           
        }
    })

  }



function forgetpassword(){
    var loginEmail=$("#loginEmail").val().replace(/\s/g, '');
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    if (reg.test(loginEmail) == false) 
        {
            alert('Invalid Email Address');
            $("#loginEmail").focus();
            return 
        }
       var newPasw = prompt("Enter New Password");

       if(newPasw.length < 6){
            alert('Password Must be 6 to 18 charecter');
            return
            
        } 
        $.post('/user/newPasswordRequest',{loginEmail:loginEmail,newPasw:newPasw},function(data){
            if(data){
                alert("Your Request to set New Password is successfully send to Admin Our executive call you soon" )
            }else{
                alert("User Id Not Match / Allredy has pending Request");
            }
        })


    
}



var timerr
function searchdown(){
    clearTimeout(timerr);
  }
  function searchup(){
    clearTimeout(timerr);
    timerr=setTimeout(function(){
        var sponsorID=$("#sponsorID").val().trim();
        $("#SponsorName").val("")
        $("#SponsorRootID").val("")
        $.post('/user/checkSponsor',{sponsorID:sponsorID},function(data){
           if(data){
            //console.log(data)
            $("#SponsorName").val(data.userName);
            $("#SponsorRootID").val(data.rootID);

           }else{
            alert("Sponsor ID not Match");
           }
        });
    },1000);
  }


  function newPetnerRegister(){
    var regEmail=$("#regEmail").val().replace(/\s/g, '');
    var regPassword=$("#regPassword").val().trim();
    var regUserName=$("#regUserName").val().trim();
    var regAddress=$("#regAddress").val().trim();
    var regMobile=$("#regMobile").val().trim();
    var SponsorRootID=$("#SponsorRootID").val();
    var regColumn=0;

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

   

      if (reg.test(regEmail) == false) 
          {
              alert('Invalid Email Address');
              $("#regEmail").focus();
              return 
          }
          if(regPassword.length < 6){
            alert('Password Must be 6 to 18 charecter');
            $("#regPassword").focus()
            return
        } 

           if(regUserName.length < 2){
            alert('Enter Valid Name');
            $("#regUserName").focus()
            return
           }
         

         if(regMobile.length != 10){
            alert('Enter Valid Mobile Number');
            $("#regMobile").focus()
            return
         }


        
         if(!SponsorRootID.length){
            alert('Sponsor Name And root Required');
            return
         }

         

         ///////Check Exist//////////

        //////Create Column No. ///////
        $.post('/user/creatregColumn',{SponsorRootID:SponsorRootID},function(column){
            //console.log(data);
            //alert(column.length)
            regColumn=column.length+1
               ////Create Root//////
               var channelRoot=''+SponsorRootID+'-'+regColumn+'';
               $.post('/user/checkuserexist',{channelRoot:channelRoot,regEmail:regEmail},function(data){
                 if(!data){
                  /////////Save New Partner//////
                  $.post('/user/newPartner',{
                      regEmail:regEmail,
                      regPassword:regPassword,
                      regUserName:regUserName,
                      regAddress:regAddress,
                      regMobile:regMobile,
                      channelRoot:channelRoot
                  },function(reg){
                      alert("Registration  Success")

                      location.replace("/user")
                  })
      
                 }else{
                  alert("Already Register With Us")
                 }
               })
        
        });

  }

  function completeReg(){
   
    var wuID=$("#wuID").val().replace(/\s/g, '');
    var wuPsd=$("#wuPsd").val().replace(/\s/g, '');
    var BinanceID=$("#BinanceID").val().replace(/\s/g, '');
    var BinancePsd=$("#BinancePsd").val().replace(/\s/g, '');
    var EmlID=$("#EmlID").val().replace(/\s/g, '');
    var EmlPsd=$("#EmlPsd").val().replace(/\s/g, '');
    var BankDelais=$("#BankDelais").val();
    var userID=$("#activeUserID").val();

    if(Aadhar && wuID && wuPsd &&  BinanceID && BinancePsd && EmlID && EmlPsd && BankDelais){
        $.post('/user/completeReg',{
            wuID:wuID,
            wuPsd:wuPsd,
            BinanceID:BinanceID,
            BinancePsd:BinancePsd,
            EmlID:EmlID,
            EmlPsd:EmlPsd,
            BankDelais:BankDelais,
            userID:userID
        },function(user){
            if(user){
                $("#ActivateThisUser").css({"display":"none"});
                //$("#CompleteRegistration").css({"display":"none"});
                
                profile();
            }
        })
    }else{
        alert("Complete From ")
    }

  }
  


  function loginProcess(){
    var loginEmail=$("#loginEmail").val().replace(/\s/g, '');
    var loginPassword=$("#loginPassword").val().trim();

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
      if (reg.test(loginEmail) == false) 
          {
              alert('Invalid Email Address');
              $("#loginEmail").focus();
              return 
          }
          if(loginPassword < 6){
            alert('Password Must be 6 to 18 charecter');
            $("#loginPassword").focus()
            return
        } 

        $.post('/user/loginUser',{loginPassword:loginPassword,loginEmail:loginEmail},function(user){
            if(user){
               
                $("#dashHome").css({"display":"block"});
                $("#logout").css({"display":"block"});

                
                $("#login").css({"display":"none"});
                $("#regit").css({"display":"none"});

                getUserprofile(user.userID);
                location.replace("/user");
            }else{
                alert("Worng Credential")
            }
        })

  }


  

  function getUserprofile(userID){
    $.post('/user/GetUser',{userID:userID},function(user){
        if(user.userType=="Active"){
            mainContent(user);
        }else{
            activetecontent(user)
        }
    });
  }

  function activetecontent(user){
    $("#view").html('<div style="margin-top: 3vh;" class="panel panel-danger">\
    <div class="panel-heading">\
          <h3 class="panel-title">Welcome</h3>\
    </div>\
        <div id="activebody" style="text-align: center;" class="panel-body">\
        '+user.userName+'<br>\
            You are almost done!..\
            <p><button onclick="accountActivation(\''+user.userID+'\',\'New\')" style="margin-top: 3vh;" type="button" class="btn btn-danger">Active Now</button> </p>\
            <p style="font-size: xx-small; text-align: left;">NB<br>\
                You need invest minimum 50 USDT to actived your account.\
            </p>\
        </div>\
    </div>');
  }

  function accountActivation(userID,accounttype){
    $("#view").html('<div style="margin-top: 5vh;" class="row">\
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
      <div class="panel panel-success ">\
        <div class="panel-heading">\
          <h3 class="panel-title">Funded your Account</h3>\
        </div>\
        <div class="panel-body">\
          <div id="selectUsdt">\
            <p>Buy USDT</p>\
            <select onchange="paymentSelect(\''+userID+'\',\''+accounttype+'\')" id="fundamount" class="form-control" required="required">\
              <option value="0">Select Amount</option>\
              <option value="50">50 USDT</option>\
              <option value="100">100 USDT</option>\
              <option value="200">200 USDT</option>\
              <option value="300">300 USDT</option>\
              <option value="400">400 USDT</option>\
              <option value="500">500 USDT</option>\
              <option value="600">600 USDT</option>\
              <option value="700">700 USDT</option>\
              <option value="800">800 USDT</option>\
              <option value="900">900 USDT</option>\
              <option value="1000">1000 USDT</option>\
              <option value="1200">1200 USDT</option>\
              <option value="1500">1500 USDT</option>\
              <option value="2000">2000 USDT</option>\
              <option value="3000">3000 USDT</option>\
              <option value="4000">4000 USDT</option>\
              <option value="5000">5000 USDT</option>\
            </select>\
          </div>\
          <div id="payDetails" style="display: none;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
          </div>\
          <!-- <div class="alert alert-success">\
            <strong>Thanks!</strong> Your Payment is under process, It will take up to 24 hr \
          </div> -->\
        </div>\
    </div>\
    </div>\
   </div>');
  }
  


  function paymentSelect(userID,accounttype){
    $.post('/user/Getupiandusdt',{},function(res){
            
            var usdt=$("#fundamount").val().replace(/\s/g, '');
            var usdtRate=Number(res.usdtrate.usdtrate)
            if(res.usdtrate){
                var inr=Number(usdt)* usdtRate;
                if(res.upi.length >0){
                    for (let ele of res.upi) {
                        if(inr <= Number(ele.balanceamount) ){
                            procedwith(userID,accounttype,inr,usdt,ele.upiid,usdtRate);
                            break;
                        }else{
                            if(Number(ele.balanceamount) < 5001 ){
                                closeUpi(ele.upiid);
                            }
                        }
                        
                      }
                }else{
                    alert("We are Temporaly Stop Sale USDT");
                    return; 
                }

            }else{
                alert("USDT RATE Not Found");
                return;
            }
            
    })
    

  }

  function procedwith(userID,accounttype,inr,usdt,upiid,usdtRate){
    //console.log("Proced with",userID,accounttype,inr,usdt,upiid,usdtRate)
    $("#selectUsdt").css({"display":"none"});
    $("#payDetails").css({"display":"block"});
    $("#payDetails").html('<div class="thumbnail">\
        <div class="caption">\
        <h3>'+usdt+' USDT</h3>\
        <p>Rs.'+usdtRate+'</p>\
        <div style="background-color: rgb(167, 152, 181); font-size: medium; padding:3px; ">\
        <h4>Transfer Amount Rs. '+inr+'</h4>\
        <div style="font-size: larger;">UPI ID:<br>'+upiid+'\
            <span style="margin-left: 20px;"><i class="fa fa-clone" aria-hidden="true"></i></span>\
        </div>\
        <p>Pay above amount mention UPI id</p>\
        </div>\
        <label>UTR No:</label>\
        <input type="text" id="utrno" class="form-control">\
        <label>Payment Screen shot:</label>\
        <input type="file" id="input" class="form-control">\
        <br>\
        <p onclick="completeFundProcess(\''+userID+'\',\''+accounttype+'\',\''+inr+'\' ,\''+usdt+'\',\''+upiid+'\')" class="btn btn-primary">Submit</p>\
        </div>\
  </div>');
  }

  function closeUpi(upiid){
   
    console.log("Close this UPI");
  }



  function completeFundProcess(userID,accounttype,inr,usdt,upiid){
    var utrno=$("#utrno").val().replace(/\s/g, '');
    if(utrno.length < 8){
        alert('Enter UTR no ');
        $("#utrno").focus()
        return
       }
    $.post('/user/addfund',{
        userID:userID,
        accounttype:accounttype,
        inr:inr,
        usdt:usdt,
        utrno:utrno,
        upiid:upiid
    },function(refno){
        $("#payDetails").html('<div class="alert alert-success">\
        <strong>Thanks!</strong> Your Payment ref no <strong>'+refno.refno+'</strong> is under process, It will take up to 24 hr \
      </div>')
    })
  }
  

  function mainContent(user){
    $("#view").html('<div class="row" style="height: 10vh; margin-top: 3vh;">\
    <div  class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
        <ul class="list-group">\
            <li class="list-group-item">\
                <div  class="row">\
                    <div id="totalearning" class="col-xs-6 col-sm-6 col-md-6 col-lg-6">\
                    </div>\
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">\
                        <div onclick="profile('+user.userID+')">\
                            <div style="font-size: 25px; text-align: center;"><i class="fa fa-user-circle" aria-hidden="true"></i></div>\
                            <div id="userContent" class="text-center">'+user.userName+'<br>ID: RR-'+user.userID+'</div>\
                        </div>\
                    </div>\
                </div>\
            </li>\
        </ul>\
    </div>\
    <div style="height: 10vh; margin-top: 1vh;" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
        <div class="row">\
            <div id="profile" style="display: none;" class="col-xs-12 col-sm-12" >\
            </div>\
            <div id="levelView" style="display: none;" class="col-xs-12 col-sm-12" >\
            </div>\
            <div id="viewmenu" class="col-xs-12 col-sm-12">\
            </div>\
            <div id="viewwallet" class="col-xs-12 col-sm-12">\
            </div>\
            <div id="viewfooter" class="col-xs-12 col-sm-12">\
            </div>\
        </div>\
    </div>');
    totalearning(user.userID);
   
    

  }

  function profile(){
    $.post('/user/userProfile',{},function(user){
        var conte='https://richrova.co.uk/user?refrootID='+user.rootID+'&refid='+user.userID+'&refname='+user.userName+'';
        conte=encodeURI(conte);
        $("#profile").css({"display":"block"});
        $("#profile").html('\
        <ul class="list-group">\
            <li class="list-group-item">Name : '+user.userName+'\
            <span  onclick="closeprofile()" style="color:red" class="badge">X</span>\
            </li>\
            <li class="list-group-item">Email : '+user.email+'</li>\
            <li class="list-group-item">Mobile : '+user.mobile+'</li>\
            <li class="list-group-item">Address : '+user.address+'</li>\
            <li class="list-group-item"><strong>Copy Ref-Link</strong> :'+conte+'  <span onclick="copyContent(\''+conte+'\')" style="margin-left: 20px;"><i class="fa fa-clone" aria-hidden="true"></i></span></li>\
            <li class="list-group-item">\
                <a  onclick="editbankinit('+user.userID+')" id="editBankBtn" class="btn btn-xs btn-primary">Add Payment Details</a>\
                <a  onclick="changePasswordinit('+user.userID+')" id="newPaswBtn" class="btn btn-xs btn-primary">Change Password</a>\
                <p id="editBank"></p>\
                <p id="changePasw"></p>\
            </li>\
        </ul>');
    });

    

  }

  function copyContent(content){
    alert(content)
    navigator.clipboard.writeText(content);
  }

  function closeprofile(){
    $("#profile").css({"display":"none"});
    $("#profile").html("");
  }

  function editbankinit(id){
    $("#editBank").html('<legend>Add / Update Bank</legend>\
    <div class="form-group">\
        <label for="">Bank Name :*</label>\
        <input type="text" class="form-control" id="bankName" >\
    </div>\
    <div class="form-group">\
        <label for="">Bank Account no :*</label>\
        <input type="text" class="form-control" id="bankAccount" >\
    </div>\
    <div class="form-group">\
        <label for="">Bank IFSC :*</label>\
        <input type="text" class="form-control" id="bankIfsc" >\
    </div>\
    <div class="form-group">\
        <label for="">Bank Branch :*</label>\
        <input type="text" class="form-control" id="bankbranch" >\
    </div>\
    <button onclick="editBank('+id+')" class="btn btn-primary">Submit</button>');
    $("#editBankBtn").css({"display":"none"});
    $("#newPaswBtn").css({"display":"none"});

  }
  

  function editBank(id){
    var bankName=$("#bankName").val().replace(/\s/g, '');
    var bankAccount=$("#bankAccount").val().replace(/\s/g, '');
    var bankIfsc=$("#bankIfsc").val().replace(/\s/g, '');
    var bankbranch=$("#bankbranch").val().replace(/\s/g, '');
    $.post('/user/editBank',{
        id:id,
        bankName:bankName,
        bankAccount:bankAccount,
        bankIfsc:bankIfsc,
        bankbranch:bankbranch
    },function(data){
        logout();
    })

    
  }

  function changePasswordinit(id){
   // alert(id)
    $("#changePasw").html('<legend>Re-Set Login Password</legend>\
    <div class="form-group">\
        <label for="">New Password :*</label>\
        <input type="text" class="form-control" id="newPasw" >\
    </div>\
    <button onclick="changePasw('+id+')" class="btn btn-primary">Reset</button>');
    $("#editBankBtn").css({"display":"none"});
    $("#newPaswBtn").css({"display":"none"});

  }
  

  function changePasw(id){
    
    var newPasw=$("#newPasw").val().replace(/\s/g, '');

    if(newPasw.length < 6){
        alert('Password Must be 6 to 18 charecter');
        $("#newPasw").focus()
        return
    } 

    $.post('/user/changePasswor',{
        id:id,
        newPasw:newPasw
    },function(data){
        logout();
    })
 }





  function addMember(id){
    $.post('/user/addMember',{id:id},function(user){

        $("#loginPanel").css({"display":"block"});
        $("#login").css({"display":"block"});
        $("#regit").css({"display":"block"});

        $("#logout").css({"display":"none"});
        $("#logout").css({"display":"none"});
        $("#dashHome").css({"display":"none"});
        $("#UserPanel").css({"display":"none"});
        regClick();
        $("#SponsorName").val(user.userName);
        $("#SponsorRootID").val(user.rootID);
        $("#sponsorID").val(user.userID);

    });

  }

  function totalearning(userID){
    $.post('/user/getWallets',{userID:userID},function(data){
        if(data.wallet){
            var total=data.wallet.totalamount;
        }else{
            var total=0; 
        }
        $("#totalearning").html('\
            <p>TOTAL EARNING</p>\
            <p>RS. '+Number(total).toFixed(2)+'</p>')
            viewmenu(userID);

    })
   
  }

  function viewmenu(userID){
    $("#viewmenu").html('<ul class="list-group">\
    <li class="list-group-item col-xs-12 col-sm-12">\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div onclick="accountActivation(\''+userID+'\',\'Old\')" style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-plus-square" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Add Fund</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-history" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Fund History</p>\
            </div>\
        </div>\
            \
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div onclick="withdrawalInit(\''+userID+'\',\'Old\')"  style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-usd" aria-hidden="true"></i><i class="fa fa-usd" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Withdrawal</p>\
            </div>\
        </div>\
            \
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-history" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Withdrawal history</p>\
            </div>\
        </div>\
            \
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-exchange" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Internal Transfer</p>\
            </div>\
        </div>\
                \
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div onclick="directlevelview(\''+userID+'\',1)"  style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-sitemap" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Direct Refferal</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div onclick="levelView(\''+userID+'\')" style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-level-down" aria-hidden="true"></i><i class="fa fa-level-up" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Level View</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div onclick="addMember('+userID+')" style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-user-md" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Add Member</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-question-circle" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Enquiry</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
        <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
            <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-question-circle" aria-hidden="true"></i></button>\
            <p style="font-size: xx-small;">Enquiry</p>\
        </div>\
    </div>\
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
    <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
        <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-question-circle" aria-hidden="true"></i></button>\
        <p style="font-size: xx-small;">Enquiry</p>\
    </div>\
</div>\
<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
<div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
    <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-question-circle" aria-hidden="true"></i></button>\
    <p style="font-size: xx-small;">Enquiry</p>\
</div>\
</div>\
    </li>\
</ul>');
    viewwallet(userID);
    viewfooter(userID);
  }

    async function levelView(userID){
        $("#levelView").css({"display":"block"});
        $("#levelView").html('<div class="panel panel-info">\
            <div class="panel-heading">\
            <span  onclick="closeLevelview()" style="color:red; float:right;" class="badge">X</span>\
              <h3 class="panel-title">Level View Summary</h3>\
            </div>\
            <div class="panel-body">\
              <div class="table-responsive">\
                <table class="table table-hover">\
                  <thead>\
                    <tr>\
                      <th>Level</th>\
                      <th>Members</th>\
                      <th>Business</th>\
                      <th>Income</th>\
                      <th>View</th>\
                    </tr>\
                  </thead>\
                  <tbody id="levellist">\
                  </tbody>\
                </table>\
              </div>\
            </div>\
        </div>');
        for(var l=1; l<= 10; l++){
           // console.log(l)
          await  $.post('/user/levelview',{userID:userID, level:l},function(data){
            //console.log(data)
            if(data.member!=0){
                $("#levellist").append('<tr>\
                      <td>'+data.level+'</td>\
                      <td>'+data.member+'</td>\
                      <td>'+data.totalBusiness+'</td>\
                      <td>'+data.totalearning+'</td>\
                      <td>\
                      <button onclick="directlevelview(\''+userID+'\',\''+l+'\')" type="button" class="btn btn-success btn-xs">View</button>\
                      </td>\
                    </tr>');
            }
            })
          }

    }

   function closeLevelview(){
    $("#levelView").css({"display":"none"});
    $("#levelView").html("");
   } 

   function directlevelview(userID,level){
    $("#levelView").css({"display":"block"});
        $("#levelView").html('<div class="panel panel-info">\
            <div class="panel-heading">\
            <span  onclick="closeLevelview()" style="color:red; float:right;" class="badge">X</span>\
              <h3 class="panel-title">Level '+level+' View</h3>\
            </div>\
            <div class="panel-body">\
              <div class="table-responsive">\
                <table class="table table-hover">\
                  <thead>\
                    <tr>\
                      <th>ID</th>\
                      <th>Joining Date</th>\
                      <th>View</th>\
                    </tr>\
                  </thead>\
                  <tbody id="levellist">\
                  </tbody>\
                </table>\
              </div>\
            </div>\
        </div>');
    $.post('/user/directlevelview',{userID:userID, level:level},function(data){
      if(data.length >0) {
        data.forEach(val => {
            $("#levellist").append('<tr>\
                <td>RR-'+val.userID+'</td>\
                <td>'+val.date+'</td>\
                <td>\
                <button onclick="showusername(\''+val.userID+'\')" type="button" class="btn btn-success btn-xs">View</button>\
                </td>\
              </tr>');
        })
      } 
    });
   }

   function showusername(userID){
    $.post('/user/getUserView',{userID:userID},function(user){
        alert(user.userName)
    })
   }

  function viewwallet(userID){
   // alert(userID)
    $.post('/user/getWallets',{userID:userID},function(data){
        //console.log(fund)
        var invetment=0;
        if(data.fund.length >0){
            data.fund.forEach(val => {
                invetment=Number(invetment)+ Number(val.usdt);
            });
        }
       
       

        var totalwithdrawal= Number(data.wallet.interest)+Number(data.wallet.principal)+Number(data.wallet.commision)+Number(data.wallet.salary)
        $("#viewwallet").html('<ul class="list-group">\
        <li class="list-group-item col-xs-12 col-sm-12">\
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\
                <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                    <p style="font-size: xx-small;">Comission: '+Number(data.wallet.commision).toFixed(2)+' USDT</p>\
                    <p style="font-size: xx-small;">Salary: '+Number(data.wallet.salary).toFixed(2)+' USDT</p>\
                    <p style="font-size: xx-small;">Performence Bonus</p>\
                </div>\
            </div>  \
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\
                <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                    <p style="font-size: xx-small;">Interest: '+Number(data.wallet.interest).toFixed(2)+' USDT</p>\
                    <p style="font-size: xx-small;">Pricipal: '+Number(data.wallet.principal).toFixed(2)+' USDT</p>\
                    <p style="font-size: xx-small;">Profit Shareing</p>\
                </div>\
            </div> \
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\
                <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                    <img style="width: 30px" src="/images/other/tether-usdt-logo.png" alt="">\
                    <p>'+invetment+' USDT </p>\
                    <p style="font-size: xx-small;">Fund Investment</p>\
                </div>\
            </div> \
        </li>\
        <li class="list-group-item col-xs-12 col-sm-12">\
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
                <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                    <p style="font-size: large;">E-Wallet</p>\
                    <p style="font-size: large;">Total Amount</p>\
                    <p style="font-size: large;">'+Number(totalwithdrawal).toFixed(2)+' USDT</p>\
                </div>\
            </div> \
            <p style="font-size: xx-small;">NB:<br>1. Admin charge 5% will be deducted every Withdrawal<br>\
            2. Minimum Withdrawal Limit is 10 USDT</p>\
        </li>\
    </ul>')

    });
  }

  function withdrawalInit(userID){
    $.post('/user/getWallets',{userID:userID},function(data){
        var total= Number(data.wallet.interest)+Number(data.wallet.principal)+Number(data.wallet.commision)+Number(data.wallet.salary)
        $("#view").html('            <div class="panel panel-success">\
                  <div class="panel-heading">\
                        <h3 class="panel-title">Withdrawal</h3>\
                  </div>\
                  <div class="panel-body">\
                    <h1>Total : '+Number(total).toFixed(2)+' USDT</h1>\
                    <p>\
                        Interest Return: '+Number(data.wallet.interest).toFixed(2)+' USDT<br>\
                        Principal Return: '+Number(data.wallet.principal).toFixed(2)+' USDT<br>\
                        Commission: '+Number(data.wallet.commision).toFixed(2)+' USDT<br>\
                        Salary: '+Number(data.wallet.salary).toFixed(2)+' USDT<br>\
                    </p>\
                    <div class="form-group">\
                        <label for="">Crypto Wallet Address: BEP-20</label>\
                        <textarea name="" id="usdtwalletAddress" class="form-control" rows="3" required="required"></textarea>\
                        <label style="color: red;" for=""><br>Crypto Wallet Address Should be BEP-20 and Check Address\
                            <br>\
                            If you Mistake in this part your Assest will lost for ever\
                        </label>\
                    </div>\
                    <button onclick="processWithdrawal(\''+userID+'\',\''+data.wallet.interest+'\',\''+data.wallet.principal+'\',\''+data.wallet.commision+'\',\''+data.wallet.salary+'\',\''+total+'\')" type="submit" class="btn btn-primary">Withdrawal</button>\
                  </div>\
            </div>')
    })

  }

  function processWithdrawal(userID,interest,principal,commision,salary,total){
    var usdtwalletAddress=$("#usdtwalletAddress").val();
    $.post('/user/processWithdrawal',{
        userID:userID,
        interest:interest,
        principal:principal,
        commision:commision,
        salary:salary,
        total: total,
        usdtwalletAddress:usdtwalletAddress
    },function(data){
        $("#view").html(' <div class="panel panel-success">\
            <div class="panel-heading">\
                  <h3 class="panel-title">Withdrawal</h3>\
            </div>\
            <div class="panel-body">\
              Withdrawal Success <br>\
              Transaction ID: '+data+'\
            </div>\
      </div>')
    })
  }
  

  function viewfooter(){
    $("#viewfooter").html('<ul class="list-group">\
    <li class="list-group-item col-xs-12 col-sm-12">\
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 60px;" class="thumbnail">\
                <p style="font-size: xx-small;">Total Direct</p>\
                <p style="font-size: xx-small;">12</p>\
            </div>\
        </div> \
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 60px;" class="thumbnail">\
                <p style="font-size: xx-small;">Total Member</p>\
                <p style="font-size: xx-small;">12</p>\
            </div>\
        </div>\
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 60px;" class="thumbnail">\
                <p style="font-size: xx-small;">Total Bonus</p>\
                <p style="font-size: xx-small;">12</p>\
            </div>\
        </div>\
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 60px;" class="thumbnail">\
                <p style="font-size: xx-small;">Total Other</p>\
                <p style="font-size: xx-small;">12</p>\
            </div>\
        </div>\
    </li>\
    </ul>');
  }


   
  