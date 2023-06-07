const mongoose=require("mongoose");

const postSchema= new mongoose.Schema({
     userId:{
        type:String,
        required:true
     },
     desc:{
        type:String,
        max:500
     },
     img:{
        type:String,
        required:true
     },
     likes:{
        type:Array,
        default:[]
     },
     comment:{
      type:Array,
      default:[]
     }

}
,
{
    timestamps:true
})

module.exports=mongoose.model("Post",postSchema);