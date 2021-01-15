import React, { useEffect, useState } from "react";
import API from "../utils/API";
import { Button, Collapse } from "react-bootstrap";
import dateFormat from "dateformat";
import { useStoreContext } from "../utils/GlobalState";

export default function Comments(props) {
  const [state, dispatch] = useStoreContext();
  const [collapse, setCollapse] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    props.commentCount(props.id);
    getComments(props.id);
  }, []);

  // function getComments(id) {
  //   console.log(id);
  //   API.getComments(id)
  //     .then((response) => {
  //       console.log(response.data);
  //       setComments(response.data);
  //       commentCount(id.id);
  //     })
  //     .catch((err) => console.log(err));
  // }

  function getComments(id) {
    console.log(id);
    API.getComments(id)
      .then((res) => {
        setComments(res.data);
        // commentCount(id);
      })
      .catch((err) => console.log(err));
  }
  // function getComments2(id) {
  //   API.getComments2(id)
  //     .then((response) => {
  //       console.log(response.data);
  //       setComments(response.data);
  //       commentCount(id);
  //     })
  //     .catch((err) => console.log(err));
  // }
  function deleteComment(comment) {
    API.deleteComment(comment)
      .then((res) => {
        console.log(props.id);
        getComments(props.id);
        props.commentCount(props.id);
      })
      .catch((err) => console.log(err));
  }
  // function commentCount(id) {
  //   API.getComments2(id)
  //     .then((res) => {
  //       console.log(res.data.length);
  //       setNumber(res.data.length);
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div className="text-left">
      {collapse === false ? (
        <Button
          className="comments--button"
          // onClick={() => setCollapse(true)}
          aria-controls="example-collapse-text"
          aria-expanded={collapse}
          onClick={() => {
            getComments(props.id);

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
