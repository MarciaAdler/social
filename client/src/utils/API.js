import { AccordionCollapse } from "react-bootstrap";

const axios = require("axios");
export default {
  createUser: function (req) {
    console.log(req);
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
  uploadPostImage: function (image) {
    return axios.post("/api/postimages", image);
  },
  uploadProfileImage: function (image) {
    return axios.post("/api/profileimage", image);
  },
  deletePost: function (post) {
    return axios.delete("/api/deletepost/" + post);
  },
  updateProfile: function (user) {
    return axios.put("/api/updateprofile", user);
  },
  refreshCurrentUser: function (user) {
    return axios.get("/api/user/" + user);
  },
  getRequestFromURL: function (req, res) {
    return axios.get("/api/viewprofile/" + req);
  },
  getUserPosts: function (user) {
    return axios.get("/api/userposts/" + user);
  },
  addComment: function (comment) {
    console.log(comment);
    return axios.post("/api/addcomment", comment);
  },
  getComments: function (post) {
    return axios.get("/api/getcomments/" + post.id);
  },
  deleteComment: function (comment) {
    console.log(comment);
    return axios.delete("/api/deletecomment/" + comment);
  },
};
