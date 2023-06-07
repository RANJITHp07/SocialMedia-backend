const router=require('express').Router();
const Message=require("../model/message");

router.post("/message",async function(req,res){
    const newmessage=new Message(req.body);
    try{
        const message=await newmessage.save();
        res.status(201).json(message)
    }catch(err){
        res.status(401).json(err)
    }
})

//get
router.get("/message/:conversationId",async function(req,res){
    try{
        const message=await Message.find({conversationId:req.params.conversationId}) 
        res.status(201).json(message)
    }catch(err){
        res.status(401).json(err)
    }
    
})

module.exports=router