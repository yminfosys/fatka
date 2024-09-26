$( document ).ready(function() {
    var allredyloginuserID=$("#allredyloginuserID").val();
    var sponsRootID=$("#sponsRootID").val();
    var sponsID=$("#sponsID").val();
    var sponsSide=$("#sponsSide").val();

    if(allredyloginuserID){
      getUserprofile(allredyloginuserID);
      $("#logout").css({"display":"bolck"});
    }else{
      if(sponsID && sponsSide){
        regClick(sponsID,sponsSide)
        $("#logout").css({"display":"none"});
      }else{
        loginClick();
        $("#logout").css({"display":"none"});
      }
        
    }
})


function loginClick(){
    $("#view").html('<div class="row mb-3">\
    <div style="text-align: center; margin-top: 15vh;" class="col">\
      <div style="font-size: 35px; font-weight:bold;">Log in</div>\
      <span>Fill the form to log in</span>\
    </div>\
  </div>\
  <div class="card mb-3" style="background-color: #ccdbe6;">\
    <div class="card-body">\
      <div class="mb-3">\
        <label for="loginEmail" class="form-label">Email address</label>\
        <input style=" text-decoration: none;"  type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp">\
      </div>\
      <div class="mb-3">\
        <label for="loginPassword" class="form-label ">Password</label>\
        <input type="password" class="form-control" id="loginPassword">\
      </div>\
    </div>\
  </div>\
  <p onclick="forgetpassword()" class="float-end">Forget Password</p>\
  <div class="fixed-bottom">\
      <div class="container-fluid mb-3">\
        <div id="loginBtn" class="d-grid gap-2">\
          <button onclick="loginProcess()" class="btn btn-primary " type="button">Login</button>\
        </div>\
      </div>\
  </div>');
}

function loginProcess(){
  var loginEmail=$("#loginEmail").val().replace(/\s/g, '').toLowerCase();
  var loginPassword=$("#loginPassword").val().trim();

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
    if (reg.test(loginEmail) == false) 
        {
            alert('Invalid Email Address');
            $("#loginEmail").focus();
            return 
        }

        if(loginPassword.length < 6){
          alert('Password Must be 6 to 18 charecter');
          $("#loginPassword").focus()
          return
      } 

  $.post('/training/loginprocess',{loginPassword:loginPassword,loginEmail:loginEmail},function(user){
        if(user){
            location.replace("/training");
        }else{
            alert("Worng Credential")
        }

  })
}

function logout(){
  $.post('/training/logout',{},function(data){
    location.replace("/training");
  })
}

function regClick(userID,side){
    $("#view").html('<p onclick="loginClick()" class="mt-2 float-end">Login</p>\
    <div class="row mb-3">\
      <div style="text-align: center; margin-top: 15vh;" class="col">\
        <div style="font-size: 35px; font-weight:bold;">Register Now</div>\
        <span>Create an account</span>\
      </div>\
    </div>\
    <div class="card" style="background-color: #ccdbe6;">\
      <div class="card-body">\
      <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Full Name</label>\
          <input style=" text-decoration: none; text-transform:uppercase"  type="email" id="userName" class="form-control" placeholder="Name as per Govt. ID">\
        </div>\
        <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Email address</label>\
          <input style=" text-decoration: none;"  type="email" class="form-control" id="email" aria-describedby="emailHelp">\
        </div>\
        <div class="mb-3">\
          <label for="exampleInputEmail1" class="form-label">Mobile Number</label>\
          <div id="mobileGroup" class="input-group mb-3">\
          <span  class="input-group-text" id="basic-addon1">+91<i style="font-size: xx-small;" class="fa fa-chevron-down" aria-hidden="true"></i></span>\
            <input type="number" class="form-control" id="mobileNo">\
          </div>\
          <ul id="countryList" style="display: none; height: 20vh; overflow-y: auto;" class="list-group">\
        </ul>\
        </div>\
\
        <div class="mb-3">\
          <label for="exampleInputPassword1" class="form-label">Password</label>\
          <input type="password" class="form-control" id="password">\
        </div>\
        \
      </div>\
    </div>\
      <div class="fixed-bottom">\
        <div class="container-fluid mb-3">\
          <div id="registerBtn" class="d-grid gap-2">\
            <input type="hidden" class="form-control" id="refID" value="'+userID+'">\
            <input type="hidden" class="form-control" id="parentSide" value="'+side+'">\
            <button onclick="newRegister()" class="btn btn-primary " type="button">Register</button>\
          </div>\
        </div>\
    </div>');
}




