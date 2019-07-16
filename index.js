const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const link2 = path.join(__dirname, "data", "isUpdated.json");
const newData = path.join(__dirname, "data", "newData.json");
const oldChain = path.join(__dirname, "data", "blockchain.json");
//
//
//
//To enable POST requests
app.use(express.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // to support URL-encoded bodies
//
//
//
//
//
//FOR THE OTHER PI'S CONNECTED TO IT!
//
//
//
//
//
//setting up API endpoints
app.set("view engine", "pug");
//endpoint for pi's to get data from other pi's and follow consensus
app.post("/getData", (req, res) => {
  const data = req.body.data;
  let obj = {
    isUpdated: true
  };
  fs.writeFileSync(link2, JSON.stringify(obj), "utf8", callback);
  fs.writeFileSync(newData, JSON.stringify(data), "utf8", callback);
  let checker = fs.readFileSync(link2, "utf8");
  while (checker.isUpdated === true) {
    let checker = fs.readFileSync(link2, "utf8");
    continue;
  }
  res.json(data);
});
//
//
//
//
//FOR THE ANDROID APPLIICATION!!
//
//
//
//
//enpoint for the android app to check if there is a new update on the node
app.get("/updateCheck", (req, res) => {
  let isUpdated = fs.readFileSync(link2, "utf8");
  res.send(isUpdated);
});

//endpoint for the android app to get the new added data
app.get("/getNewData", (req, res) => {
  let whatev = fs.readFileSync(newData, "utf8");
  res.json(whatev);
});

//endpoint for the android app to get the data of the block chain
app.get("/getExistingData", (req, res) => {
  let whatev2 = fs.readFileSync(oldChain, "utf8");
  res.json(whatev2);
});

//endpoint for the android app to send the newly formed chain so that data inside the node updates
app.post("/sendData", (req, res) => {
  try{
      let newChain = req.body.data;
      fs.writeFileSync(oldChain, JSON.stringify(newChain));
      let obj = {
        isUpdated: false
      };
      fs.writeFileSync(link2, JSON.stringify(obj));
      console.log(newChain);
      res.send("Success");
  }catch(err){
    res.send("Failed");
  }

});

//setting the port
app.listen(port);
