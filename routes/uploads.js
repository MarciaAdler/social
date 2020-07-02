const router = require("express").Router();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const fileUpload = require("express-fileupload");

// app.use(cors());
// app.use(fileUpload());
router.post("/api/profileimage", (req, res) => {
  console.log(req.body);
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.image1;
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/public/profileimages/${req.body.id}-${myFile.name}`,
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

router.post("/api/postimages", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files;
  //  mv() method places the file inside public directory
  myFile.mv(
    `${__dirname}/client/public/postimages/${req.body.id}-${myFile.name}`,
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
module.exports = router;
