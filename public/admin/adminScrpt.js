$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();
//alert(allredyloginuserID)
    if(allredyloginuserID){
        $("#login").css({"display":"none"});
        $("#view").css({"display":"block"});
        $("#login").css({"display":"none"});
        $("#sidebar-waper").css({"display":"block"});
        $("#allUser").css({"display":"blocke"});
        $("#sidebar-waper").css({"display":"nonee"});
        $("#allUser g").html('<div  class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">\
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
        </div>')
        
    }else{
        loginClick();
    }
    
    

});


function loginClick(){
    $("#sidebar-waper").css({"display":"none"});
    $("#login").css({"display":"block"});
    $("#view").css({"display":"none"});

}

function login(){
    var email=$("#email").val().trim();
    var password=$("#password").val().trim();
    console.log(email,password)
    $.post('/admin/login',{email:email,password:password},function(data){
        if(data=="success"){
           location.replace("/admin");
        }else{
            alert(data);
        }
       
    })
}

function logout(){
    $.post('/admin/logout',{},function(data){
        if(data){
            location.replace("/admin");
           
        }
    })

  }

  function logout(){
    $.post('/admin/logout',{},function(data){
        if(data){
            location.replace("/admin");
           
        }
    })

  }



function newChannelInit(){
    $("#newChannel").html('<div  class="col-xs-12 col-sm-12">\
    <div class="panel panel-success">\
          <div class="panel-heading">\
                <h3 class="panel-title">Register New Partner Channel</h3>\
          </div>\
          <div class="panel-body">\
                <div class="form-group">\
                    <label>Username</label>\
                        <input type="text"  id="regEmail" class="form-control" placeholder="Email ie hkdhkfhs@gmail.com">\
                </div>\
                <div class="form-group">\
                    <label>Password</label>\
                        <input type="password"  id="regPassword" class="form-control" placeholder="6 to 18 Chracter">\
                </div>\
                <div class="form-group">\
                    <label>Full Name</label>\
                        <input type="text"  id="regUserName" class="form-control" placeholder="ei: Sushanta Majumder">\
                </div>\
                <div class="form-group">\
                    <label>Address</label>\
                       <textarea id="regAddress" class="form-control" rows="3" ></textarea>\
                </div>\
                <div class="form-group">\
                    <label>Mobile Number</label>\
                        <input type="number"  id="regMobile" class="form-control" placeholder=" 10 Digit Number">\
                </div>\
                <div class="form-group">\
                    <label>Channel</label>\
                        <select id="channelRoot" class="form-control" required="required">\
                            <option value="">Select Channel</option>\
                            <option value="A">A</option>\
                            <option value="B">B</option>\
                            <option value="C">C</option>\
                            <option value="D">D</option>\
                            <option value="E">E</option>\
                            <option value="F">F</option>\
                            <option value="G">G</option>\
                            <option value="H">H</option>\
                            <option value="I">I</option>\
                            <option value="J">J</option>\
                            <option value="K">K</option>\
                            <option value="L">L</option>\
                            <option value="M">M</option>\
                            <option value="N">N</option>\
                        </select>\
                </div>\
                <button onclick="createNewChannel()" type="button" class="btn btn-primary">Register</button>\
          </div>\
    </div>\
</div>')
}

function createNewChannel(){
    var regEmail=$("#regEmail").val().replace(/\s/g, '');
    var regPassword=$("#regPassword").val();
    var regUserName=$("#regUserName").val();
    var regAddress=$("#regAddress").val();
    var regMobile=$("#regMobile").val();
    var channelRoot=$("#channelRoot").val();
    // var regPan=$("#regPan").val().toUpperCase().replace(/\s/g, '');

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
        //  if(regPan.length != 10){
        //     alert('Enter Valid PAN Number');
        //     $("#regPan").focus()
        //     return
        //  }
         if(!channelRoot.length){
            alert('Select Root Channel');
            $("#channelRoot").focus()
            return
         }

         ///////Check Exist//////////

         $.post('/admin/checkuserexist',{channelRoot:channelRoot,regEmail:regEmail},function(data){
           if(!data){
            /////////Save New Partner//////
            $.post('/admin/newPartner',{
                regEmail:regEmail,
                regPassword:regPassword,
                regUserName:regUserName,
                regAddress:regAddress,
                regMobile:regMobile,
                channelRoot:channelRoot
            },function(reg){
                alert("Registration  Success")
            })

           }else{
            alert("Already Register With Us")
           }
         })
}

