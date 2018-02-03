const express=require('express');
const bodyParser=require('body-parser');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('./db/db');
const loginUser=require('./model/loginUser');
var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded: true}));
app.use(passport.initialize());
passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
});
passport.use(new LocalStrategy((username,password,done)=>{
    loginUser.findOne({username,password}).then((user)=>{
        console.log(username,password);
        console.log(user);
        if(!user){
            console.log("inside if")
            return done(null,false);
        }
        return done(null,user);
    },(err)=>{return done(null,false)})
}));
app.post('/passUser',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/err'
}));
app.get('/',(req,res)=>{
    console.log('sucess');
    res.json("Sucess");
});
app.get('/err',(req,res)=>{
    console.log('Fail');
    res.json("Fail");
});
//insert
app.post('/loginUser',(req,res)=>{
    var usr=new loginUser({
        username: req.body.username,
        password: req.body.password
    });
    usr.save().then((docs)=>{
        console.log(docs);
        res.send(docs);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    });
});
//get
app.get('/loginUser',(req,res)=>{
    loginUser.find().then((docs)=>{
        console.log(docs);
        res.send(docs);
    }).catch((err)=>{
        console.log(err);
        res.send(err);
    });
});
app.listen(3000,()=>{
    console.log('connect to 3000');
});




