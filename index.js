const express = require("express");
const app = express();
const cors = require("cors");
//require path
const path = require("path");
const fs = require("fs");
//import multer
const multer = require("multer");

//set a cors middleware
app.use(cors());

//set static folder to public with path
app.use(express.static("/node/app"));

// //set static folder with __dirname, 'node' and 'app' folder with path.join
// app.use(express.static(path.join(__dirname, "node", "app")));

//set a index route
app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "static", "index.html"));
    // res.send("hello");
});

//multer storage to "/node/app/" folder with filename with date
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./node/app/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

//upload file with multer
const upload = multer({
    storage: storage,
}).single("file");

//a post request to upload a image using multer to the folder "/node/app/"
app.post("/upload", upload, (req, res) => {
    //access the file with fs.readFileSync
    const file = fs.readFileSync(req.file.path);
    //set the content type
    res.set("Content-Type", req.file.mimetype);
    //send the file
    res.send(file);
});

//set a port
const port = process.env.PORT || 5000;

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