function fundRequest(){
    $.post('/admin/fundrequest',{},function(data){
        if(data.length >0){
            $("#view").html('<div class="col-xs-12 col-sm-12 ">\
            <div class="panel panel-danger">\
                  <div class="panel-heading">\
                        <h3 class="panel-title">Fund Request</h3>\
                  </div>\
                  <div class="panel-body">\
                        <ul id="fundList" style="height: 80vh; overflow-y: scroll;" class="list-group">\
                        </ul>\
                  </div>\
            </div>\
        </div>')
            data.forEach(val => {
                $("#fundList").append('\
                <li class="list-group-item">\
                    <span onclick="rejectFund('+val.refno+')" style="background-color: rgb(200, 27, 27)" class="badge">Reject</span>\
                    <span onclick="acceptFund('+val.refno+')" style="background-color: rgb(103, 68, 68);" class="badge">Accept</span>\
                    Name: '+val.userName+'<br>\
                    UserID: '+val.userID+'<br>\
                    Amount : '+val.inr+'<br>\
                    USDT : '+val.usdt+' USDT<br>\
                    UTR NO: '+val.utrno+'<br>\
                    <img style="width: 50px;" src="/images/logo/logo-single.png" alt=""><br>\
                    Fund Deposit To<br>\
                    Sukanta Sardar\
                    UPI ID : sykajah@ybl\
                </li>');
            });
        }else{
            alert("no new data found")
        }
       
    })
    
}

function acceptFund(refno){
    $.post('/admin/acceptFund',{refno:refno},function(data){
       if(data){
        fundRequest();
       }
    })
}

function rejectFund(refno){
    $.post('/admin/rejectFund',{refno:refno},function(data){
        if(data){
         fundRequest();
        }
     })
}

function addupiinit(){
    $("#view").html('<div class="col-xs-12 col-sm-12 ">\
    <div class="panel panel-danger">\
          <div class="panel-heading">\
                <h3 class="panel-title">Add upi ID</h3>\
          </div>\
          <div class="panel-body">\
                    <legend>Upi Detalis</legend>\
                    <div class="form-group">\
                        <label for="">UPI ID:</label>\
                        <input type="text" class="form-control" id="upiid" placeholder="something@upi">\
                    </div>\
                    <div class="form-group">\
                        <label for="">Account Holder Name:</label>\
                        <input type="text" class="form-control" id="upiname" placeholder="Jhon Korner">\
                    </div>\
                    <div class="form-group">\
                        <label for="">UPI Limit:</label>\
                        <input type="text" class="form-control" id="upilimit" placeholder="eg: 100000">\
                    </div>\
                    <div class="form-group">\
                        <label for="">QR CODE:</label>\
                        <input type="file" class="form-control" id="upiqr" placeholder="eg: 100000">\
                    </div>\
                <button onclick="addupi()" class="btn btn-primary">Submit</button>\
          </div>\
    </div>\
</div>')
}

function addupi(){
    var upiid=$("#upiid").val().replace(/\s/g, '');
    var upiname=$("#upiname").val().replace(/\s/g, '');
    var upilimit=$("#upilimit").val().replace(/\s/g, '');

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])/; 

   

      if (reg.test(upiid) == false) 
          {
              alert('Invalid upi id');
              $("#upiid").focus();
              return 
          }
          if(upiname.length < 4){
            alert('Enter Name');
            $("#upiname").focus()
            return
        } 
        if(upilimit.length < 4){
            alert('Enter upilimit');
            $("#upilimit").focus()
            return
        } 
    
    $.post('/admin/addupi',{upiid:upiid,upiname:upiname,upilimit:upilimit},function(data){
       
        if(data){
            
            $("#view").html('<div class="alert alert-success">\
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
            <strong>UPI Add!</strong> Successfully ...\
        </div>')
        }
    })
}


