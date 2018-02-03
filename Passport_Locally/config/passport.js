const express=require('express');
const passport=require('passport');
const bodyParser=require('body-parser');
const LocalStrategy=require('passport-local').Strategy;
const {mongoose}=require("../DB/conn");
const {User}=require("../models/Users");

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    encoded:true
}));
app.use(passport.initialize());
app.use(passport.session())

passport.serializeUser((user,done)=>{
    console.log("serializer");
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    console.log("deserializer");
    done(null,user);
});
passport.use('local',new LocalStrategy((username,password,done)=>{
    User.findOne({"email":username},(err,user)=>{
       if(err){
           console.log("errror");
           return done(err)}
       if(!user){
           console.log("not found");
           return done(false)}
       if(user){
           console.log("user Loacal :"+user);
           return done(user)
       }
    });
    /*User.findOne({"email":username}).then((user)=>{
        console.log(username,password);
        //console.log(user);
        if(!user){
            console.log("inside if")
            return done(null,false);
        }
        return done(null,user);
    },(err)=>{return done(null,false)})*/
}));
app.post('/passUser',passport.authenticate('local',(req, res, err) => {
    if(err) {
        console.log(err);
    }
    res.json({message:"Success"});
}));


// app.post('/passUser',passport.authenticate('local',(res)=>{
//     console.log('sucess');
//   res.json({message:"Success"});
// }));
app.get('/suc',(req,res)=>{
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
app.listen(6666,()=>{
    console.log('connected');
});


