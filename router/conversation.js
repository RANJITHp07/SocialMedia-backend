const router=require("express").Router();
const Conversation=require("../model/conversation")

//get new conversation
router.post("/conversation",async function(req,res){
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.reciverId]
    })
    try{
        const conversation=await newConversation.save();
        res.status(200).json(conversation)
    }catch(err){
        res.status(401).json(err)
    }
})

//get conversation
router.get("/conversation/:userId",async function(req,res){
    try{
        const conversation=await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    }
    catch(err){
        res.status(401).json(err)
    }
})

module.exports=router