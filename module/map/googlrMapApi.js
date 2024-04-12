var https = require('https');
var dotenv=require('dotenv').config();
function SearchPlaceGeoCodeByLatLng(inp,cb){
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+inp.lat+','+inp.lng+'&key='+inp.apik+'';
    var req = https.request(url, function (res) {
    var str = "";  
      res.on('data', function (chunk) {
        str += chunk;      
      });  
      res.on('end', function () {
        var aa=JSON.parse(str);
       //cb(aa.results[0].formatted_address);
       if(aa.status=="OK"){
        cb({address:aa.results[0].formatted_address, err:null});
       }else{
        cb({address:aa.error_message, err:true})
       }
       
       
      });
    });
    req.on('error', function (err) {
         console.log('Error message: ' + err);
    });
    req.end();
   
   }



//     SearchPlaceGeoCodeByLatLng({
//     lat:22.336,
//     lng:78.589,
//     apik:process.env.API_KEY,
//  },function(data){
//   console.log(data);
// // data.results[0].address_components.forEach(function(val){
// //   //console.log(val.types[0]); 
// //   if(val.types[0]=='country'){
// //     console.log(val.long_name); 
// //   }
// //     })
//  })


function autocomplete(inp,cb){
  var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+inp.quary+'&location='+inp.location+'&radius='+inp.radius+'&key='+inp.apik+'';
  var req = https.request(url, function (res) {
  var str = "";  
    res.on('data', function (chunk) {
      str += chunk;      
    });  
    res.on('end', function () {
      var aa=JSON.parse(str);
      cb(aa);
    });
  });
  req.on('error', function (err) {
       console.log('Error message: ' + err);
  });
  req.end();
}
// autocomplete({
//   "quary":"oxforf square",
//   apik:process.env.API_KEY,
//   location:'22.7433584,88.4413294',
//   radius:'1000',
//   },
//   function(data){
//    //console.log(data) ;
//    if(data.status=='OK'){
//     console.log('test  near',data )
//    }

   
//    //console.log('',data )
//   });

function placeByplaceID(inp,cb){
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?place_id='+inp.placeid+'&key='+inp.apik+'';
  
  var req = https.request(url, function (res) {
  var str = "";  
    res.on('data', function (chunk) {
      str += chunk;      
    });  
    res.on('end', function () {
      var aa=JSON.parse(str);
      if(aa.status=='OK'){
        cb(aa);        
      }else{
        console.log(aa.status);
        cb(aa.status);      
      }
    });
  });
  req.on('error', function (err) {
       console.log('Error message: ' + err);
  });
  req.end();
}

module.exports ={
  placeSearchBylatlng:SearchPlaceGeoCodeByLatLng,
  autocomplete:autocomplete,
  placeByplaceID:placeByplaceID
}