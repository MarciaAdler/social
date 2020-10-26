import React, { useEffect, useState } from "react";
import {
  Container,
  ListGroup,
  Card,
  Row,
  Col,
  Button,
  ButtonToolbar,
} from "react-bootstrap";
import { SET_SELECTED_USER, SET_POSTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";
import FeedComment from "./FeedComment";
import Comments from "./Comments";

export default function UserProfile() {
  const [state, dispatch] = useStoreContext();
  const [userPosts, setUserPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    loadRequest(window.location.search);
    getSelectedUserPosts(state.selecteduser.id);
  }, []);

  function loadRequest(url) {
    console.log("From loadRequest function: ");
    console.log(url);

    if (state.selecteduser.id === 0) {
      API.getRequestFromURL(url.replace("?", ""))
        .then((res) => {
          console.log(res);
          const selectedUser = {
            id: res.data.id,
            username: res.data.username,
            firstName: res.data.firstName,
            city: res.data.city,
            state: res.data.state,
            image: res.data.image,
            email: res.data.email,
            bio: res.data.bio,
            link: res.data.link,
          };
          dispatch({
            type: SET_SELECTED_USER,
            selecteduser: selectedUser,
          });
          getSelectedUserPosts(res.data.id);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_SELECTED_USER,
        selecteduser: state.selecteduser,
      });
    }
  }
  function getSelectedUserPosts(user) {
    API.getUserPosts(user).then((res) => {
      console.log(res);
      setUserPosts(res.data);
    });
  }
  function deletePost(post) {
    API.deletePost(post)
      .then((res) => {
        getSelectedUserPosts(state.selecteduser.id);
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
  function getComments(id) {
    console.log(id);
    API.getComments(id)
      .then((response) => {
        console.log(response.data);
        setComments(response.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container className="text-align-left">
      <h4>{state.selecteduser.username}</h4>
      {state.selecteduser.image !== "" ? (
        <img
          className="profileform--profileimage"
          src={
            process.env.PUBLIC_URL +
            `/profileimages/${state.selecteduser.image}`
          }
        />
      ) : (
        ""
      )}
      <h6 className="mt-2">{state.selecteduser.firstName}</h6>
      <h6>
        {state.selecteduser.city}, {state.selecteduser.state}
      </h6>
      <p className="text-left">
        <strong>About Me: </strong>
        {state.selecteduser.bio}
      </p>
      <p className="text-left">link: <a target="_blank" href={state.selecteduser.link}>{state.selecteduser.link}</a></p>
      <p className="text-left">
        <strong>
          What is {state.selecteduser.username} saying on the feed:
        </strong>
      </p>
      <Row className="justify-content-left">
        {userPosts.length > 0
          ? userPosts.map((post) => {
              return (
                <Col className="col-12 col-md-6 col-sm-12 mt-2" key={post.id}>
                  <Card className="userprofile--card">
                    <h6 className="userprofile--post">{post.post}</h6>
                    <Card.Body className="userprofile--cardbody">
                      {post.image1 !== null ? (
                        <img
                          className="userprofile--postimage mx-auto"
                          src={
                            process.env.PUBLIC_URL +
                            `/postimages/${post.image1}`
                          }
                          alt={post.image1}
                        />
                      ) : (
                        ""
                      )}
                    </Card.Body>
                    <Card.Body className="userprofile--cardbody2">
                      <small>
                        <FeedComment post={post} getComments2={getComments2} />

                        <span>Scroll to view comments</span>
                        <Comments
                          id={post}
                          getComments2={getComments2}
                          getComments={getComments}
                          commentCount={commentCount}
                          comments={comments}
                        />
                      </small>
                    </Card.Body>
                    <Card.Footer className="userprofile--cardfooter">
                      <small>
                        Posted On:{" "}
                        {dateFormat(
                          `${post.createdAt}`,
                          "dddd, mmmm, dS, yyyy, h:MM TT"
                        )}{" "}
                        {"EST"}
                      </small>
                      {state.selecteduser.id === state.currentUser.id ? (
                        <span
                          className="userprofile--delete-post"
                          onClick={() => {
                            deletePost(post.id);
                          }}
                        >
                          x
                        </span>
                      ) : (
                        ""
                      )}
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
          : "no posts"}
      </Row>
    </Container>
  );
}
