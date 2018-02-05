const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const LocalStrategy=require('passport-local').Strategy;
const {mongoose}=require("../DB/conn");
const {User}=require("../models/Users");
var cors=require('cors');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    encoded:true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user,done)=>{
    console.log("serializer");
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    // console.log("deserializer");
    // done(null,user);
});
passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    console.log(email);
    User.findOne({email}).then((user)=>{
       if(!user){
           console.log("not found");
           return done(null,false)}
       if(user){
           console.log("user Loacal :"+user);
           return done(null,user)
       }
    }).catch(()=>{
        console.log('Error');
    });

}));
app.post('/passUser',passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/err"
}));


// app.post('/passUser',passport.authenticate('local',(res)=>{
//     console.log('sucess');
//   res.json({message:"Success"});
// }));
app.get('/',(req,res)=>{
    res.json({message:"Success"});
});
app.get('/err',(req,res)=>{
    console.log('Fail');
    res.json({message:"Fail"});
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

app.listen(3004,()=>{
    console.log('connected');
});


