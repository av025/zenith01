const express = require('express');
const path = require('path');
const http=require('http'); 
const socketio=require('socket.io');
const app = express();
const PORT = process.env.PORT || 3000;
const formatMessage=require('./utils/messages');
const { format } = require('path');
const  {userJoin,getCurrentUser, getRoomUsers, userLeave}=require('./utils/users');
const server=http.createServer(app);
const io=socketio(server);

const bodyParser=require("body-parser");
const { stringify } = require('querystring');
const { stderr } = require('process');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

const admin = 'admin';




























// Run when a client connects
io.on('connection', (socket)=>{

    socket.on('joinRoom',({username,room})=>{

        //to join a room
        const user=userJoin(socket.id,username,room);
        socket.join(user.room);

        socket.emit('message', formatMessage(admin,'welcome to the chat'));

        socket.broadcast.to(user.room).emit('message', formatMessage(admin,`${user.username} has joined the chat!`));

        // Send users and room info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });
    });



    // Listen for the chat message 
    socket.on('chatMessage', (msg)=>{
        const user=getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    });

    // User disconnects
    socket.on('disconnect',()=>{

        const user=userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage(admin,`${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users:getRoomUsers(user.room)
            });
        }

        
    });


});

var lg = "Login";
var un=["Vishal","Admin"];
var email=["sharma@gmail.com","admin@gmail.com"];
var pass=["123","123"];
var doubt=47;
app.set('view engine','ejs');
app.get("/",function(req,res){
    res.render("index",{lg: lg,doubt: doubt});
});
app.get("/header",function(req,res){
    res.render("Header",{lg: lg,doubt: doubt});
});
app.get("/login",function(req,res){
    res.render("login",{lg: lg,doubt: doubt});
});
app.get("/doubt",function(req,res){
    res.render("doubt",{lg: lg,doubt: doubt,room:room,username:username});
});
app.get("/register",function(req,res){
    res.render("register",{lg: lg,doubt: doubt});
});
app.get("/video",function(req,res){
    res.render("video",{lg: lg,doubt: doubt});
});
app.get("/courses",function(req,res){
    res.render("courses",{lg: lg,doubt: doubt});
});
app.get("/loginsu",function(req,res){
    res.render("loginsu",{lg: lg,doubt: doubt});
});
app.get("/regsu",function(req,res){
    res.render("regsu",{lg: lg,doubt: doubt});
});
app.get("/invalid",function(req,res){
    res.render("invalid",{lg: lg,doubt: doubt});
});

app.get("/notes",function(req,res){
    res.render("notes",{lg: lg,doubt: doubt});
});

app.get("/note",function(req,res){
    res.render("note",{lg: lg,doubt: doubt});
});

app.get("/oops",function(req,res){
    res.render("oops",{lg: lg,doubt: doubt});
});

app.get("/cpp",function(req,res){
    res.render("cpp",{lg: lg,doubt: doubt});
});
app.get("/nodejs",function(req,res){
    res.render("nodejs",{lg: lg,doubt: doubt});
});
app.get("/sql",function(req,res){
    res.render("sql",{lg: lg,doubt: doubt});
});
app.get("/oracle",function(req,res){
    res.render("oracle",{lg: lg,doubt: doubt});
});

app.get("/mongodb",function(req,res){
    res.render("mongodb",{lg: lg,doubt: doubt});
});

app.get("/postgre",function(req,res){
    res.render("postgre",{lg: lg,doubt: doubt});
});
app.get("/admin",function(req,res){
    res.render("admin",{lg: lg,doubt: doubt,un:un});
});

app.get("/logout",function(req,res){
    lg="Login";
    res.render("logout",{lg: lg,doubt: doubt});
});

app.post("/login",function(req,res){
   var tem=req.body.email;
   var pa=req.body.pass;
   console.log(tem);
   console.log(pa);
   for (let step = 0; step < email.length; step++) {

    if(email[step]==tem&&pass[step]==pa){
        
        lg=un[step];
        res.redirect("/loginsu");
    console.log("sucess");
    }
       else if(step==email.length-1){
           res.redirect("/invalid");
           console.log("invalid");
       }

 }
  
});

app.post("/register",function(req,res){
    var us=req.body.usern;
    var tem=req.body.email;
    var pa=req.body.pass;
  un.push(us);
  email.push(tem);
  pass.push(pa);
  
const use1=new user({
    username:us,
    email:tem,
    password:pa,
});


use1.save(function (err, user) {
    if (err) return console.error(err);
    console.log(user.username + " saved to LOGIN collection.");
  });


   res.redirect("/regsu");
 });
 

server.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`);
});