function newRegister(){
  
    var userName=$("#userName").val().trim().toUpperCase();
    var email=$("#email").val().replace(/\s/g, '').toLowerCase();
    var mobileNo=$("#mobileNo").val().trim();
    var password=$("#password").val().trim();;
    var parentSide=$("#parentSide").val().trim();;
    var refID=$("#refID").val().trim();
    
   
    if(userName.length < 5){
      alert('Enter Full Name');
      $("#userName").focus()
      return
   }
  
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
      if (reg.test(email) == false) 
          {
              alert('Invalid Email Address');
              $("#email").focus();
              return 
          }
         
  
          if(mobileNo.length != 10){
            alert('Enter Valid Mobile Number');
            $("#mobileNo").focus()
            return
         }
  
          if(password.length < 8){
            alert('Password Must be 8 to 18 charecter Capital, small, spacial charc');
            $("#password").focus()
            return
        } 
  
        $("#registerBtn").attr('disabled','disabled');
        
        ////////Check Exist user///////
        $.post('/training/checkExistuser',{mobileNo:mobileNo,email:email},function(data){
          if(!data){
              //////Register///////////////
              $.post('/training/newregister',{
                email: email,
                mobileNo:mobileNo,
                password:password,
                userName:userName,
                parentSide:parentSide,
                refID:refID
              },function(data){
                
                if(data){
                  alert("Registration Success")
                   location.replace("/training");
                }else{
                  alert("Technical Error Try Again")
                }
            })
             
              }else{
                alert("You Id / Number is register with us")
              }
          })
  }


  function getUserprofile(userID){
    // $.post('/trainin/GetUser',{userID:userID},function(user){
    //   if(user){
    //     mainContent(user);
    //   }

    $("#waitingGif").css({"display":"block"});
    $.post('/training/earningCalculation',{userID:userID},function(user){
      mainContent(user);
      $("#waitingGif").css({"display":"none"})
    })
    // $.post('/training/GetUser',{userID:userID},function(user){
    //   mainContent(user);
    // })
  
  }


  function mainContent(user){
    if(user.activationDate){
      var uad=user.activationDate
      uad=dateFormat(new Date(uad),"d")
    }else{
      var uad=""
    }
    
    $("#view").html('<div class="row" style="height: 10vh; margin-top: 3vh;">\
    <div  class="col">\
        <ul class="list-group" >\
            <li class="list-group-item" style="background-color:#09f4f0;">\
                <div  class="row">\
                    <div class="col-3">\
                        <div>\
                            <img style="width: 10vh; height: 10vh; border-radius: 10px;" src="/images/other/profile-icon-9.png" class="img-fluid"  alt="image desc" />\
                            \
                        </div>\
                    </div>\
                    <div class="col-9">\
                            <span style="font-size: 20px;"><strong>'+user.userName+'</strong></span>\
                            <br>ID :  '+user.userID+'\
                            <br>Activation Date: '+uad+'\
                            </span>\
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

    if(user.varyficatinStatus=="Verify"){
      var active="Verify"
    }else{
      var active="NotVerify"
    }

   viewmenu(user.userID, active);
   // totalearning(user.userID);
   
    

  }

  function dateFormat(date,frmat){  
    var year=date.getFullYear();  
    var month=date.getMonth() + 1; 
    var day=date.getDate();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    if(frmat=="d"){
      return ''+day+'-'+month+'-'+year+''
    }else{
      return ''+day+'-'+month+'-'+year+' '+hours+':'+minutes+''
    }
  }

  function profile(userID){
   $.post('/training/GetUser',{userID:userID},function(user){
        var conteL='https://richrova.co.uk/training?refid='+user.userID+'&side=L';
        conteL=encodeURI(conteL);
        var conteR='https://richrova.co.uk/training?refid='+user.userID+'&side=R';
        conteR=encodeURI(conteR);
        $("#profile").css({"display":"block"});
        $("#profile").html('\
        <ul class="list-group">\
            <li class="list-group-item">Name : '+user.userName+'\
            <span  onclick="closingElement(\'profile\')" style="color:red; float:right; border-radius: 10px; border: 1px solid #0f0707;" class="badge">X</span>\
            </li>\
            <li class="list-group-item">Email : '+user.email+'</li>\
            <li class="list-group-item">Mobile : '+user.mobile+'</li>\
            <li class="list-group-item"><strong>Copy Left-Link</strong> :'+conteL+'  <span onclick="copyContent(\''+conteL+'\')" style="margin-left: 20px;"><i class="fa fa-clone" aria-hidden="true"></i></span></li>\
            <li class="list-group-item"><strong>Copy Right-Link</strong> :'+conteR+'  <span onclick="copyContent(\''+conteR+'\')" style="margin-left: 20px;"><i class="fa fa-clone" aria-hidden="true"></i></span></li>\
            <li class="list-group-item">\
                <a  onclick="changePasswordinit('+user.userID+')" id="newPaswBtn" class="btn btn-xs btn-primary">Change Password</a>\
                <p id="changePasw"></p>\
            </li>\
        </ul>');
   });
  }


  function viewmenu(userID,active){
    //console.log(active)
    
    if(active == "Verify"){
      var dd='<div class="col-4 mb-3">\
      <div class="card" onclick="profile(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-user-circle-o" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Profile</p>\
        </div>\
      </div>\
    </div>';
    }else{
      var dd=' <div class="col-4 mb-3">\
      <div class="card" onclick = "accountActivate(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(red, #FFD700); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-check-circle" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Activet Now</p>\
        </div>\
      </div>\
    </div>';
    }

    $("#viewmenu").html('<div class="row" style="margin-top: 2vh;">\
    <div class="col-4 mb-3">\
      <div class="card" onclick = "wellcomLetter(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-envelope" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Welcome Letter</p>\
        </div>\
      </div>\
    </div>\
    '+dd+'\
    <div class="col-4 mb-3">\
      <div class="card" onclick = "createReferral(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-user-plus" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Referal Link</p>\
        </div>\
      </div>\
    </div>\
    <div class="col-4 mb-3">\
      <div class="card" onclick = "earningData(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-inr" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Total Earning</p>\
        </div>\
      </div>\
    </div>\
    <div class="col-4 mb-3">\
      <div class="card" onclick = "withdrawalInit(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-university" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Bank Withdraw</p>\
        </div>\
      </div>\
    </div>\
    <div class="col-4 mb-3">\
      <div class="card" onclick = "geonology(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-users" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Genealogy Tree</p>\
        </div>\
      </div>\
    </div>\
    <div class="col-4 mb-3">\
      <div class="card" onclick = "myDirect(\''+userID+'\')">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-sitemap" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">My Directs</p>\
        </div>\
      </div>\
    </div>\
    <div class="col-4 mb-3">\
      <div class="card">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-yelp" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">My Team Details</p>\
        </div>\
      </div>\
    </div>\
    <div class="col-4 mb-3">\
      <div class="card">\
        <div class="card-body" style="height: 11vh; background-image: linear-gradient(#FFD700,#dc6714bd); color: #6617dc; text-align: center;">\
          <span><i style="font-size: 25px;" class="fa fa-handshake-o" aria-hidden="true"></i></span>\
          <p class="card-text text-center" style="font-size:small;  font-weight: bold; ">Self Trade Request</p>\
        </div>\
      </div>\
    </div>\
   </div>\
   <div id="generalData" style=" display:none; background-image: linear-gradient(#bbb58e,#dc6714bd); color: #041b2b; border-radius: 10px;">\
   </div>');
   // viewwallet(userID);
   // viewfooter(userID);
   generalData(userID);
  }
  

 

  function generalData(userID){
    $.post('/training/generalData',{userID:userID},function(data){
      var total= Number(data.leftCount) +  Number(data.rightCount);
      var totalVerify= Number(data.leftVerify) +  Number(data.rightVerify);
      $("#generalData").css({"display":"block"});
      $("#generalData").html(' <div class="row m-1">\
        <div class="col">\
          <p style="text-align: center; font-size: 30px; padding: 2px; font-weight: bolder;">Team Overview</p>\
        </div>\
      </div>\
      <div class="row m-1">\
        <div class="col-4" style="height: 10vh;">\
          <span>Total Team</span><br>\
          <p class="text-center mt-3">'+total+'</p>\
        </div>\
        <div class="col-4">\
          <span>Total Left</span><br>\
          <p class="text-center mt-3">'+data.leftCount+'</p>\
        </div>\
        <div class="col-4">\
          <span>Total Right</span><br>\
          <p class="text-center mt-3">'+data.rightCount+'</p>\
        </div>\
      </div>\
      <div class="row m-1">\
        <div class="col-4" style="height: 10vh;">\
          <span>Total Verify</span>\
          <p class="text-center mt-3">'+totalVerify+'</p>\
        </div>\
        <div class="col-4">\
          <span>Left Verify</span>\
          <p class="text-center mt-3">'+data.leftVerify+'</p>\
        </div>\
        <div class="col-4">\
          <span>Right Verify</span>\
          <p class="text-center mt-3">'+data.rightVerify+'</p>\
        </div>\
      </div>');
    })
  }

  function accountActivate(userID){
   // console.log(userID)
    $("#view1").css({"display":"block"});
    
    $("#view").css({"display":"none"});
    $("#view1").html(' <div class="row">\
        <div class="col-12">\
            <div class="mb-3 p-3">\
              <span  onclick="closingElement(\'view1\')" style="color:red; float:right; border-radius: 10px; border: 1px solid #0f0707;" class="badge">X</span>\
              <label for="exampleInputEmail1" class="form-label">Enter Activation PIN</label>\
              <input type="text" class="form-control" id="activationPinNo" aria-describedby="emailHelp">\
              <div id="emailHelp" class="form-text">This one time Activation key use to activate your Account </div>\
            </div>\
            <div class="mb-3 p-3">\
              <div class="text-center">\
                <button id="btn1" onclick="activateAccountUser(\''+userID+'\')" class="btn btn-primary text">Activate Now</button>\
              </div>\
            </div>\
        </div>\
      </div>\
      ');
  }

  function activateAccountUser(userID){
    var activationPinNo = $("#activationPinNo").val().trim();
    if(activationPinNo){
      $("#btn1").css({"display":"none"})
      $.post('/training/activateAccountUser',{userID:userID,activationPinNo:activationPinNo},function(data){
        if(data=="ok"){
          location.replace("/training");
        }else{
          alert("Incorrect Pin")
          $("#btn1").css({"display":"block"})
        }
      })
    }else{
      $("#btn1").css({"display":"block"})
    }
    

  }


  function createReferral(userID){
    var conteL='https://richrova.co.uk/training?refid='+userID+'&side=L';
        conteL=encodeURI(conteL);
        var conteR='https://richrova.co.uk/training?refid='+userID+'&side=R';
        conteR=encodeURI(conteR);

        $("#view1").css({"display":"block"});
    
        $("#view").css({"display":"none"});
        $("#view1").html(' <div class="row">\
            <div class="col-12" style="margin-top: 2vh;">\
             <span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707;" class="badge">X</span>\
                <div class="mb-3 p-3">\
                   <ul class="list-group">\
                    <li class="list-group-item"><strong>Copy Left-Link</strong> :'+conteL+'  <span onclick="copyContent(\''+conteL+'\')" style="margin-left: 20px;"><i class="fa fa-clone" aria-hidden="true"></i></span></li>\
                    <li class="list-group-item"><strong>Copy Right-Link</strong> :'+conteR+'  <span onclick="copyContent(\''+conteR+'\')" style="margin-left: 20px;"><i class="fa fa-clone" aria-hidden="true"></i></span></li>\
                  </ul>\
                </div>\
            </div>\
          </div>\
          ');
  }

  async function geonology(userID){

    $("#view1").css({"display":"block" , "background-color": "rgb(32, 77, 77)"});
    $("#view").css({"display":"none"});
    $("#view1").html('<span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707; margin-top: 3vh;" class="badge">X</span>\
      <div style=" overflow: auto; width: 70vh;  text-align: center;" >\
      <div class="tree">\
        <ul>\
          <li>\
            <div id="root"><i style="color: rgb(36, 21, 39);"  class="fa fa-user" aria-hidden="true"></i><br></div>\
            <ul>\
              <li>\
                <div id="rootLeft" ><i style="color: rgb(36, 21, 39);"  class="fa fa-user" aria-hidden="true"></i><br></div>\
                <ul>\
                  <li>\
                    <div id="rootLeft1"><i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br> </div>\
                  </li>\
                  <li>\
                    <div id="rootLeft2" ><i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br></div>\
                  </li>\
                </ul>\
              </li>\
              <li>\
                <div id="rootRight" ><i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br></div>\
                <ul>\
                  <li>\
                    <div id="rootRight1" ><i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br></div>\
                  </li>\
                  <li>\
                    <div id="rootRight2" ><i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br></div>\
                  </li>\
                </ul>\
              </li>\
            </ul>\
          </li>\
        </ul>\
      </div>\
      </div>');

    
   const rootNode = await geonologyNode(userID)
   /////For Root//////
   if(rootNode.root){
    //console.log(rootNode )
    if(rootNode.rootVerify=="Verify"){
      $("#root").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNode.root+'\')">'+rootNode.root+'</span> <br> <span>'+rootNode.rootName+'</span>');
    }else{
      $("#root").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNode.root+'\')">'+rootNode.root+'</span> <br> <span>'+rootNode.rootName+'</span>');
      
    }
   }
   
