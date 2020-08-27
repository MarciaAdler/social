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
    console.log(post.id);
    return axios.get("/api/getcomments/" + post.id);
  },
  getComments2: function (post) {
    console.log(post);
    return axios.get("/api/getcomments2/" + post);
  },
  deleteComment: function (comment) {
    return axios.delete("/api/deletecomment/" + comment);
  },
  search: function (business) {
    console.log(business);
    return axios.get("/api/search/" + business);
  },
  uploadGroupImage: function (image) {
    return axios.post("/api/groupimage", image);
  },
  createGroup: function (group) {
    return axios.post("/api/group", group);
  },
  setGroups: function () {
    return axios.get("/api/group");
  },
  getPageFromURL: function (group) {
    return axios.get("/api/grouppage/" + group);
  },
  createGroupPost: function (post) {
    return axios.post("/api/grouppost", post);
  },
  uploadGroupPostImage: function (image) {
    return axios.post("/api/grouppostimage", image);
  },
  getGroupPosts: function (group) {
    return axios.get("/api/grouppost/" + group);
  },
  deleteGroupPost: function (post) {
    return axios.delete("/api/deletegrouppost/" + post);
  },
  addGroupComment: function (comment) {
    return axios.post("/api/addgroupcomment", comment);
  },
  getGroupComments: function (post) {
    return axios.get("/api/getgroupcomments/" + post);
  },
  deleteGroupComment: function (comment) {
    return axios.delete("/api/deletegroupcomment/" + comment);
  },
};
