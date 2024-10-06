const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");






app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));









const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main(). then(()=>{
    console.log("connection  successfull");

}).catch((err)=>{
    console.log(err);
});





async function main(){
    await mongoose.connect(mongo_url);

};




app.get("/",(req,res)=>{
        
    res.send("I am root");


});






app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);





app.all("*",(req,res,next)=>{
    next(new ExpressError (404,"page not found"));
});


app.use((err,req,res,next)=>{
    let {status=505,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});

    

});



app.listen(8080,()=>{
    console.log("servers is listening on port 8080");
});
