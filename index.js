const express = require("express");
const app = express();
const cors = require("cors");
//require path
const path = require("path");
const fs = require("fs");

//set a cors middleware
app.use(cors());

//set static folder to public with path
app.use(express.static("/node/app"));

//set a index route
app.get("/", (req, res) => {
    //check fs stat on index.html
    fs.stat("/node/app/index.html", (err, stats) => {
        if (err) {
            console.log(err);
            return res.send({ Error: err });
        }
        //if stat is ok, send index.html

        return res.sendFile(path.join("/node/app/index.html"));
        // res.send("hello");
    });
});

//set a port
const port = process.env.PORT || 5000;

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
