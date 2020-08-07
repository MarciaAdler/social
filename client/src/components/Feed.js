import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  ListGroup,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_POSTS, SET_SELECTED_USER } from "../utils/actions";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import FeedComment from "./FeedComment";
import CommentCount from "./CommentCount";
import Comments from "./Comments";

export default function Feed() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    API.getPosts()
      .then((res) => {
        console.log("getposts", res.data);
        dispatch({ type: SET_POSTS, posts: res.data });
        for (let i = 0; i < state.getPosts.length; i++) {
          const post = state.posts[i];
          getComments(post.id);
        }
      })
      .catch((err) => console.log(err));
  }

  function getComments(id) {
    API.getComments(id)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
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
      <ListGroup>
        {state.posts.length > 0
          ? state.posts.map((post) => {
              return (
                <ListGroup.Item key={post.id}>
                  <h6
                    className="text-left"
                    onClick={() => {
                      selectUser(post.User);
                    }}
                  >
                    <div>
                      {post.User.image !== "" ? (
                        <img
                          className="feed--profileimage feed--poster"
                          src={
                            process.env.PUBLIC_URL +
                            `/profileimages/${post.User.image}`
                          }
                        />
                      ) : (
                        ""
                      )}
                      <strong className="feed--poster">
                        {post.User.username} says:{" "}
                      </strong>

                      {post.post}
                    </div>
                  </h6>

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
                  <CommentCount id={post}></CommentCount>
                  {state.currentUser.id !== 0 ? (
                    <FeedComment
                      post={post}
                      getComments={getComments}
                    ></FeedComment>
                  ) : (
                    ""
                  )}
                  <Comments id={post}></Comments>

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
