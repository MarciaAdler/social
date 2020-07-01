const axios = require("axios");
export default {
  createUser: function (req) {
    return axios.post("/api/signup", req);
  },
};
