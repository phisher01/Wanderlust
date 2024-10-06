const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const   {listingSchema}=require("../schema.js");



const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);

    }else{
        next();

    }


};


//index route
router.get("/",wrapAsync(async (req,res)=>{
    let allListing =await Listing.find({});
    // console.log(allListing);
    res.render("listing/index.ejs",{allListing});
}));



//New route
router.get("/new",(req,res)=>{
    // res.send("working");
    res.render("listing/new.ejs");
});    


// show route
router.get("/:id",wrapAsync(async (req,res,next)=>{
  

       let {id}=req.params;
       const listing=await Listing.findById(id).populate("reviews");
      
       if(!listing){
        throw new ExpressError(404,"This listings does not available for view purpose");
       }
      
       res.render("listing/show.ejs",{listing}); 
    

    

}));   
//create route
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
       
       
        
        let newListing=new Listing(req.body.Listing);
        
        await newListing.save();
        res.redirect("/listings");


}));
///Edit Route
router.get("/:id/edit", wrapAsync(async (req,res)=>{
   

        let {id}=req.params;
        const listing=await Listing.findById(id);
        res.render("listing/edit.ejs",{listing});
   
    
}));
//update route  
router.put("/:id",validateListing,wrapAsync(async (req,res)=>{
    
    let {id}=req.params;
    
    
   await Listing.findByIdAndUpdate(id,{  ...req.body.Listing},{runValidators:true});
    
 
    res.redirect(`/listings/${id}`);
    
    
}));

router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    
    // console.log(id);

     res.redirect("/listings");
    
})  );

module.exports=router;