function activeupiinit(){
            $("#view").html('<div class="col-xs-12 col-sm-12 ">\
            <div class="panel panel-danger">\
                  <div class="panel-heading">\
                        <h3 class="panel-title">UPI LIST</h3>\
                  </div>\
                  <div class="panel-body">\
                        <ul id="fundList" style="height: 80vh; overflow-y: scroll;" class="list-group">\
                            <select onchange="upilist()" name="" id="upistatus" class="form-control  ">\
                                <option value="new">Select</option>\
                                <option value="new">New</option>\
                                <option value="close">Close</option>\
                                <option value="open">Open</option>\
                            </select>\
                        </ul>\
                  </div>\
            </div>\
        </div>');
}

function upilist() {
   var upistatus=$("#upistatus").val().replace(/\s/g, '');
    $.post('/admin/upilist',{upistatus:upistatus},function(data){
        if(data.length > 0){
            $("#fundList").html("")
            data.forEach(val => {
                $("#fundList").append('\
                <li class="list-group-item">\
                    <span onclick="upistatusupdate(\''+val.upiid+'\',\'open\')" style="background-color: rgb(200, 27, 27)" class="badge">Open</span>\
                    <span onclick="upistatusupdate(\''+val.upiid+'\',\'close\')" style="background-color: rgb(103, 68, 68);" class="badge">Close</span>\
                    Name: '+val.upiName+'<br>\
                    UPI-ID: '+val. upiid+'<br>\
                    UPI LIMIT : '+val.upilimit+'<br>\
                    USES: '+val.useamount+'<br>\
                    Balance: '+val.balanceamount+'<br>\
                    Status: '+val.upistatus+'<br>\
                    <img style="width: 50px;" src="/images/logo/logo-single.png" alt=""><br>\
                </li>');
            });
           
        }else{
            alert("no new data found")
        }
       
    })

    
}

function upistatusupdate(upiid,upistatus){
    $.post('/admin/upistatusupdate',{upiid:upiid,upistatus:upistatus},function(data){
        if(data){
            activeupiinit(); 
        }
    })

}


function addusdtrateinit(){
    $("#view").html('<div class="col-xs-12 col-sm-12 ">\
    <div class="panel panel-danger">\
          <div class="panel-heading">\
                <h3 class="panel-title">Update USDT Rate</h3>\
          </div>\
          <div class="panel-body">\
                    <legend>Todays USDT Rate</legend>\
                    <div class="form-group">\
                        <label for="">USDT Rate:</label>\
                        <input type="text" class="form-control" id="usdt" placeholder="90.01">\
                    </div>\
                <button onclick="addusdtrate()" class="btn btn-primary">Submit</button>\
          </div>\
    </div>\
</div>')
}

