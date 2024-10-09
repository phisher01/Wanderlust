const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const   {reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");



const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);

    }else{
        next();

    }


};

//reviews
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    
    let newReview=new Review(req.body.Review);
    listing.reviews.push(newReview);
    await listing.save()
    await newReview.save();
    req.flash("success","New Review Created!");

    
    res.redirect(`/listings/${listing._id}`);
    




     


}));
//delete reviews
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    
    await Review.findByIdAndDelete(reviewId);

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});

    req.flash("success","Review Deleted!");

    res.redirect(`/listings/${id}`);

        

}));
module.exports=router;