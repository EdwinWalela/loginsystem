const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app = express();
var port = process.env.PORT || 3000;

// --- Models --- //
const User = require('./models/user');

// open connection to mongo
mongoose.connect('mongodb://walela:node3000@ds161700.mlab.com:61700/loginwalela');
mongoose.connection.once('open',function(){
  console.log('db connection success!')
}).on('error',function(err){
   console.log('db connection fail!',err);
})

app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));

// --- API rooting --- //

// view rendering
app.get('/login',function(req,res){
  res.render('login');
})

app.get('/register',function(req,res){
  res.render('register')
})

// form actions
app.post('/register',urlencodedParser,function(req,res){
  var data = new User({
    fname : req.body.fname,
    lname : req.body.lname,
    username : req.body.username,
    email : req.body.email,
    gender : req.body.gender,
    mobile : req.body.mobile,
    password : req.body.password,
    dob : new Date(req.body.dob),
    creation : new Date()
  })
  User.findOne({username:req.body.username}).then(function(result){
    if(result){
      res.json('username already exists')
    }else{
      data.save().then(function(){
        res.render('regsucess')
      }).catch(function(err){
        res.json('failed to add user to the database',err);
      })
    }
  })
});

app.post('/login',urlencodedParser,function(req,res){
  User.findOne({username:req.body.username}).then(function(result){
    if(result){
      if(result.password == req.body.password){
        //--- render profile page
        res.render('profile',{user:result})
      }else{
        //--- render fail page
        res.render('incorrect')
      }
    }else{
      //--- render not found
      res.render('nouser')
    }
  })
})

console.log(`listening to port:${port}`);
app.listen(port);
