const express = require("express");
const app = express();
const cors = require("cors");
//require path
const path = require("path");

//set a cors middleware
app.use(cors());

//set static folder to public with path
app.use("/uploads", express.static(path.join(__dirname, "node", "app")));

//set a index route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "node", "app", "river.jpg"));
});

//set a port
const port = process.env.PORT || 5000;

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
