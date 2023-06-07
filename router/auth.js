const router=require("express").Router();
const User=require("../model/user");
const bcrypt=require("bcrypt")

//register
router.post("/auth/register",async function(req,res){
    const salt = await bcrypt.genSaltSync(10);
    const hashpassword =await  bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpassword
        })
        const user=await newUser.save();
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(404).json({message:err})
    }
})

//login
router.post("/auth/login",async function(req,res){
   try{
    const user= await User.findOne({email:req.body.email})
    if(user){
        const valid= await bcrypt.compareSync(req.body.password, user.password);
        if(valid){
            res.status(201).json(user);
        }
        else{
            res.status(401).json("wrong password");
        }
    }
    else{
        res.status(401).json("wrong email");
    }
   }catch(err){
    res.status(401).json(err)
   }
})

module.exports=router