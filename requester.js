const axios = require("axios");
const path = require("path");
const fs = require("fs");
// getting the chain from the data folder
const link = path.join(__dirname, "data", "blockchain.json");
var contents = fs.readFileSync(link, "utf8");

axios
  .post("http://localhost:3000/getData", {
    data: contents
  })
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`);
    fs.writeFile(link, res.data, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
    console.log(res.data);
  })
  .catch(error => {
    console.error(error);
  });
