const express=require("express");
const User = require("../models/user");

const wrapAsync = require("../utils/wrapAsync");
const passport  = require("passport");
const router=express.Router();


router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newuser=new User({
            email,
            username,
        });
       const registereduser= await User.register(newuser,password);
    //    console.log(registereduser);
       req.flash("success",`Hi ${username}! Welcome to Wanderlust!`);
       res.redirect("/listings");

    }catch(err){
        req.flash("error",  err.message);
        
        res.redirect("/signup");
    }

}));


router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});



router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),(req,res)=>{
   req.flash("success",`Hello ${req.body.username} ! Welcome back to Wanderlust`);
   res.redirect("/listings");

});










module.exports=router;