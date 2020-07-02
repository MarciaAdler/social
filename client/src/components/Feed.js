import React, { useEffect } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_POSTS } from "../utils/actions";
import dateFormat from "dateformat";

export default function Feed() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    API.getPosts()
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_POSTS, posts: res.data });
      })
      .catch((err) => console.log(err));
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
                  <h6 className="text-left">
                    {post.User.image !== null ? (
                      <img
                        className="feed--profileimage"
                        src={
                          process.env.PUBLIC_URL +
                          `/profileimages/${post.User.image}`
                        }
                      />
                    ) : (
                      ""
                    )}
                    <strong>{post.User.username} says: </strong>
                    {post.post}
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

                  <p className="text-right">
                    <small>
                      Posted On:{" "}
                      {dateFormat(
                        `${post.createdAt}`,
                        "dddd, mmmm, dS, yyyy, h:MM TT"
                      )}{" "}
                      {"EST"}s{" "}
                    </small>
                  </p>
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </div>
  );
}
