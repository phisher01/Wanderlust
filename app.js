const express=require("express");
const app=express();
const mongoose=require("mongoose");

const Listing=require("./models/listing.js");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const   listingSchema=require("./schema.js");





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

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);

    }else{
        next();

    }


}



//index route
app.get("/listings",wrapAsync(async (req,res)=>{
    let allListing =await Listing.find({});
    // console.log(allListing);
    res.render("listing/index.ejs",{allListing});
}));



//New route
app.get("/listings/new",(req,res)=>{
    // res.send("working");
    res.render("listing/new.ejs");
});    


// show route
app.get("/listings/:id",wrapAsync(async (req,res,next)=>{
  

       let {id}=req.params;
       const listing=await Listing.findById(id);
       if(!listing){
        throw new ExpressError(404,"This listings does not available for view purpose");
       }
      
       res.render("listing/show.ejs",{listing}); 
    

    

}));   
//create route
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
       
       
        
        let newListing=new Listing(req.body.Listing);
        
        await newListing.save();
        res.redirect("/listings");


}));
///Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
   

        let {id}=req.params;
        const listing=await Listing.findById(id);
        res.render("listing/edit.ejs",{listing});
   
    
}));
//update route  
app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
    
    let {id}=req.params;
    
    
   await Listing.findByIdAndUpdate(id,{  ...req.body.Listing},{runValidators:true});
    
 
    res.redirect(`/listings/${id}`);
    
    
}));

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    

     res.redirect("/listings");
    
})  );

app.all("*",(req,res,next)=>{
    next(new ExpressError (404,"page not found"));
})


app.use((err,req,res,next)=>{
    let {status=505,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
    // res.status(status).send(message);


});




app.listen(8080,()=>{
    console.log("servers is listening on port 8080")
});
