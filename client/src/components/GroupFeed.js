import React, { useEffect, useState } from "react";
import { Container, ListGroup, Card } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import GroupPost from "./GroupPost";
import { SET_GROUP_POSTS, SET_SELECTED_USER } from "../utils/actions";
import API from "../utils/API";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";

export default function GroupFeed() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (state.selectedGroup.id !== 0) {
      getGroupPosts(state.selectedGroup.id);
    } else if (JSON.parse(localStorage.getItem("selectedgroup"))) {
      getGroupPosts(JSON.parse(localStorage.getItem("selectedgroup")));
    }
  }, []);

  function getGroupPosts(selectedGroup) {
    console.log(selectedGroup.id);
    API.getGroupPosts(selectedGroup.id)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_GROUP_POSTS, groupposts: res.data });
      })
      .catch((err) => console.log(err));
  }

  function deletePost(post) {
    API.deletePost(post)
      .then((res) => {
        getGroupPosts(state.selectedGroup.id);
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
        <GroupPost />
      </Container>
      <ListGroup>
        {state.groupposts
          ? state.groupposts.map((post) => {
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

                  {/* {state.currentUser.id !== 0 ? (
                    <FeedComment
                      post={post}
                      getComments={getComments}
                      getComments2={getComments2}
                      commentCount={commentCount}
                    ></FeedComment>
                  ) : (
                    ""
                  )} */}

                  {/* <Comments
                    id={post}
                    comments={comments}
                    getComments={getComments}
                    commentCount={commentCount}
                  ></Comments> */}

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
