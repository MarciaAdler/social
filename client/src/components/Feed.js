import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row, Col, Card } from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_POSTS, SET_SELECTED_USER, SET_USER_LIKES } from "../utils/actions";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import FeedComment from "./FeedComment";

import Comments from "./Comments";
import { STATUS_CODES } from "http";

export default function Feed() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [comments, setComments] = useState([]);
  const [number, setNumber] = useState(0);
  const [likes, setLikes] = useState(0);
  const [like, setLike] = useState(false);
  // let commentcount = 0;
  const currentUserLs1 = JSON.parse(window.localStorage.getItem("currentUser"));
  useEffect(() => {
    getPosts();
    const currentUserLs = JSON.parse(
      window.localStorage.getItem("currentUser")
    );

    if (state.currentUser.id !== 0 && state.loggedin === true) {
      getUserLikes(state.currentUser.id);
    } else if (state.currentUser.id === 0 && state.loggedin === true) {
      const currentUserLs2 = JSON.parse(
        window.localStorage.getItem("currentUser")
      );
      getUserLikes(currentUserLs2.id);
    }
  }, []);

  function getPosts() {
    API.getPosts()
      .then((res) => {
        dispatch({ type: SET_POSTS, posts: res.data });

        res.data.map((post) => {
          getComments2(post.id);
          API.getComments2(post.id).then((response) => {
            post["number"] = response.data.length;
          });
          API.getAllLikes(post.id).then((res) => {
            setLikes(res.data.length);
          });
          getUserLikes(currentUserLs1.id);
        });
      })
      .catch((err) => console.log(err));
  }

  function getComments(id) {
    console.log(id);
    API.getComments(id)
      .then((response) => {
        setComments(response.data);
        setNumber(response.data.length);
      })
      .catch((err) => console.log(err));
  }
  function getComments2(id) {
    API.getComments2(id)
      .then((response) => {
        setComments(response.data);
        // commentCount(id);
      })
      .catch((err) => console.log(err));
  }

  function commentCount(id) {
    API.getComments2(id)
      .then((res) => {
        setNumber(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  function deletePost(post) {
    API.deletePost(post)
      .then((res) => {
        getPosts(state.posts);
      })
      .catch((err) => console.log(err));
  }

  const renderRedirect = () => {
    if (state.selecteduser && redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/viewprofile/",
            search: `?${state.selecteduser.username}`,
          }}
        />
      );
    }
  };

  function selectUser(user) {
    console.log(user);
    const selected = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      city: user.city,
      state: user.state,
      image: user.image,
      email: user.email,
      bio: user.bio,
      link: user.link,
    };
    dispatch({
      type: SET_SELECTED_USER,
      selecteduser: selected,
    });
    let localStorageSelectedUser = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      city: user.city,
      state: user.state,
      image: user.image,
      email: user.email,
      bio: user.bio,
      link: user.link,
    };
    window.localStorage.setItem(
      "selecteduser",
      JSON.stringify(localStorageSelectedUser)
    );
    setRedirect(true);
  }

  function getUserLikes(user) {
    console.log("getuserlikes", user);
    API.getUserLikes(user)
      .then((response) => {
        dispatch({
          type: SET_USER_LIKES,
          userlikedposts: response.data,
        });
        window.localStorage.setItem(
          "userlikedposts",
          JSON.stringify(response.data)
        );
      })
      .catch((err) => console.log(err));
  }

  function checkIfLiked(liked, post) {
    for (let i = 0; i < liked.length; i++) {
      if (liked[i].postId === post.id) {
        setLike(true);
        return (
          <span>
            <i className="fas fa-heart"></i>
          </span>
        );
      }
    }
    return (
      <span>
        <i className="far fa-heart"></i>
      </span>
    );
  }

  function updateUserLikes(userId) {
    API.getUserLiked(userId)
      .then((response) => {
        dispatch({
          type: SET_USER_LIKES,
          userlikedposts: response.data,
        });
        window.localStorage.setItem(
          "userlikedposts",
          JSON.stringify(response.data)
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Container>
        <h3>Here is what's happening in the community...</h3>
      </Container>
      <div>
        <ListGroup className="feed--feed">
          {state.posts.length > 0
            ? state.posts.map((post) => {
                return (
                  <ListGroup.Item key={post.id} className="mt-1 feed--postitem">
                    <Row>
                      <Col className="col-3 col-lg-2">
                        {post.User.image !== null ? (
                          <img
                            onClick={() => {
                              selectUser(post.User);
                            }}
                            className="feed--profileimage feed--poster"
                            src={
                              process.env.PUBLIC_URL +
                              `/profileimages/${post.User.image}`
                            }
                          />
                        ) : (
                          <img
                            onClick={() => {
                              selectUser(post.User);
                            }}
                            className="feed--profileimage feed--poster"
                            src={
                              process.env.PUBLIC_URL +
                              `/profileimages/profile-placeholdericon.png`
                            }
                          />
                        )}
                      </Col>
                      <Col className="col-8 col-lg-10">
                        <h6
                          className="text-left"
                          onClick={() => {
                            selectUser(post.User);
                          }}
                        >
                          <strong className="feed--poster">
                            {post.User.username} says:{" "}
                          </strong>

                          {post.post}
                        </h6>
                      </Col>
                    </Row>
                    {post.image1 !== null ? (
                      <img
                        className="feed--image"
                        src={
                          process.env.PUBLIC_URL + `/postimages/${post.image1}`
                        }
                        alt={post.id}
                      />
                    ) : (
                      ""
                    )}
                    <br />
                    <br />
                    {/* <CommentCount
                    id={post}
                    commentCount={commentCount}
                  ></CommentCount> */}
                    {/* {state.loggedin === false ? (
                    <div className="text-left ml-2">
                      <small>{post.number} comments</small>{" "}
                    </div>
                  ) : (
                    ""
                  )} */}
                    {/* {state.currentUser.id !== 0 ? ( */}

                    <FeedComment
                      updateUserLikes={updateUserLikes}
                      checkIfLiked={checkIfLiked}
                      // likePost={likePost}
                      postlikes={likes}
                      post={post}
                      getComments={getComments}
                      getComments2={getComments2}
                      commentCount={commentCount}
                      postnumber={number}
                    ></FeedComment>
                    {/* ) : (
                    ""
                  )} */}
                    <Card.Footer className="mt-2">
                      <small>
                        Posted On:{" "}
                        {dateFormat(
                          `${post.createdAt}`,
                          "dddd, mmmm, dS, yyyy, h:MM TT"
                        )}{" "}
                        {"EST"}
                      </small>
                    </Card.Footer>
                    {state.currentUser.id === post.User.id ? (
                      <button
                        className="feed--delete-btn"
                        onClick={() => {
                          deletePost(post.id);
                        }}
                      >
                        X
                      </button>
                    ) : (
                      ""
                    )}
                  </ListGroup.Item>
                );
              })
            : ""}
        </ListGroup>
      </div>
      {renderRedirect()}
    </div>
  );
}
