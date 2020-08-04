"use strict";
const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.YELP_APIKEY);
console.log(process.env.YELP_APIKEY);

router.route("/api/businesses/").get((req, res) => {
  client
    .search({
      term: "restaurants",
      location: "11201",
      limit: 20,
      radius: 5000,
    })
    .then((response) => {
      console.log(response.jsonBody.businesses);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
