import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Container, Button, Collapse } from "react-bootstrap";
import dateFormat from "dateformat";
import { useStoreContext } from "../utils/GlobalState";

export default function GroupPostComments(props) {
  const [state, dispatch] = useStoreContext();
  const [collapse, setCollapse] = useState(false);
  const [comments, setComments] = useState([]);

  function deleteGroupComment(comment) {
    API.deleteGroupComment(comment)
      .then((res) => {
        getGroupComments(props.id.id);
        props.groupCommentCount(props.id.id);
      })
      .catch((err) => console.log(err));
  }

  function getGroupComments(post) {
    console.log(post);
    API.getGroupComments(post)
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container className="text-left">
      {collapse === false ? (
        <Button
          className="comments--button"
          // onClick={() => setCollapse(true)}
          aria-controls="example-collapse-text"
          aria-expanded={collapse}
          onClick={() => {
            getGroupComments(props.id.id);

            setCollapse(true);
          }}
        >
          View Comments
        </Button>
      ) : (
        <Button
          className="comments--button mb-3"
          onClick={() => setCollapse(false)}
          aria-controls="example-collapse-text"
          aria-expanded={collapse}
        >
          Hide Comments
        </Button>
      )}

      {comments
        ? comments.map((comment) => {
            return (
              <Collapse in={collapse} key={comment.id}>
                <div className="text-left" key={comment.id}>
                  {comment.Commenter.image !== null ? (
                    <img
                      className="comments--profileimage mr-2"
                      src={
                        process.env.PUBLIC_URL +
                        `/profileimages/${comment.Commenter.image}`
                      }
                      alt="Profile Image"
                    />
                  ) : (
                    <img
                      className="comments--profileimage mr-2"
                      src={
                        process.env.PUBLIC_URL +
                        `/profileimages/profile-placeholdericon.png`
                      }
                      alt="Profile Image"
                    />
                  )}
                  {comment.Commenter.username} commented "{comment.comment}"
                  <br />
                  <small>
                    Posted On:{" "}
                    {dateFormat(
                      `${comment.createdAt}`,
                      "dddd, mmmm, dS, yyyy, h:MM TT"
                    )}{" "}
                    {"EST"}
                  </small>
                  {state.currentUser.id === comment.Commenter.id ? (
                    <button
                      className="comments--delete-btn"
                      onClick={() => {
                        deleteGroupComment(comment.id);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}
                  <hr />
                </div>
              </Collapse>
            );
          })
        : ""}
    </Container>
  );
}
