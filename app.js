const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const postRouter = require("./router/post");
const messageRouter = require("./router/message");
const multer = require("multer");
const path = require('path');
const conversationRouter=require("./router/conversation")

const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
  .then(function(){
    console.log("Database successfully connected");
  })
  .catch(function(err){
    console.log(err);
  });

//middlewares
app.use("/images", express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

//routes
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(conversationRouter);
app.use(messageRouter);

app.post('/auth/uploads', upload.single("file_name"), function (req, res) {
  
  try {
    res.status(200).json("Successfully Uploaded");
  } catch(err) {
    res.status(404).json(err);
  }
});
app.post('/auth/profileuploads', upload.single("profilefile"), function (req, res) {
  console.log('Upload endpoint called');
  try {
    res.status(200).json("Successfully Uploaded");
  } catch(err) {
    res.status(404).json(err);
  }
});

app.post('/auth/coveruploads', upload.single("coverfile"), function (req, res) {
  console.log('Upload endpoint called');
  try {
    res.status(200).json("Successfully Uploaded");
  } catch(err) {
    res.status(404).json(err);
  }
});

app.listen(5500, function() {
  console.log("Successfully connected");
});
