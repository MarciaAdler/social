import React, { useEffect, useState } from "react";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Card,
  
} from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_POSTS, SET_SELECTED_USER } from "../utils/actions";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import FeedComment from "./FeedComment";

import Comments from "./Comments";

export default function Feed() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [comments, setComments] = useState([]);
  const [number, setNumber] = useState(0);

  // let commentcount = 0;

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    API.getPosts()
      .then((res) => {
        console.log(res.data);
        dispatch({ type: SET_POSTS, posts: res.data });
        res.data.map((post) => {
          getComments2(post.id);
          API.getComments2(post.id).then((response) => {
            post["number"] = response.data.length;
          });
        });
      })
      .catch((err) => console.log(err));
  }

  function getComments(id) {
    console.log(id);
    API.getComments(id)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((err) => console.log(err));
  }
  function getComments2(id) {
    console.log(id);
    API.getComments2(id)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
        // commentCount(id);
      })
      .catch((err) => console.log(err));
  }

  function commentCount(id) {
    API.getComments2(id)
      .then((res) => {
        console.log(res.data.length);
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
      link: user.link
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

  return (
    <div>
      <Container>
        <h3>Here is what's happening in the neighborhood...</h3>
      </Container>
      <ListGroup className="feed--feed">
        {state.posts.length > 0
          ? state.posts.map((post) => {
              return (
                <ListGroup.Item key={post.id} className="mt-1 feed--postitem">
                  <Row>
                    <Col className="col-3 col-lg-2">
                      {post.User.image !== "" ? (
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
                        ""
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
                  {state.loggedin === false ? (
                    <div className="text-left ml-2">
                      <small>{post.number} comments</small>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                  {state.currentUser.id !== 0 ? (
                    <FeedComment
                      post={post}
                      getComments={getComments}
                      getComments2={getComments2}
                      commentCount={commentCount}
                    ></FeedComment>
                  ) : (
                    ""
                  )}

                  <Comments
                    id={post}
                    comments={comments}
                    getComments={getComments}
                    getComments2={getComments2}
                    commentCount={commentCount}
                  ></Comments>

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
      {renderRedirect()}
    </div>
  );
}
