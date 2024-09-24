var dbCon = require('../db/con');

var database=require('../db/bdModule');

async function auto_incriment(fild){
  

    var out=0;

    try {
        await dbCon.connectDB();

        ////Check Fild is exist////

        

        const existFild=await database.counter.findOne({fild:fild});
        
        if(existFild){
            var sequenceDocument = await database.counter.findOneAndUpdate({fild:fild},{$inc:{value:1}});
           // return sequenceDocument.value;

           out=sequenceDocument.value;
           

        }else{
            /////Create Field////

            const createFild= await database.counter({
                fild:fild,
                value:1
            });

            await createFild.save();

            var sequenceDocument = await database.counter.findOneAndUpdate({fild:fild},{$inc:{value:1}});
            // return sequenceDocument.value;
            out=sequenceDocument.value;

          


        }
        await dbCon.closeDB();
       
       
       
      } catch (error) {
        console.log(error);
        return error;
      }

      return out;

}


// auto_incriment("agh").then(function(aaa){
//     console.log(aaa)
// })

module.exports={
    auto_incriment:auto_incriment
}




