import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Container, Button, Collapse } from "react-bootstrap";
import dateFormat from "dateformat";
import { useStoreContext } from "../utils/GlobalState";

export default function GroupPostComments(props) {
  const [state, dispatch] = useStoreContext();
  const [collapse, setCollapse] = useState(false);
  const [comments, setComments] = useState([]);

  return (
    <Container className="text-left">
      {collapse === false ? (
        <Button
          className="comments--button"
          // onClick={() => setCollapse(true)}
          aria-controls="example-collapse-text"
          aria-expanded={collapse}
          onClick={() => {
            props.getGroupComments(props.id.id);

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

      {props.comments
        ? props.comments.map((comment) => {
            return (
              <Collapse in={collapse} key={comment.id}>
                <div className="text-left" key={comment.id}>
                  <img
                    className="comments--profileimage mr-2"
                    src={
                      process.env.PUBLIC_URL +
                      `/profileimages/${comment.Commenter.image}`
                    }
                  />
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
                        // deleteComment(comment.id);
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
