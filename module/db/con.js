const mongoose = require("mongoose");

const mongojs = require('mongojs');

var dotenv=require('dotenv').config();


const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/richrova";
//const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/moneyroi";


const connectDB = async () => {
  try {
    await mongoose
      .connect(uri, {
        autoIndex: false,
       // useNewUrlParser: true,
       // useCreateIndex: true,
       // useUnifiedTopology: true,
       // useFindAndModify: false,  
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log(error);
    return error;
  }
};




// async function closeDB() {
//     console.log("CLOSING CONNECTION");
//     await mongoose.disconnect();
//   }

  const closeDB = async () => {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  };


  //////////////2D Indexing////////////
  const index2DplaceSearch = async function (){
    const db = await mongojs(uri, ['paamotogeocodecods']);
   await db.paamotogeocodecods.createIndex({ "location" : "2dsphere" });
  } 

  



module.exports = {connectDB:connectDB,closeDB:closeDB,index2DPlace:index2DplaceSearch}