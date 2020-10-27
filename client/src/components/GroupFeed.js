import React, { useEffect, useState } from "react";
import { Container, ListGroup, Card, Col, Row } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import GroupPost from "./GroupPost";
import GroupComment from "./GroupComment";
import GroupPostComments from "./GroupPostComments";
import { SET_GROUP_POSTS, SET_SELECTED_USER } from "../utils/actions";
import API from "../utils/API";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";

export default function GroupFeed() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [comments, setComments] = useState([]);
  const [number, setNumber] = useState(0);

  // useEffect(() => {
  //   if (state.selectedGroup.id !== 0) {
  //     getGroupPosts(state.selectedGroup.id);
  //   } else if (JSON.parse(localStorage.getItem("selectedgroup"))) {
  //     getGroupPosts(JSON.parse(localStorage.getItem("selectedgroup")));
  //   }
  // }, []);

  function getGroupPosts(selectedGroup) {
    console.log(selectedGroup);
    API.getGroupPosts(selectedGroup)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_GROUP_POSTS, groupposts: res.data });
        res.data.map((post) => {
          getGroupComments(post.id);
        });
      })
      .catch((err) => console.log(err));
  }

  function deleteGroupPost(post) {
    API.deleteGroupPost(post)
      .then((res) => {
        getGroupPosts(state.selectedGroup.id);
      })
      .catch((err) => console.log(err));
  }

  function getGroupComments(post) {
    console.log(post);
    API.getGroupComments(post)
      .then((res) => {
        console.log(res);
        setComments(res.data);
        setNumber(res.data.length);
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
  return (
    <div>
      {state.currentUser.id !== 0 ? (
        <Container>
          <GroupPost />
        </Container>
      ) : (
        ""
      )}
      <ListGroup className="feed--feed">
        {state.groupposts
          ? state.groupposts.map((post) => {
              return (
                <ListGroup.Item key={post.id}>
                  <Row>
                    <Col className="col-3 col-lg-2">
                      {post.User.image !== "" ? (
                        <img
                          onClick={() => {
                            selectUser(post.User);
                          }}
                          className="feed--profileimage mr-2 feed--poster"
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
                        className="text-left mt-2"
                        onClick={() => {
                          selectUser(post.User);
                        }}
                      >
                        <strong className="feed--poster">
                          {post.User.username} says:{" "}
                        </strong>

                        <div className="feed--post">{post.post}</div>
                      </h6>
                    </Col>
                  </Row>

                  {post.image1 !== null ? (
                    <img
                      className="feed--image"
                      src={
                        process.env.PUBLIC_URL +
                        `/grouppostimages/${post.image1}`
                      }
                      alt={post.id}
                    />
                  ) : (
                    ""
                  )}
                  <br />
                  <br />

                  {state.currentUser.id !== 0 ? (
                    <GroupComment
                      post={post}
                      getGroupComments={getGroupComments}
                      number={number}
                      comments={comments}
                      // getComments2={getComments2}
                      // commentCount={commentCount}
                    ></GroupComment>
                  ) : (
                    ""
                  )}

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
                        deleteGroupPost(post.id);
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
