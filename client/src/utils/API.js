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
    return axios.post("/api/addcomment", comment);
  },
  getComments: function (post) {
    return axios.get("/api/getcomments/" + post.id);
  },
  getComments2: function (post) {
    return axios.get("/api/getcomments2/" + post);
  },
  deleteComment: function (comment) {
    return axios.delete("/api/deletecomment/" + comment);
  },
  search: function (business, location) {
    return axios.get("/api/search/" + business + "/" + location);
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
  updateGroup: function (group) {
    return axios.put("/api/updategroup", group);
  },
  refreshGroup: function (group) {
    return axios.get("/api/group/" + group);
  },
  updateImageName: function (group) {
    return axios.put("/api/groupimage", group);
  },

  updateProfileImageName: function (user) {
    return axios.put("/api/userimage", user);
  },
  getUsers: function (req) {
    return axios.get("/api/getusers", req);
  },
  writeMessage: function (message) {
    return axios.post("/api/writemessage", message);
  },
  getMessages: function (sender, receiver) {
    return axios.get("/api/getchatmessages/" + sender + "/" + receiver);
  },
  createDoc: function (doc) {
    return axios.post("/api/doc", doc);
  },
  uploadResource: function (resource) {
    return axios.post("/api/resource", resource);
  },
  getDocs: function () {
    return axios.get("/api/doc");
  },
  deleteDoc: function (doc) {
    console.log(doc);
    return axios.delete("/api/doc/" + doc);
  },
  countUsers: function () {
    return axios.get("/api/countusers");
  },
  feedposts: function () {
    return axios.get("/api/feedpostcount");
  },
  uniqueFeedPosters: function () {
    return axios.get("/api/uniquefeedposters");
  },
  getUniqueFeedPostsInfo: function (user) {
    return axios.get("/api/uniquefeedpostersinfo/" + user);
  },
  getNewUsers: function () {
    return axios.get("/api/getnewusers");
  },
  likePost: function (post) {
    return axios.post("/api/likePost", post);
  },
  getUserLiked: function (req) {
    return axios.get("/api/getuserliked/" + req.id);
  },
  updateUserLike: function (req) {
    return axios.delete("/api/getliked/" + req);
  },
  getUserLikes: function (user) {
    return axios.get("/api/getuserlikes/" + user);
  },
  getAllLikes: function (post) {
    return axios.get("/api/getalllikes/" + post);
  },
  updateLike: function (post) {
    return axios.delete("/api/updatelike/" + post.userId + "/" + post.postId);
  },
  dashboardGetNewUsers: function () {
    return axios.get("/api/dashboardnewusers");
  },
};