///For Feft/////
   if(rootNode.left){
      if(rootNode.leftVeryfy=="Verify"){
        $("#rootLeft").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNode.left+'\')">'+rootNode.left+'</span> <br> <span>'+rootNode.leftName+'</span>');
      }else{
        $("#rootLeft").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNode.left+'\')">'+rootNode.left+'</span> <br> <span>'+rootNode.leftName+'</span>');
      }
     
    const rootNodeLeft  = await geonologyNode(rootNode.left)
   // console.log(rootNodeLeft)

          if(rootNodeLeft.left){
            if(rootNodeLeft.leftVeryfy=="Verify"){
              $("#rootLeft1").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/>  <span onclick="geonology(\''+rootNodeLeft.left+'\')">'+rootNodeLeft.left+'</span> <br> <span>'+rootNodeLeft.leftName+'</span>');
            }else{
              $("#rootLeft1").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeLeft.left+'\')">'+rootNodeLeft.left+'</span> <br> <span>'+rootNodeLeft.leftName+'</span>');
            }
          }else{
            $("#rootLeft1").html('<i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br/>');
          }

          if(rootNodeLeft.right){
            if(rootNodeLeft.rightVeryfy=="Verify"){
              $("#rootLeft2").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeLeft.right+'\')">'+rootNodeLeft.right+'</span> <br> <span>'+rootNodeLeft.rightName+'</span>');
            }else{
              $("#rootLeft2").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeLeft.right+'\')">'+rootNodeLeft.right+'</span> <br> <span>'+rootNodeLeft.rightName+'</span>');
            }
          }else{
            $("#rootLeft2").html('<i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br/>');
          }


      }else{
        $("#rootLeft").html('<i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br/>');
      }


   ////For Right////
   if(rootNode.right){
    if(rootNode.rightVeryfy=="Verify"){
      $("#rootRight").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNode.right+'\')">'+rootNode.right+'</span>  <br> <span>'+rootNode.rightName+'</span> ');
    }else{
      $("#rootRight").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNode.right+'\')">'+rootNode.right+'</span>   <br> <span>'+rootNode.rightName+'</span>');
    }
    const rootNodeRight  = await geonologyNode(rootNode.right);
    //console.log(rootNodeRight)
      if(rootNodeRight.left){
        if(rootNodeRight.leftVeryfy=="Verify"){
          $("#rootRight1").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeRight.left+'\')">'+rootNodeRight.left+'</span>  <br> <span>'+rootNodeRight.leftName+'</span> ');
        }else{
          $("#rootRight1").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeRight.left+'\')">'+rootNodeRight.left+'</span>  <br> <span>'+rootNodeRight.leftName+'</span> ');
        }
      }else{
        $("#rootRight1").html('<i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br/>');
      }

      if(rootNodeRight.right){
        if(rootNodeRight.rightVeryfy=="Verify"){
          $("#rootRight2").html('<i style="color: rgb(237, 230, 8);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeRight.right+'\')">'+rootNodeRight.right+'</span> <br> <span>'+rootNodeRight.rightName+'</span> ');
        }else{
          $("#rootRight2").html('<i style="color: rgb(203, 206, 164);" class="fa fa-user" aria-hidden="true"></i> <br/> <span onclick="geonology(\''+rootNodeRight.right+'\')">'+rootNodeRight.right+'</span> <br> <span>'+rootNodeRight.rightName+'</span> ');
        }
      }else{
        $("#rootRight2").html('<i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br/>');
      }
   }else{
    $("#rootRight").html('<i style="color: rgb(36, 21, 39);" class="fa fa-user" aria-hidden="true"></i> <br/>');
   }
  }

 async function geonologyNode(userID){
  var out={}
   await $.post('/training/getGeonologyNode',{userID:userID},  function(data){
     out={
      root:data.root,
      rootName:data.rootName,
      left:data.rootLeft,
      leftName:data.leftName,
      right:data.rootRight,
      rightName :data.rightName,
      rootVerify:data.rootVerify,
      leftVeryfy:data.leftVeryfy,
      rightVeryfy:data.rightVeryfy
    }
    });
     return out;
  }
  
  function wellcomLetter(userID){
    $("#view1").css({"display":"block" , "background-color": "rgb(32, 77, 77)"});
      $("#view").css({"display":"none"});
      $("#view1").html('<div class="card m-2" style="">\
            <div class="card-header">\
               <span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707; margin-top: 3vh;" class="badge">X</span>\
            </div>\
            <div class="card-body">\
            <img src="/images/other/welcome.jpeg" class="card-img-top" alt="...">\
            </div>\
          </div>');
  }

  function myDirect(userID){
    $.post('/training/mydirect',{userID:userID},  function(data){
      //console.log(data)
      $("#view1").css({"display":"block" , "background-color": "rgb(32, 77, 77)"});
      $("#view").css({"display":"none"});
      $("#view1").html('\
       <div class="card m-2">\
        <div class="card-header">\
        <span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707; margin-top: 3vh;" class="badge">X</span>\
         <p class="h2">Direct</p>  \
         <h3>Total <span class="badge text-bg-secondary">'+data.direct+'</span></h3>\
         <h3>Verified <span class="badge text-bg-secondary">'+data.directVerify+'</span></h3>\
        </div>\
        <div  class="card-body" style="height: 60vh; overflow-y: auto;">\
          <ul id="myDirectList" class="list-group list-group-flush ">\
          </ul>\
        </div>\
      </div>')
      if(data.myDirect.length > 0){
        data.myDirect.forEach(val => {
          if(val.activationDate){
            var uad=val.activationDate
            uad=dateFormat(new Date(uad),"d")
          }else{
            var uad=""
          }
          $("#myDirectList").append('<li class="list-group-item list-group-item-primary">\
              <p>'+val.userName+'\
                <br>M:'+val.mobile+',  ID: '+val.userID+' \
                <br>DATE: '+uad+'\
              </p>\
            </li>')
        });
      }
    })
  }
  


  function earningData(userID){
    $.post('/training/earningData',{userID:userID},  function(data){
     // console.log(data)
      if(data){
        var balance = Number(data.totalEarning) - Number(data.totalWithdrawal)
        var direct = Number(data.directL) + Number(data.directR)
        $("#view1").css({"display":"block" , "background-color": "rgb(32, 77, 77)"});
        $("#view").css({"display":"none"});
        $("#view1").html('<div class="card m-2" style="">\
              <div class="card-header">\
                 <span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707; margin-top: 3vh;" class="badge">X</span>\
                <p style="text-align: center; font-size: 20px; font-weight: bolder;">'+data.designation+'</p>\
                 Earnings \
              </div>\
              <div class="card-body">\
                <p>Total Earning : &#8377; '+Number(data.totalEarning).toFixed(2)+' </p>\
                <ul class="list-group">\
                  <li class="list-group-item">Direct : '+direct+', Amount : &#8377; '+Number(data.directAmt).toFixed(2)+' </li>\
                  <li class="list-group-item">Maching Pair : '+data.machingPair+', Amount : &#8377; '+Number(data.machingPairAmt).toFixed(2)+'</li>\
                  <li class="list-group-item">Incentive : &#8377; '+Number(data.incentive).toFixed(2)+'</li>\
                  <li class="list-group-item">Incentive Count : &#8377; '+data.incentiveMonthCount+'</li>\
                   <li class="list-group-item">Gift : '+data.giftAchive+'</li>\
                   <li class="list-group-item">Tour : '+data.tourAchive+'</li>\
                </ul>\
                <br>\
                <p>Total Withdraw : &#8377; '+Number(data.totalWithdrawal).toFixed(2)+' </p>\
                <p>Remening Balance : &#8377; '+balance.toFixed(2)+' </p>\
              </div>\
            </div>');
      }else{
        $("#view1").css({"display":"block" , "background-color": "rgb(32, 77, 77)"});
        $("#view").css({"display":"none"});
        $("#view1").html('<div class="card m-2" style="">\
              <div class="card-header">\
                 <span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707; margin-top: 3vh;" class="badge">X</span>\
                Earnings \
              </div>\
              <div class="card-body">\
                <p>Total Enrning : &#8377; 0.00</p>\
                 <p>Try to Match criteria of 2:1 or 1:2 </p>\
              </div>\
            </div>');
      }
      
    })
   
  }

  function withdrawalInit(userID){

    $.post('https://richrova.co.uk/training/earningData',{userID:userID},  function(data){
      console.log("API", data)
    })
    // $("#view1").css({"display":"block" , "background-color": "rgb(32, 77, 77)"});
    // $("#view").css({"display":"none"});
    // $("#view1").html('<div class="card m-2" style="">\
    //       <div class="card-header">\
    //          <span  onclick="closingElement(\'view1\')" style="color:red; float:right; padding: 5px; border-radius: 10px; border: 1px solid #0f0707; margin-top: 3vh;" class="badge">X</span>\
    //         Withdrawal \
    //       </div>\
    //       <div class="card-body">\
    //         <p>Withdrawl Balance : &#8377; 0.00</p>\
    //         \
    //       </div>\
    //     </div>');

  
  }


  
 

  function closingElement(div){
    //alert(id)
    $("#"+div+"").css({"display":"none","background-color": "#3a5d77"});
    $("#"+div+"").html('')
    $("#view").css({"display":"block"});
  }



  function copyContent(content){
   // alert(content)
    navigator.clipboard.writeText(content);
  }