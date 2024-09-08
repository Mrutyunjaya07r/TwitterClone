let mongoose=require('mongoose');
let {ObjectId}=mongoose.Schema.Types

let postSchema=new mongoose.Schema({
    title:{type:String,required:true},
    photo:{type:String},
    postedBy:{type:ObjectId,ref:"USER"},
    like:[{type:ObjectId,ref:"USER"}]
})
mongoose.model("POST",postSchema)