const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");



const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main(). then(()=>{
    console.log("connection  successfull");

}).catch((err)=>{
    console.log(err);
});





async function main(){
    await mongoose.connect(mongo_url);

};

const   initDB = async ()=>{
    
    
    await Listing.deleteMany({});
    await Review.deleteMany({});


    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}


initDB();






