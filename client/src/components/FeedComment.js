import React, { useRef, useState, useEffect } from "react";
import { InputGroup, FormControl, Collapse, Form } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function FeedComment({ post, getComments }) {
  const [state, dispatch] = useStoreContext();
  const commentRef = useRef();

  function addComment(post) {
    console.log(post);
    API.addComment({
      comment: commentRef.current.value,
      PostId: post,
      CommenterId: state.currentUser.id,
    })
      .then((res) => {
        getComments(post);
        document.getElementById("myInput").value = "";
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form className="text-left" id="myForm">
      <InputGroup size="sm" className="mb-3 feed--commentinput">
        <InputGroup.Prepend>
          <InputGroup.Text
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
  );
}
