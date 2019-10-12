const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ dest: "uploads/" });

mongoose.connect("mongodb://localhost:27017/blog", { useNewUrlParser: true });

mongoose.connection.on("connected", err => {
  if (err) throw err;
  console.log("Connected to database");
});

//SCHEMA

const PostSchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image: String,
  timestamp: Date,
  likes: String
});
const CommentsSchema = mongoose.Schema({
  comment: String,
  postId: String,
  name: String
});

const PostModel = mongoose.model("post", PostSchema);
const CommentsModel = mongoose.model("comments", CommentsSchema);

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Start server

//API ROUTES

app.use("/static", express.static("uploads"));
app.post("/api/post/new", upload.single("image"), (req, res) => {
  let payload = {
    title: req.body.title,
    content: req.body.content,
    image: req.file.filename,
    author: req.body.author,
    timestamp: new Date().getTime()
  };
  let newPost = new PostModel(payload);
  newPost.save((err, result) => {
    if (err) res.send({ msg: err, success: false });
    res.send({ msg: result, success: true });
  });
});
app.post("/api/blog/comments", (req, res) => {
  let payload = {
    postId: req.body.postId,
    comment: req.body.comment,
    name: req.body.name
  };
  let newComment = new CommentsModel(payload);
  newComment.save((err, result) => {
    if (err) res.send({ msg: err, success: false });
    res.send({ msg: result, success: true });
  });
});

app.get("/api/posts/all", (req, res) => {
  PostModel.find((err, result) => {
    if (err) res.send({ msg: err, success: false });
    res.send({ msg: result, success: true });
  });
});

app.get("/api/blog/", (req, res) => {
  let id = req.query.id;
  PostModel.findById(id, (err, result) => {
    if (err) res.send({ msg: err, success: false });
    CommentsModel.find({ postId: id }, function(err, comments) {
      res.send({ msg: { result, comments }, success: true });
    });
  });
});

app.post("/api/post/update", (req, res) => {
  let id = req.body._id;
  let payload = req.body;
  PostModel.findByIdAndUpdate(id, payload, (err, result) => {
    if (err) res.send({ msg: err, success: false });
    res.send({ msg: result, success: true });
  });
});

app.post("/api/post/remove", (req, res) => {
  let id = req.body._id;
  PostModel.findById(id).deleteOne((err, result) => {
    if (err) res.send({ msg: err, success: false });
    res.send({ msg: result, success: true });
  });
});

app.listen(process.env.PORT || 3000, err => {
  if (err) console.log(err);
  console.log("server has started on port %s", 3000 || process.env.PORT);
});
