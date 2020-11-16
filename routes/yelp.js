"use strict";
const router = require("express").Router();
const yelp = require("yelp-fusion");
const client = yelp.client(process.env.YELP_APIKEY);

router.route("/api/search/:business/:location").get((req, res) => {
  client
    .search({
      term: req.params.business,
      location: req.params.location,
      limit: 50,
      radius: 5000,
    })
    .then((response) => {
      res.json(response.jsonBody.businesses);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
