function newtrainingChannelInit(){
    
    $("#newChannel").html('<div  class="col-xs-12 col-sm-12">\
    <div class="panel panel-success">\
          <div class="panel-heading">\
                <h3 class="panel-title">Register New Partner Channel</h3>\
          </div>\
          <div class="panel-body">\
             <div class="form-group">\
                    <label>Full Name</label>\
                        <input type="text"  id="regUserName" class="form-control" placeholder="ei: Sushanta Majumder">\
                </div>\
                <div class="form-group">\
                    <label>Email</label>\
                        <input type="text"  id="regEmail" class="form-control" placeholder="Email ie hkdhkfhs@gmail.com">\
                </div>\
                <div class="form-group">\
                    <label>Password</label>\
                        <input type="password"  id="regPassword" class="form-control" placeholder="6 to 18 Chracter">\
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
                <button onclick="createNewTrainingChannel()" type="button" class="btn btn-primary">Register</button>\
          </div>\
    </div>\
</div>')
}


function createNewTrainingChannel(){
    var regEmail=$("#regEmail").val().replace(/\s/g, '');
    var regPassword=$("#regPassword").val();
    var regUserName=$("#regUserName").val();
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

         $.post('/admin/trainingCheckuserexist',{channelRoot:channelRoot,regEmail:regEmail},function(data){
           if(!data){
            /////////Save New Partner//////
            $.post('/admin/newTrainingPartner',{
                regEmail:regEmail,
                regPassword:regPassword,
                regUserName:regUserName,
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

function setTrainingStartUserid(){
    var id=window.prompt();
    if(id){
         $.post('/admin/SetTrainingUserID',{id:id},function(data){
                if(data){
                    alert("Set Start User ID UserID to"+ data);
                }
            })
    }
 }


 function activationPinGenerate(){
    $("#view").html('<div class="panel panel-info" style="padding: 5px;">\
        <div class="panel-heading"  style="margin-top: 10vh;">\
              <h3 class="panel-title">Generate Activation Pin</h3>\
        </div>\
        <div class="panel-body">\
                <div class="form-group">\
                    <label class="sr-only" for="">User ID</label>\
                    <input type="text" class="form-control" id="pinUserID" placeholder="RR-1003">\
                </div>\
                <div class="form-group">\
                    <label class="sr-only" for="">Amount</label>\
                    <input type="text" class="form-control" id="feeAmount" placeholder="Tuition Fee">\
                </div>\
                <button id="activeBtn" onclick="generatePin()" type="submit" class="btn btn-primary">Submit</button>\
        </div>\
     </div>')
 }

 function generatePin(){
   
    var tutionFee= $("#feeAmount").val().trim();
    var userID= $("#pinUserID").val().trim().toUpperCase();
   

    if(Number(tutionFee) < 1500){
        alert('Worng Tution Fee');
        $("#feeAmount").focus()
        return
    } 

     
       $("#activeBtn").css({"display":"none"});
    $.post('/admin/createActivationKey',{userID:userID,tutionFee:tutionFee},function(data){
        if(data){
            $("#pinUserID").val(data)
        }else{
            alert("worng User ID")
            $("#activeBtn").css({"display":"none"}); 
        }
    })
 }

 function trainingFee(){
    $.post('/admin/activationAmountAdjust',{},function(data){
        console.log(data);
    })
    
 }

 


 function trainingWithdrawlRequiest(){
    $.post('/admin/trainingWithdrawlRequiest',{},function(data){
        //console.log(data);
        $("#view").html('<div class="panel panel-info" style="padding: 5px;">\
            <div class="panel-heading"  style="margin-top: 10vh;">\
                  <h3 class="panel-title">Withdrawl Request</h3>\
            </div>\
            <div class="panel-body">\
            <ul id="list_withdrawl" class="list-group" style="height: 60vh; overflow-y: auto;">\
                </ul>\
            </div>\
         </div>')
        if(data.length > 0){
            data.forEach(val => {
                $("#list_withdrawl").append('<li class="list-group-item">\
                    Name: '+val.userName+' <br>Account: '+val.paaAccountno+'\
                    <br>UserID: '+val.userID+'\
                    <br> Tranfer Amt: Rs. '+val.transferAmt+'\
                    <span onclick="markastransfer(\''+val.userID+'\')" class="badge">Mark as Tranfar </span>\
                </li>')
                
            });

        }else{
            $("#list_withdrawl").append('<li class="list-group-item"> No Record Found</li>')

        }
    })
    
 }


 function markastransfer(userID){
    //console.log(userID)
    $.post('/admin/markastransfer',{userID:userID},function(data){
        trainingWithdrawlRequiest();
    })
 }

                