const axios = require("axios");

axios
  .get("http://localhost:3000/request")
  .then(function(response) {
    // handle success
    console.log(response.data);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  });
