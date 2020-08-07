import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Button, Collapse } from "react-bootstrap";
import dateFormat from "dateformat";
import { useStoreContext } from "../utils/GlobalState";

export default function Comments({ id }) {
  const [state, dispatch] = useStoreContext();
  const [comments, setComments] = useState([]);
  const [collapse, setCollapse] = useState(false);
  // useEffect(() => {
  //   getComments(id);
  // }, []);

  function getComments(id) {
    API.getComments(id)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }

  function deleteComment(comment) {
    API.deleteComment(comment)
      .then((res) => {
        getComments(id);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="text-left">
      {collapse === false ? (
        <Button
          className="comments--button"
          onClick={() => setCollapse(true)}
          aria-controls="example-collapse-text"
          aria-expanded={collapse}
        >
          View Comments
        </Button>
      ) : (
        <Button
          className="comments--button"
          onClick={() => setCollapse(false)}
          aria-controls="example-collapse-text"
          aria-expanded={collapse}
        >
          Hide Comments
        </Button>
      )}
      {comments.length > 0
        ? comments.map((comment) => {
            return (
              <Collapse in={collapse} key={comment.id}>
                <div className="text-left" key={comment.id}>
                  <img
                    className="comments--profileimage"
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
                        deleteComment(comment.id);
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
    </div>
  );
}
