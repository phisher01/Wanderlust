const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Listing=require("./models/listing.js");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");


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

// app.get("/samplelisting",async (req,res)=>{


//     let sampleListing=new Listing({
//         title:"My new  villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Jalandhar,Punjab",
//         country:"India",
//         // image:"",
       

//     });

//     await sampleListing.save();

//     console.log("sample saved"),
//     res.send("Successful testing");

// });



//index route
app.get("/listings",async (req,res)=>{
    let allListing =await Listing.find({});
    // console.log(allListing);
    res.render("listing/index.ejs",{allListing});
});



//New route
app.get("/listings/new",(req,res)=>{
    // res.send("working");
    res.render("listing/new.ejs");
});    


// show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    // console.log(listing);
   res.render("listing/show.ejs",{listing}); 


});   

app.post("/listings",async(req,res)=>{
    // let {name,title,description,price,location,image,country}=req.body;
    // console.log();
    let newListing=new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listings");



});
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listing/edit.ejs",{listing});
    
    
});
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    
    await Listing.findByIdAndUpdate(id,{  ...req.body.Listing});
    
    res.redirect(`/listings/${id}`);
    
    
});

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    

     res.redirect("/listings");
    
});








app.listen(8080,()=>{
    console.log("servers is listening on port 8080")
});
