$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();

    var sponsRootID=$("#sponsRootID").val();
    var sponsID=$("#sponsID").val();
    var sponsName=$("#sponsName").val();
   
    
    if(allredyloginuserID){

        $("#UserPanel").css({"display":"block"});
        $("#UserPanel").css({"display":"block"});
        $("#dashHome").css({"display":"block"});
        $("#logout").css({"display":"block"});

        $("#loginPanel").css({"display":"none"});
        $("#login").css({"display":"none"});
        $("#regit").css({"display":"none"});

        

        getUserprofile(allredyloginuserID);
    }else{

        if(sponsRootID && sponsID && sponsName){
           // alert(sponsRootID)

            $("#loginPanel").css({"display":"block"});
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            $("#UserPanel").css({"display":"none"});
            regClick();
            $("#SponsorName").val(sponsName);
            $("#SponsorRootID").val(sponsRootID);
            $("#sponsorID").val(sponsID);

           //// http://localhost:3001/user/?rootID=A321&id=12&name=sukanta
            

        }else{
            $("#loginPanel").css({"display":"block"});
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            $("#UserPanel").css({"display":"none"});
        }


        
        
        
    }

    ///////For Password Toggle/////////

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#regPassword');
  
    togglePassword.addEventListener('click', function (e) {
      // toggle the type attribute
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      // toggle the eye slash icon
      this.classList.toggle('fa-eye-slash');
  });

})



function loginClick(){
    $("#loginPanel").css({"display":"block"});
    $("#RegistrationPanel").css({"display":"none"});

    
}

