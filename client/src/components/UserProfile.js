import React, { useEffect, useState } from "react";
import { Container, ListGroup, Card, Row, Col } from "react-bootstrap";
import { SET_SELECTED_USER, SET_POSTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";

export default function UserProfile() {
  const [state, dispatch] = useStoreContext();
  const [userPosts, setUserPosts] = useState([]);

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

      <p>
        <strong>About Me: </strong>
        {state.selecteduser.bio}
      </p>

      <Row className="justify-content-center">
        {userPosts.length > 0
          ? userPosts.map((post) => {
              return (
                <Col className="col-12 col-md-4 col-sm-12 mt-2" key={post.id}>
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

                    <Card.Footer>
                      <small>
                        Posted On:{" "}
                        {dateFormat(
                          `${post.createdAt}`,
                          "dddd, mmmm, dS, yyyy, h:MM TT"
                        )}{" "}
                        {"EST"}
                      </small>
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
