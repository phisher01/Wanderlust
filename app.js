const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const User=require("./models/user.js");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const userRouter=require("./routes/user.js");





const Session=require("express-session");
const flash=require("connect-flash");








app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// app.use(cookieParser("secret")); 


const sessionOptions={
    
        secret:"mysecxretcode",
        resave:false,
        saveUninitialized:true,
        cookie:{
            expires:Date.now() +7* 12*60*60*1000,
            maxAge:7* 12*60*60*1000,
            httpOnly:true,
        }

    

};
;












const mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main(). then(()=>{
    console.log("connection  successfull");

}).catch((err)=>{
    console.log(err);
});





async function main(){
    await mongoose.connect(mongo_url);

};


// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hi",{signed:true} );
//     res.send("sent you some cookies");
// })


app.get("/",(req,res)=>{
    res.send("I am root");
   });



        

        app.use(Session(sessionOptions));
        app.use(flash());
        app.use(passport.initialize()); // to initialize passport 
                                        // passport is a library used for authentication
        app.use(passport.session()); // to identify same session and not to login again for another page in same website.

        passport.use(new LocalStrategy(User.authenticate()));
        //telling passport that we are authenticating through localstrategy and authenticate user with User.authenticate(). This method  is added by p-l-mongoose lib to model User
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
        //serialize - to store all user's info in session 
        //deserialize- to remove all user's info from session





    app.use((req,res,next)=>{
   
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");

    next();


});


// app.get("/demo",async(req,res)=>{
//     let fakeuser=new User({
//         email:"student@gamil.com",
//         username:"delta-students",


//     });
//     let registereduser=await User.register(fakeuser,"helloworld");
//     res.send(registereduser);

// })


app.use("/listings",listingRouter);

app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);





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
