import React, { useRef, useState, useEffect } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function FeedComment({ post, getComments2, getComments }) {
  const [state, dispatch] = useStoreContext();
  const [number, setNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const commentRef = useRef();

  useEffect(() => {
    commentCount(post);
  }, []);

  function addComment(post) {
    API.addComment({
      comment: commentRef.current.value,
      PostId: post,
      CommenterId: state.currentUser.id,
    })
      .then((res) => {
        getComments(post);
        getComments2(post);
        commentCount2(post);
        getComments(post);
        commentRef.current.value = "";
      })
      .catch((err) => console.log(err));
  }
  function commentCount(id) {
    API.getComments(id)
      .then((res) => {
        setNumber(res.data.length);
      })
      .catch((err) => console.log(err));
  }
  function commentCount2(id) {
    API.getComments2(id)
      .then((res) => {
        console.log(res.data.length);
        setNumber(res.data.length);
      })
      .catch((err) => console.log(err));
  }

  // function getComments(id) {
  //   console.log(id);
  //   API.getComments2(id)
  //     .then((response) => {
  //       console.log(response.data);
  //       setComments(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function getComments(id) {
  //   API.getComments(id)
  //     .then((response) => {
  //       setComments(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function getComments2(id) {
  //   API.getComments2(id)
  //     .then((response) => {
  //       setComments(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <div className="text-left">
      <small>{number} Comments</small>

      <Form className="text-left" id="myForm">
        <InputGroup size="sm" className="mb-3 feed--commentinput">
          <InputGroup.Prepend>
            <InputGroup.Text
              type="reset"
              className="feed--submitcomment"
              id="inputGroup-sizing-sm"
              onClick={() => {
                addComment(post.id);
              }}
            >
              Add Comment
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            rows="1"
            ref={commentRef}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            id="myInput"
          />
        </InputGroup>
      </Form>
    </div>
  );
}