function addusdtrate(){
    var usdt=$("#usdt").val().replace(/\s/g, '');
   
          if(usdt.length < 4){
            alert('Enter USDT Rate');
            $("#usdt").focus()
            return
        } 
        
    
    $.post('/admin/addusdtrate',{usdt:usdt},function(data){
        if(data){
            $("#view").html('<div class="alert alert-success">\
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
            <strong>usdt Add!</strong> Successfully ...\
        </div>')
        }
    })
}


function interestandCommissionInit(){
    $("#view").html('<div class="panel panel-success">\
                  <div class="panel-heading">\
                        <h3 class="panel-title">Incentive and Interest</h3>\
                  </div>\
                  <div class="panel-body">\
                    <div class=""> \
                     <div class="form-group">\
                            <label for=""> UserID : Sukanta SArdar</label>\
                            <input type="text" class="form-control" id="userID">\
                        </div>\
                        <div class="form-group">\
                            <label for=""> Commission</label>\
                            <input type="text" class="form-control" id="commision">\
                        </div>\
                        <div class="form-group">\
                            <label for="">Salary</label>\
                            <input type="text" class="form-control" id="salary">\
                        </div>\
                        <div class="form-group">\
                            <label for="">Interrest</label>\
                            <input type="text" class="form-control" id="interest">\
                        </div>\
                        <div class="form-group">\
                            <label for="">Principal return</label>\
                            <input type="text" class="form-control" id="principal">\
                        </div>\
                        <button onclick="incentiveandinterest()" type="submit" class="btn btn-primary">Submit</button>\
                    </div>\
                  </div>\
            </div>') 
}

function incentiveandinterest(){
    var userID=$("#userID").val();
    var commision=$("#commision").val();
    var salary=$("#salary").val();
    var interest=$("#interest").val();
    var principal=$("#principal").val();
    $.post('/admin/commisionIncentiveadd',{
        userID:userID,
        commision:commision,
        salary:salary,
        interest:interest,
        principal:principal
    },function(data){
        if(data){
            $("#view").html('<div class="panel panel-success">\
                <div class="panel-heading">\
                      <h3 class="panel-title">Incentive and Interest</h3>\
                </div>\
                <div class="panel-body">\
                <h3>add success</h3>\
                  </div>\
                </div>\
          </div>') 
        }

    })

}

// function userDetails(){
//     $.post('/admin/userDetails',{},function(user){
//         if(user.length > 0){
//             $("#allUser").css({"display":"block"})
//             $("#allUser").html('<div  class="col-xs-12 col-sm-12">\
//                 <div class="panel panel-success">\
//                     <div id="userListHeding" class="panel-heading">\
//                     </div>\
//                     <div class="panel-body">\
//                         <ul id="userList" class="list-group">\
//                         </ul>\
//                     </div>\
//                 </div>\
//             </div>');
//             $("#userListHeding").html('<h3 class="panel-title">All User  ['+user.length+']</h3>')
//             $("#userList").html("")
//             user.forEach(val=> {
//                 $("#userList").append('<li class="list-group-item">\
//                 userName:'+val.userName+'<br>\
//                 userID:'+val.userID+'<br>\
//                 rootID:'+val.rootID+'<br>\
//                 password:'+val.password+'<br>\
//                 email:'+val.email+'<br>\
//                 address:'+val.address+'<br>\
//                 mobile:'+val.mobile+'<br>\
//                 panNo:'+val.panNo+'<br>\
//                 adharNo:'+val.adharNo+'<br>\
//                 westrenUnionUser:'+val.westrenUnionUser+'<br>\
//                 westrenUnionPass:'+val.westrenUnionPass+'<br>\
//                 BinanceUser:'+val.BinanceUser+'<br>\
//                 BinancePass:'+val.BinancePass+'<br>\
//                 EmlID:'+val.EmlID+'<br>\
//                 EmlPsd:'+val.EmlPsd+'<br>\
//                 BankDelais:'+val.BankDelais+'<br>\
//                 regdate: '+val.regdate+'\
//             </li>');
//             });
//         }
//     })

// }


function setStartUserid(){
    var id=window.prompt();
    if(id){
         $.post('/admin/SetUserID',{id:id},function(data){
                if(data){
                    alert("Set Start User ID UserID to"+ data);
                }
            })
    }
   
    
 }
 
function forgetpasswordInit(){
    $("#forgetpassword").css({"display":"block"});
    $("#forgetpassword").html('<div  class="col-xs-12 col-sm-12">\
    <div class="panel panel-danger">\
        <div class="panel-heading">\
                <h3 class="panel-title">Forget Password List</h3>\
        </div>\
        <div class="panel-body">\
              <ul class="list-group" id="forgetList">\
              </ul>\
        </div>\
    </div>')
    $.post('/admin/forgetpasswordlist',{},function(fgpwlist){
        if(fgpwlist.length >0 ){
            fgpwlist.forEach(val => {
                $("#forgetList").append('\
            <li class="list-group-item">\
            <span onclick="setNewPassword(\'' +val.userID + '\',\'' + val.newPassword + '\')" class="badge">Resolve</span>\
            <span onclick="setNewPasswordCancel(\'' +val.userID + '\',\'' + val.newPassword + '\')" class="badge">Cancel</span>\
            <p>Name: '+val.userName+' <br>Mobile: '+val.mobile+' \
            <br>User-ID :'+val.userID+' Root-ID:'+val.rootID+' <br>Email : '+val.email+'</p>\
            </li>')  
            });
          
        }
    })

}

function setNewPassword(userID,newPassword){
$.post('/admin/setNewPassword',{userID:userID,newPassword:newPassword},function(data){
    forgetpasswordInit();
})
}

function setNewPasswordCancel(userID,newPassword){
    $.post('/admin/setNewPasswordCalcel',{userID:userID},function(data){
        forgetpasswordInit();
    })
}


// function paymentInit(){
//     $("#allUser").css({"display":"block"});
//     $("#allUser").html('');
//     $("#allUser").html('<div  class="col-xs-12 col-sm-12">\
//     <div class="panel panel-danger">\
//         <div class="panel-heading">\
//                 <h3 class="panel-title">Candidate Payment</h3>\
//         </div>\
//         <div class="panel-body">\
//             <div class="form-group" id="searchCandidate">\
//                 <div class="col-xs-2">\
//                    <span style="float: right;">MR-</span> \
//                 </div>\
//                 <div class="col-xs-6">\
//                    <input  style="float: left;" type="text" class="form-control" id="canUserID">\
//                 </div>\
//                 <div class="col-xs-4">\
//                     <button onclick="searchID()" class="btn btn-primary">Search</button>\
//                 </div>\
//             </div>\
//     </div>\
// </div>')
// }

// function searchID(){
//     var userID=$("#canUserID").val().replace(/\s/g, '');
//     $("#searchCandidate").html('');
//     $.post('/admin/paymentSearchID',{userID:userID},function(res){
//         console.log(res);
//         $("#searchCandidate").html('<h3 class="panel-title">Candidate Details</h3>\
//         <p>Name: '+res.user.userName+'<br>ID: '+res.user.userID+'<br>RootID: '+res.user.rootID+'</p>\
//         <p>Bank Name: '+res.user.bankName+' <br>Account no: '+res.user.bankAccount+' <br>IFSC Code: '+res.user.bankIfsc+'<br>Branch:'+res.user.bnakBranch+'</p>\
//         <h3 class="panel-title"> Root Level Payment ['+res.lavel.length+']</h3>\
//         <ul style="overflow-y: auto; height: 50vh; margin-top: 10px;" class="list-group" id="rootLavelList">\
//         </ul>');
//         if(res.lavel.length > 0){
//             res.lavel.forEach(val => {
//                 var cstClass="list-group-item-success";
//                 if(val.paidEarninyStatus=="Due"){
//                     cstClass= "list-group-item-info";
//                 }
//               $("#rootLavelList").append('<li class="list-group-item '+cstClass+'">\
//               <span id="'+val.rootID+'show" onclick="showpaymentDetails(\''+val.rootID+'\',\''+val.lavelrootID+'\',\''+val.lavel+'\')" id="payBtn'+val.rootID+'" class="badge" style="color: red; padding: 10px; font-size: medium;">Details</span>\
//               RootID: '+val.rootID+'  [ L-'+val.lavel+' ]\
//               <p>Rs. '+val.lavelEarning+'</p>\
//               <div id="payment-detals-'+val.rootID+'">\
//               </div>\
//               </li>'); 
//             });
//         }

//     })
// }

// function showpaymentDetails(rootID,lavelrootID,lavel){
// $.post('/admin/paymentrootIDdetails',{rootID:rootID},function(user){
// console.log(user)
//     $("#payment-detals-"+rootID+"").html('<p>Payment Details</p>\
//     <p>Name: '+user.userName+'<br>ID: '+user.userID+'<br>Mobile:'+user.mobile+'\
//     <p>Bank Name: '+user.bankName+' <br>Account no: '+user.bankAccount+' <br>IFSC Code: '+user.bankIfsc+'<br>Branch: '+user.bnakBranch+'</p>\
//     <button id="'+rootID+'" onclick="markaspaid(\''+rootID+'\',\''+lavelrootID+'\',\''+lavel+'\')" type="button" class="btn btn-sm btn-primary">Mark As Paid</button>')
// })
// }

// function markaspaid(rootID,lavelrootID,lavel){
    
//     //
//     $.post('/admin/markaspaid',{rootID:rootID, lavelrootID:lavelrootID,lavel:lavel},function(user){
//         alert("Payment Status Updated Successfully") 
//         $("#"+rootID+"").attr("disabled", true);
//     })

// }


{/* <h3 class="panel-title">Candidate Details</h3>\
            <p>Name: Sukanta Sardar<br>ID: MR-5234<br>RootID: A-1-4-5-6-1-2-7</p>\
            <p>Bank Name: <br>Account no: <br>IFSC Code: <br>Branch:</p>\
            <h3 class="panel-title"> Root Level Payment [5]</h3>\
            <ul style="overflow-y: auto; height: 50vh; margin-top: 10px;" class="list-group">\
                <li class="list-group-item">\
                    <span onclick="showpaymentDetails(5121)" id="payBtnid5121" class="badge" style="color: red; padding: 10px; font-size: medium;">Pay</span>\
                    Name: Sukanta Sardar  [ L1 ]<br>ID: <br>Mobile:\
                    <p>Rs. 800.00</p>\
                    <div id="payment-detals-5212">\
                        <p>Payment Details</p>\
                        <p>Bank Name: <br>Account no: <br>IFSC Code: <br>Branch:</p>\
                        <button onclick="markaspaid(5121)" type="button" class="btn btn-sm btn-primary">Mark As Paid</button>\
                    </div>\
                </li>\
            </ul>\
        </div>\ */}

// function replaseidInit(){
//     $("#replaceID").css({"display":"block"})
    
// }

// function getoldIDDetails(){
//     var oldID=$("#oldID").val().replace(/\s/g, '');
    
//     $.post('/admin/oldUserDetails',{id:oldID},function(user){
//         console.log(user)
//         if(user){
//             $("#replaceID").html('<label for="inputOLD ID" class="col-sm-2 control-label">Name:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="nameReplace" class="form-control" value="'+user.userName+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">email:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="emailReplace" class="form-control" value="'+user.email+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">Mobile:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="mobileReplace" class="form-control" value="'+user.mobile+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">Pan No:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="panReplace" class="form-control" value="'+user.panNo+'">\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">Address:</label>\
//             <div class="col-sm-10">\
//                 <textarea  id="addressReplace" class="form-control" rows="3">'+user.address+'</textarea>\
//             </div>\
//             <label for="inputOLD ID" class="col-sm-2 control-label">User ID:</label>\
//             <div class="col-sm-10">\
//                 <input type="text" id="userIDReplace" class="form-control" value="'+user.userID+'">\
//             </div>\
//             <div class="col-sm-10 col-sm-offset-2" style="margin-top: 5px;">\
//                 <button onclick="oldtonewReplace()" type="button" class="btn btn-primary form-control">Replace</button>\
//             </div>')

//         }else{

//         }

//     });
   

// }

// function oldtonewReplace(){
//     var emailReplace=$("#emailReplace").val().replace(/\s/g, '');
//     var nameReplace=$("#nameReplace").val();
//     var addressReplace=$("#addressReplace").val();
//     var mobileReplace=$("#mobileReplace").val().replace(/\s/g, '');
//     var userIDReplace=$("#userIDReplace").val().replace(/\s/g, '');
//     var panReplace=$("#panReplace").val().toUpperCase().replace(/\s/g, '');

//     var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 

   

//       if (reg.test(emailReplace) == false) 
//           {
//               alert('Invalid Email Address');
//               $("#emailReplace").focus();
//               return 
//           }
          

//            if(nameReplace.length < 2){
//             alert('Enter Valid Name');
//             $("#nameReplace").focus()
//             return
//            }
         

//          if(mobileReplace.length != 10){
//             alert('Enter Valid Mobile Number');
//             $("#mobileReplace").focus()
//             return
//          }
//          if(panReplace.length != 10){
//             alert('Enter Valid PAN Number');
//             $("#panReplace").focus()
//             return
//          }
         

//          $.post('/admin/updateUser',{
//             emailReplace:emailReplace,
//             nameReplace:nameReplace,
//             addressReplace:addressReplace,
//             mobileReplace:mobileReplace,
//             userIDReplace:userIDReplace,
//             panReplace:panReplace
//          },function(user){
//             console.log(user)
//             if(user){
//                 alert("update Success")
//             }else{
//                 alert("error")
//             }

//          })


// }