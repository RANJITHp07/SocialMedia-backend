const router=require("express").Router();
const User=require("../model/user")

//update user
router.put("/:id",async function(req,res){
    try{
        const user= await User.findOne({_id:req.params.id})
        if(user){
            if(req.body.password){
                const salt = await bcrypt.genSaltSync(10);
               req.body.password =await  bcrypt.hashSync(req.body.password, salt);
            }
            const userUpdate= await User.findByIdAndUpdate(req.params.id,{$set:req.body})
            res.status(201).json(userUpdate)
        }
        else{
            res.status(401).json("id not there")
        }
    }
    catch(err){
        res.status(401).json(err)
       }
})

//delete user
router.delete("/:id",async function(req,res){
    const user= await User.findOne({_id:req.params.id})
    try{
        if(user){
            await User.deleteOne({_id:req.params.id});
            res.status(201).json("Succesfully deleted")
        }
    }catch(err){
        res.status(401).json(err)
    }
})

//get a user using id
router.get("/:id",async function(req,res){
    try{
        const user= await User.findOne({_id:req.params.id})
        const{password,createdAt,...others}=user._doc
        res.status(201).json(others)
    }
    catch(err){
        res.status(401).json(err)
    }
})

//get a user using username
router.get("/user/:username",async function(req,res){
    try{
        const user= await User.findOne({username:req.params.username})
        const{password,createdAt,...others}=user._doc
        res.status(201).json(others)
    }
    catch(err){
        res.status(401).json(err)
    }
})

//follow a user
router.put("/:id/follow",async function(req,res){
      if(req.body.userId!=req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const curruser=await User.findById(req.body.userId);
            if(!user.followers.includes(curruser)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await curruser.updateOne({$push:{following:req.params.id}});
                res.status(201).json("Succesfully followed")
            }
            else{
                res.status(403).json("already following")
            }
        }catch(err){
            res.status(401).json(err)
    }
        }
      }
)

//unfollow a user
router.put("/:id/unfollow",async function(req,res){
    if(req.body.userId!=req.params.id){
      try{
          const user=await User.findById(req.params.id);
          const curruser=await User.findById(req.body.userId);
          if(!user.followers.includes(curruser)){
              await user.updateOne({$pull:{followers:req.body.userId}});
              await curruser.updateOne({$pull:{following:req.params.id}});
              res.status(201).json("Succesfully unfollowed")
          }
          else{
              res.status(403).json("already following")
          }
      }catch(err){
          res.status(401).json(err)
  }
      }
    }
)

//get all friends
router.get("/allfriends/:id",async function(req,res){
       const friends=[];
       try{
        const user=await User.findById(req.params.id)
        await Promise.all(
         user.following.map(async (f)=>{
               const frienduser=await User.findById(f);
               friends.push(frienduser)
         })
        )
        res.status(201).json(friends)
       }catch(err){
         res.status(404).json(err)
       }
})

module.exports=router