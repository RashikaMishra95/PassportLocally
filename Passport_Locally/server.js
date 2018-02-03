const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const LocalStrategy=require('passport-local');
const mongoose=require("./DB/conn");
const User=require("./models/Users");

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    encoded:true
}));
app.use(passport.initialize());

passport.serializeUser((user,done)=>{
    done(null,user.email);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});
passport.use(new LocalStrategy((email,password,done)=>{
    User.findOne({email,password}).then((user)=>{
        console.log(email,password);
        //console.log(user);
        if(!user){
            console.log("inside if")
            return done(null,false);
        }
        return done(null,user);
    },(err)=>{return done(null,false)})
}));