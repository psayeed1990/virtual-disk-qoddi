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
        cb(null, "/node/app/");
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

//create a get route to create-file
app.get("/create-file", (req, res) => {
    // "/node/app/" is a mounted folder. Mount it to the root directory of this project

    //create a file with with error check
    fs.writeFile(
        path.join("node", "app", "new-file.txt"),
        "This is a new file created by node.js",
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("file created");
            }
        }
    );

    //access the file content with error checking
    const file = fs.readFileSync(
        path.join("node", "app", "new-file.txt"),
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("created file read");
            }
        }
    );

    //send the file content in a h1 tag
    res.send(`<h1>${file}</h1>`);
});

//set a port
const port = process.env.PORT || 5000;

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
