require("dotenv").config()
const express = require('express')
const app = express()
const path = require("path")
const logger = require("morgan")
const mongoose = require("mongoose")
const session = require("express-session")
const User = require("./models/user")
// const Todo =require("./models/Todo")
app.use(express.static(path.join(__dirname, "public")))

app.use(logger("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session
app.use(session({
  secret:process.env.SECRET,
  resave:true,
  saveUninitialized:true
}))
//ejs template engine
app.set("view-engine", "ejs")

//db connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true ,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => console.log("DB connected "))
  .catch(error => console.log(error))


//route connect
//SIGNUP GET
app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.get("/password", (req, res) => {
  res.render("password.ejs")
})


//SIGNUP POST
app.post("/index", async (req, res) => {
  console.log(req.body)
  try {
    const user = new User({
      // name: req.body.name,
      // email: req.body.email
      // password: req.body.password
      email: req.body.email
    })
    await user.save();
    res.redirect("/password")
  } catch {
    res.redirect("/")

  }

})



// //LOGIN GET
// app.get("/login", (req, res) => {
//   res.render("login.ejs")
// })

// //LOGIN POST
// app.post("/signin", async (req, res) => {
//  await User.find({email:req.body.email}).then(data =>{
//    if(req.body.password == data[0].password){
//      req.session.user =data[0]
//      res.redirect("/dashboard")
//    }
//  }).catch(e=>{
//    console.log(e)
//    res.send("error")
//  })

// })

//dashboard
// app.get("/index",(req,res)=>{
//   res.render("index.ejs")
// })
//add todo 
// app.post("/addtodo",async(req,res)=>{
//   try {
//     console.log(req.session.user)
//     const Todo = new Todo({
      
//       UserId: req.session.user._id,
//       email: req.body.email,
//       content: req.body.content
//     })
//     await todo.save();
//     console.log("Todo Added")
//     res.send("Todo Added")
//   } catch (error){
//     console.log(error)
//     res.send("error")

//   }

// })

//port set 
let port = process.env.PORT || 80;



//listening to port
app.listen(port, () => {
  console.log("listening to port 80")
})
