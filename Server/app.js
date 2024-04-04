const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs");
const  jwt = require("jsonwebtoken")
const JWT_SECRET = "bhcshbf887ry87()ajdndhfbhfbbej7894324he84bfvdnxjnv988vn?[]]kjfn";

const app = express()
app.use(express.json())
app.use(cors())

const mongoURL = "mongodb+srv://kritheebhanb:12345@cluster0.m3uvv8w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
})
.then(() => {
    console.log("connected to databas");
})
.catch((e) => console.log(e));


require("./userdetails")

const User=mongoose.model("UserInfo");
app.post('/register', async(req, res) =>{
    const {name, email, password, userType } = req.body;

    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.json({error: "User Exists"});
        }
        await User.create({
            name,
            email,
            password:encryptedPassword,
            userType,
        });
        res.send({status:"ok"});
    } catch (error) {
        res.send({status:"error"});
    }
});

// Modify the Signin route to include userType in the response
app.post('/Signin-user', async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if (!user){
        return res.json({error: "User Not found"});
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email:user.email}, JWT_SECRET);
        
        // Include userType in the response
        return res.json({ status: "ok", data: token, userType: user.userType });
    }
    res.json({ status : "error", error: "Wrong password"})
});


app.post("/userData", async (req, res) => {
    const {token} = req.body;
    try {
        const user=jwt.verify(token,JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        User.findOne({ email: useremail }).then((data) => {
            res.send({ status: "ok", data: data });
        }).catch((error) => {
            res.send({ status: "error",data: error});
        });
    } catch (error) {

    }
});

app.get("/getAllUser",async(req,res)=>{
    try{
        const allUser=await User.find({});
        res.send({status:"ok",data:allUser});
    }catch (error) {
        console.log(error);
    }
})

app.post("/deleteUser", async (req, res) => {
    const { userid } = req.body;
    try {
      await User.deleteOne({ _id: userid }); // Use async/await to handle asynchronous operations
      res.send({ status: "Ok", data: "Deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "Error", message: "An error occurred while deleting user" });
    }
  });

  app.get("/getUserCount", async (req, res) => {
    try {
      const count = await User.countDocuments(); // Count all documents in the User collection
      res.send({ status: "ok", count: count });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "error", message: "An error occurred while fetching user count" });
    }
  });
  
  
app.listen(5000, () => {
    console.log("server is running")
});