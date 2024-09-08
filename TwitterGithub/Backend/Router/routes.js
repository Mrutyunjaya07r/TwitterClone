let express=require('express');
let routes=express.Router();
let mongoose=require('mongoose');
let USER=mongoose.model("USER");
let POST=mongoose.model("POST");
let jwt=require('jsonwebtoken');
let {Jwt_secret}=require('../key');
const requirelogin = require('../Middleware/requirelogin');

routes.get("/",(req,res)=>{
    res.send("hello from router")
})
routes.get("/addpost",requirelogin,(req,res)=>{
    console.log("hello from router")
})
routes.post("/signup",(req,res)=>{
    const {fullname,username,email,password}=req.body
    if(!fullname||!username||!email||!password){
        return res.status(404).send("fill all the feilds")
    }
    let user=new USER({
        fullname,
        username,
        email,
        password
    })
    let result=user.save();
    console.log(result)
    res.send(user);
    console.log("Signup sucessfully")
})
routes.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(404).send("fill all the feilds")
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send("not a user")
        }
        console.log(savedUser)
    })
    USER.findOne({password}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send("not a user")
        }
        console.log(savedUser)
        const token=jwt.sign({_id:savedUser._id},Jwt_secret);
        console.log(token)
        res.json(token)
    })
})
routes.post("/createpost",requirelogin,(req,res)=>{
    const {title,pic}=req.body
    if(!title){
        return res.status(404).send("fill all the feilds") 
    }
    req.user
    let post=new POST({
        title,
       photo: pic,
       postedBy:req.user
    })
    let result=post.save()
    console.log(result);
    console.log("Post is added")
})
routes.get("/showpost",(req,res)=>{
   POST.find()
   .populate("postedBy").select("-password")
   .then((data)=>{console.log(data);res.send(data)})
   .catch((err)=>{console.log(err)})
})
routes.get("/search/:key",async(req,res)=>{
    let result=await USER.find({
        "$or":[
            {"fullname":{$regex:req.params.key}},
            {"username":{$regex:req.params.key}}
        ]
    })
    console.log(result)
    res.send(result)
})
routes.get('/showuser',async(req,res)=>{
    let result=await USER.find();
    if(!result){
        return res.status(404).send("not got") 
    }
    console.log(result)
    res.send(result)
})
routes.get("/mypost",requirelogin,(req,res)=>{
    POST.find({postedBy:req.user._id})
    .populate("postedBy")
    .then((data)=>{console.log(data);res.send(data)})
    .catch((err)=>{console.log(err)})
})
routes.put("/like",requirelogin,async(req,res)=>{
    try {
        let like=await POST.findByIdAndUpdate(req.body.likeid,{
            "$push":{like:req.user._id}
        },{
            new:true
        })
        if(!like){
            return res.status(404).send("not like")
        }
        res.send(like)
    } catch (error) {
        console.log(error)
    }
})
routes.put("/unlike",requirelogin,async(req,res)=>{
    try {
        let like=await POST.findByIdAndUpdate(req.body.likeid,{
            "$pull":{like:req.user._id}
        },{
            new:true
        })
        if(!like){
            return res.status(404).send("not like")
        }
        res.send(like)
    } catch (error) {
        console.log(error)
    }
})
routes.delete("/delete",async(req,res)=>{
    let result=await POST.findByIdAndDelete(req.body._id);
    if(!result){
        return res.status(404).send("not deleted")
    }
    console.log(result);
    res.send(result)
    console.log("deleted successfully")
})
routes.put("/update/:id",async(req,res)=>{
    let result=await POST.findByIdAndUpdate(req.params.id,{
        title:req.body.title
    },{
        new:true
    })
    if(!result){
        return res.status(404).send("not deleted")
    }
    console.log(result);
    res.send(result)
    console.log("update successfully")

})
routes.get("/userprofile/:id",requirelogin,async(req,res)=>{
    try {
        let user=await USER.findOne({_id:req.params.id})
    if(!user){
        return res.status(404).send("not deleted")
    }
    let post=await POST.find({postedBy:req.user.id})
    res.status(200).json({user,post}) 
    } catch (error) {
      console.log(error)  
    }
})
routes.put("/follow",requirelogin,async(req,res)=>{
    try {
        let update_user=await USER.findByIdAndUpdate(req.body.followId,{
            $push:{followers:req.user._id}
        },{
            new:true
        })
        if(!update_user){
            return res.status(404).send("not deleted 1")
        }
        let current_user=await USER.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        })
        if(!current_user){
            return res.status(404).send("not deleted 2")
        }
        res.send(current_user)
    } catch (error) {
        console.log(error)
    }
})
routes.put("/unfollow",requirelogin,async(req,res)=>{
    try {
        let update_user=await USER.findByIdAndUpdate(req.body.followId,{
            $pull:{followers:req.user._id}
        },{
            new:true
        })
        if(!update_user){
            return res.status(404).send("not deleted")
        }
        let current_user=await USER.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followId}
        },{
            new:true
        })
        if(!current_user){
            return res.status(404).send("not deleted")
        }
        res.send({update_user,current_user})
    } catch (error) {
        console.log(error)
    }
})

module.exports=routes