var express = require('express');
var router = express.Router();
var multer = require('multer');
var UserModel = require('../models/users.model');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

passport.use(new LocalStrategy(function(username,password,done){
  UserModel.getUserByUsername(username,function(err,user){
    if(err) throw err;
    if(!user){
      return done(null,false,{message:'Unknown User'});
    }
  })

  UserModel.comparePassword(password,u)
}));

//where to store file
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploads');
  },

  filename: function(req,file,cb){
    cb(null,file.originalname)
  }
})

var upload = multer({ storage: storage });

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('login');
});

router.post('/login',authenticate,(req,res)=>{
  
})

router.get('/register',function(req,res,next){
  res.render('register');
})

router.post('/api/register', upload.single('profileimage'),function(req,res,next){
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  if(req.file){
    console.log('Uploading file...');
    var profileimage = req.file.filename;
  }else{
    console.log('No File Uploaded');
    var profileimage = 'noimage.jpg';
  }

  let newUser = {
    name : name,
    email : email,
    username : username,
    password : password,
    profileimage: profileimage,
  }

  let createUser = function(newUser,callback){
    bcrypt.genSalt(10,function(err, salt){
      bcrypt.hash(newUser.password,salt,function(err,hash){
        newUser.password = hash;
        newUser.save(callback);
      })
    })
  }

  console.log(newUser);

  UserModel.create(newUser,(err, user)=>{
    if(err) throw err;
    else{
      res.render('member',{
        message: 'Account Created'
      })
    }
  })
})

router.get("/member",(req,res)=>{
  res.render('member');
})

module.exports = router;
