require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
// const port = 8080;
const app = express();
// var http = require("http").createServer(app);
const Sequelize = require("sequelize");
var db = require("./models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const uploads = require("./routes/uploads");
const users = require("./routes/users");
const yelp = require("./routes/yelp");
var session = require("express-session");
var compression = require("compression");
var socket = require("socket.io");

server = app.listen(8080, function () {
  console.log("server is running on port 8080");
});

// socket.io connection
io = socket(server);

io.on("connection", (socket) => {
  // here you can start emitting events to the client
  console.log("socket.id", socket.id);

  socket.on("SEND_MESSAGE", function (data) {
    io.emit("RECIEVE_MESSAGE", data);
  });
});

// io.listen(port);
// console.log("listening on port ", port);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public")); //to access the files in public folder
app.use(express.static(path.join(__dirname, "/client/build/")));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(cors());
app.use(fileUpload());

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(compression());
// Add routes, both API and view

// Define API routes here
// app.use(transit);

app.use(users);
app.use(yelp);
// app.use(uploads);
// create image file for profiles
app.post("/api/profileimage", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.image;
  const name = myFile.name.replace(/\s+/g, "_");
  const username = req.body.username.replace(/\s+/g, "_");
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/build/profileimages/${username}-${name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returning the response with file path and name
      return res.send(req.files.file);
    }
  );
});
// create image files for posts
app.post("/api/postimages", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.image1;
  const name = myFile.name.replace(/\s+/g, "_");
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/build/postimages/${req.body.id}-${name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returning the response with file path and name
      return res.send(req.files.file);
    }
  );
});

app.post("/api/groupimage", (req, res) => {
  console.log(req.files);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.image;
  const name = myFile.name.replace(/\s+/g, "_");
  const groupname = req.body.groupname.replace(/\s+/g, "_");
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/build/groupimages/${groupname}-${name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returning the response with file path and name
      return res.send(req.files.file);
    }
  );
});
app.post("/api/grouppostimage", (req, res) => {
  console.log(req.files);
  console.log(req.body);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.image1;
  const name = myFile.name.replace(/\s+/g, "_");
  const groupname = req.body.groupname.replace(/\s+/g, "_");
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/build/grouppostimages/${groupname}-${req.body.id}-${name}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }
      // returning the response with file path and name
      return res.send(req.files.file);
    }
  );
});
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({ logging: false }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
