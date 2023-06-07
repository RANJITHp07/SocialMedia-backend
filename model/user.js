const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:2,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:40,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6, 
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    city:{
        type:String,
    },
    from:{
        type:String
    }
    
},
{
    timestamps:true
});

module.exports=mongoose.model("User",userSchema);