function regClick(){
    $("#RegistrationPanel").css({"display":"block"});
    $("#loginPanel").css({"display":"none"});
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
                $("#UserPanel").css({"display":"block"});
                $("#UserPanel").css({"display":"block"});
                $("#dashHome").css({"display":"block"});
                $("#logout").css({"display":"block"});

                $("#loginPanel").css({"display":"none"});
                $("#login").css({"display":"none"});
                $("#regit").css({"display":"none"});

                getUserprofile(user.userID);
                location.replace("/user");
            }else{
                alert("Worng Credential")
            }
        })

  }


  function logout(){
    $.post('/user/logout',{},function(data){
        if(data){
            $("#loginPanel").css({"display":"block"});
            $("#login").css({"display":"block"});
            $("#regit").css({"display":"block"});
    
            $("#logout").css({"display":"none"});
            $("#logout").css({"display":"none"});
            $("#dashHome").css({"display":"none"});
            $("#UserPanel").css({"display":"none"});
            $("#CompleteRegistration").css({"display":"none"});
        }
    })

  }

  function getUserprofile(userID){
    $.post('/user/GetUser',{userID:userID},function(user){
        if(user.adharNo || user.userType=="Active"){
            $("#CompleteRegistration").css({"display":"none"});
            profile();
        }else{
            $("#CompleteRegistration").css({"display":"none"});
            profile();
            
        }
    });
    
  }

  function profile(){
    $.post('/user/userProfile',{},function(user){
        $("#userProfile").css({"display":"block"});

        $("#mytree").css({"display":"none"});
        $("#other").css({"display":"none"});

        $("#userContent").html(''+user.userName+'<br>ID: MR-'+user.userID+'')
        $("#userProfile").html('<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-lg-offset-3 col-md-offset-3">\
                <div class="thumbnail">\
                    <img data-src="#" alt="">\
                    <div class="caption">\
                        <h3>'+user.userName+'</h3>\
                        <p>\
                           My SponsorID: MR-'+user.userID+'\
                           <hr>\
                        </p>\
                        <p>Mobile Number: '+user.mobile+'</p>\
                        <p>Address: '+user.address+'</p>\
                        <p id="editBank"></p>\
                        <p id="changePasw"></p>\
                        <p>\
                            <a  onclick="editbankinit('+user.userID+')" id="editBankBtn" class="btn btn-primary">Add Payment Details</a>\
                            <a  onclick="changePasswordinit('+user.userID+')" id="newPaswBtn" class="btn btn-primary">Change Password</a>\
                        </p>\
                    </div>\
                </div>\
            </div>')


    });      
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

  function myTree(id,lavel){
    //alert(id)
    $.post('/user/getTree',{id:id,lavel:lavel},function(data){
       // console.log(data)
        $("#mytree").css({"display":"block"});
        
        $("#other").css({"display":"none"})
        $("#treeHead").html(' <li class="list-group-item active">\
        <span class="badge">'+data.Mytree.length+'</span>\
        <span class="badge">Lavel-'+lavel+'</span>\
        '+data.user.userName+' [ Total : '+data.totalChain+' ]\
        </li>\
        <li class="list-group-item" style="height: 6vh; margin-top:2px;">\
        <div class="col-xs-8">\
        <select id="yourlavel" class="form-control">\
            <option value="">Select Lavel</option>\
            <option value="1">Direct</option>\
            <option value="2">Lavel-2</option>\
            <option value="3">Lavel-3</option>\
            <option value="4">Lavel-4</option>\
            <option value="5">Lavel-5</option>\
            <option value="6">Lavel-6</option>\
            <option value="7">Lavel-7</option>\
            <option value="8">Lavel-8</option>\
            <option value="9">Lavel-9</option>\
            <option value="10">Lavel-10</option>\
            <option value="11">Lavel-11</option>\
            <option value="12">Lavel-12</option>\
            <option value="13">Lavel-13</option>\
            <option value="14">Lavel-14</option>\
            <option value="15">Lavel-15</option>\
            <option value="16">Lavel-16</option>\
            <option value="17">Lavel-17</option>\
            <option value="18">Lavel-18</option>\
            <option value="19">Lavel-19</option>\
            <option value="20">Lavel-20</option>\
        </select>\
        </div>\
        <div class="col-xs-4">\
        <button onclick="callLavelTree('+id+')" type="button" class="btn btn-sm btn-primary">Go</button>\
        </div>\
        </li>');
        $("#treeList").html("")
        data.Mytree.forEach(val => {
            var cstClass="list-group-item-success";
            if(val.paidEarninyStatus=="Due"){
                cstClass= "list-group-item-info";
            }
            
            $("#treeList").append('<li class="list-group-item '+cstClass+'">'+val.userName+'<br/>ID: MR-'+val.userID+'</li>')
            
        });
        $("#treeList").append('<li style="" class="list-group-item"> \
            <ul class="pagination pagination-sm">\
                <li><a href="#">&laquo;</a></li>\
                <li><a href="#">1</a></li>\
                <li><a href="#">2</a></li>\
                <li><a href="#">&raquo;</a></li>\
           </ul>\
           </li>');
    });
  }

  function callLavelTree(id){
    var lavel=$("#yourlavel").val();
    myTree(id,lavel);
  }

  function activeThisUser(id){
    $("#ActivateThisUser").css({"display":"block"});
    $("#ActivateThisUser").html('<div  style="margin-top:3vh; height:101vh" class="row">\
    <div  class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
        <div class="panel panel-success">\
            <input type="hidden"  id="activeUserID" value="'+id+'">\
              <div class="panel-heading">\
                    <h3 class="panel-title">Complete this to Activate </h3>\
              </div>\
                <div class="form-group">\
                    <label>Western Union ID</label>\
                        <input type="text"  id="wuID" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Western Union Password</label>\
                        <input type="text"  id="wuPsd" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Binance ID</label>\
                        <input type="text"  id="BinanceID" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Binance Password</label>\
                        <input type="text"  id="BinancePsd" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Email ID</label>\
                        <input type="text"  id="EmlID" class="form-control" >\
                </div>\
\
                <div class="form-group">\
                    <label>Email Password</label>\
                        <input type="text"  id="EmlPsd" class="form-control" >\
                </div>\
                <div class="form-group">\
                    <label>Bank Details</label> \
                    <textarea  id="BankDelais" class="form-control" rows="3" placeholder="Name , A/c, IFSC, Bank Nane"></textarea>\
                </div>\
                <button onclick="completeReg()" type="button" class="btn btn-primary">Submit</button>\
              </div>\
        </div>  \
    </div>')

  }

  function createRefLink(id){
    $.post('/user/createRefLink',{id:id},function(data){


        var conte='https://moneyremid.com/user?refrootID='+data.rootID+'&refid='+data.userID+'&refname='+data.userName+'';
        console.log(conte);
        conte=encodeURI(conte);

        $("#refLink").css({"display":"block"})

        $("#other").css({"display":"none"})
        $("#mytree").css({"display":"none"})
        navigator.clipboard.writeText(conte);
        

        $("#refLink").html('<div class="alert alert-info">\
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
        <strong>Copy This Link </strong>'+conte+'\
    </div>')
    })

  }

  function selfTradeInit(id){
    
    $("#other").html('<div id="selftrade" style="display: non;" class="panel panel-info">\
    <div class="panel-heading">\
        <h3 class="panel-title">Today USDT Rate : 90.00 INR</h3>\
    </div>\
    <div class="panel-body">\
    <div class="row">\
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
          <div class="form-group">\
            <label for="inputtradeAmount" class="col-sm-3 control-label">Trade-Amount:</label>\
            <div class="col-sm-4">\
                <select onchange="usdtcalculetion()" id="inputtradeAmount" class="form-control">\
                    <option value="0">Select Amount</option>\
                    <option value="10000">10000</option>\
                    <option value="25000">25000</option>\
                    <option value="50000">50000</option>\
                    <option value="100000">100000</option>\
                  </select>\
            </div>\
            <div  class="col-sm-4">\
                USDT: <span id="usdtvalue">302.11</span>\
            </div>\
            <div class="col-sm-4 col-sm-offset-3" style="margin-top: 5px;">\
                <button onclick="newTradeRequest('+id+')" type="button" class="btn btn-danger">Request</button>\
            </div>\
          </div>\
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
            <ul id="tradeRequestList" class="list-group" style="height: 50vh; overflow-y: auto; margin-top: 10px;" >\
            </ul>\
          </div>\
        </div>\
    </div>\
    </div>\
</div>')
    $("#other").css({"display":"block"});
    $("#mytree").css({"display":"none"});
    $("#refLink").css({"display":"none"});
    $("#userProfile").css({"display":"none"});
    $("#tradeRequestList").html('')
    getTradeRequest(id);
  }

  function getTradeRequest(id){
    $.post('/user/getTradeRequest',{id:id},function(data){
        if(data.length > 0){
            $("#tradeRequestList").html('')
            data.forEach(val => {
                
                $("#tradeRequestList").append('<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">\
                <div class="thumbnail">\
                    <div class="caption">\
                        <h3>Trade Request</h3>\
                        <p>\
                            Name: '+val.userName+'<br>\
                            ID: '+val.userID+'<br>\
                            Trade Amount: '+val.tradeAmount+' INR<br>\
                            USDT: '+val.usdtbuy+'<br>\
                            Status: Sell Pending<br>\
                        </p>\
                        <p>\
                            <a href="#" class="btn btn-primary">Update</a>\
                            <a href="#" class="btn btn-danger">Cancel Request</a>\
                        </p>\
                    </div>\
                </div>\
            </div>') 
            });
        } 
    })
  }


  function usdtcalculetion(){
   var inr= $("#inputtradeAmount").val();
   var usdt=(Number(inr) / 90).toFixed(2);
   $("#usdtvalue").html(''+usdt+'')
   
  }

  function newTradeRequest(id){
   
    var inr= $("#inputtradeAmount").val();
    var usdt=(Number(inr) / 90).toFixed(2);
    if(inr > 0){
        $.post('/user/tradeRequest',{
            id:id,
            usdt:usdt,
            inr:inr
        },function(user){
           getTradeRequest(user.userID); 
        });
    }else{
        alert("Select Trade-Amount")
    }

  }


  function viewmenu(){
    $("#viewmenu").html('<ul class="list-group">\
    <li class="list-group-item col-xs-12 col-sm-12">\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
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
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
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
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-sitemap" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Direct Refferal</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
                <button  type="button" class="btn btn-sm btn-info"><i class="fa fa-level-down" aria-hidden="true"></i><i class="fa fa-level-up" aria-hidden="true"></i></button>\
                <p style="font-size: xx-small;">Level View</p>\
            </div>\
        </div>\
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">\
            <div style="text-align: center; border: 1px solid #FFF;" class="thumbnail">\
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
    </li>\
</ul>');
  }

  function viewwallet(){
    $("#viewwallet").html('<ul class="list-group">\
    <li class="list-group-item col-xs-12 col-sm-12">\
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                <p style="font-size: xx-small;">Comission: 0.00 USDT</p>\
                <p style="font-size: xx-small;">Salary: 0.00 USDT</p>\
                <p style="font-size: xx-small;">Performence Bonus</p>\
            </div>\
        </div>  \
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                <p style="font-size: xx-small;">Interest: 0.00 USDT</p>\
                <p style="font-size: xx-small;">Pricipal: 0.00 USDT</p>\
                <p style="font-size: xx-small;">Profit Shareing</p>\
            </div>\
        </div> \
        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                <img style="width: 30px" src="/images/other/tether-usdt-logo.png" alt="">\
                <p>0.00 USDT </p>\
                <p style="font-size: xx-small;">Fund Invent</p>\
            </div>\
        </div> \
    </li>\
    <li class="list-group-item col-xs-12 col-sm-12">\
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\
            <div style="text-align: center; border: 1px solid rgb(32, 11, 11); height: 110px;" class="thumbnail">\
                <p style="font-size: large;">E-Wallet</p>\
                <p style="font-size: large;">Total Amount</p>\
                <p style="font-size: large;">0.00 USDT</p>\
            </div>\
        </div> \
        <p style="font-size: xx-small;">NB:<br>1. Admin charge 5% will be deducted every Withdrawal<br>\
        2. Minimum Withdrawal Limit is 10 USDT</p>\
    </li>\
</ul>')
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
   
  