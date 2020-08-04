"use strict";
const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.YELP_APIKEY);
console.log(process.env.YELP_APIKEY);

router.route("/api/food/").get((req, res) => {
  client
    .search({
      term: "food",
      location: "11201",
      limit: 20,
      radius: 5000,
    })
    .then((response) => {
      res.json(response.jsonBody.businesses);
      console.log(response.jsonBody.businesses);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
