
var payment = async function(inp,usdt){
    let day
    
      switch (inp) {
      
        case 1:
          day = Number(usdt)*(5/100);
          break;
        case 2:
          day = Number(usdt)*(3/100);
          break;
        case 3:
          day = Number(usdt)*(2/100);
          break;
        case 4:
          day = Number(usdt)*(1.5/100);
          break;
        case 5:
          day = Number(usdt)*(1/100);
          break;
        case 6:
          day = Number(usdt)*(0.75/100);
          break;
        case 7:
          day = Number(usdt)*(0.75/100);
          break;
        case 8:
          day = Number(usdt)*(0.5/100);
          break;
        case 9:
          day = Number(usdt)*(0.5/100);
          break;
        case 10:
          day = Number(usdt)*(0.25/100);
          break;
        case 11:
          day = Number(usdt)*(0.15/100);
  
          break;
        case 12:
          day = Number(usdt)*(0.15/100);
  
          break;
        case 13:
          day = Number(usdt)*(0.15/100);
  
  
          break;
        case 14:
          day = Number(usdt)*(0.15/100);
  
          break;
        case 15:
          day = Number(usdt)*(0.15/100);
  
          break;
        case 16:
          day = Number(usdt)*(0.15/100);
  
          break;
        case 17:
          day = Number(usdt)*(0.15/100);
  
          break;
        case 18:
          day = Number(usdt)*(0.15/100);
  
  
          break;
        case 19:
          day = Number(usdt)*(0.15/100);
  
  
          break;
        case 20:
          day = Number(usdt)*(0.15/100);
  
          
          
      }
      return day;
    
    
  }

  


module.exports={
    payment:payment
}