const axios = require("axios");
export default {
  createUser: function (req) {
    return axios.post("/api/signup", req);
  },
  getUser: function (req) {
    return axios.post("/api/login", req);
  },
  createPost: function (post) {
    return axios.post("/api/post", post);
  },
  getPosts: function (req) {
    return axios.get("/api/post", req);
  },
};
