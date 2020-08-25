import React, { useRef, useState } from "react";
import { Container, Form, InputGroup, FormControl } from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";

export default function GroupComment({ post }) {
  const [state, dispatch] = useStoreContext();
  const [number, setNumber] = useState([]);
  const commentRef = useRef();

  function addGroupComment(post) {
    API.addGroupComment({
      comment: commentRef.current.value,
      PostId: post,
      CommenterId: state.currentUser.id,
    })
      .then((res) => {
        commentRef.current.value = "";
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container>
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
                  addGroupComment(post.id);
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
    </Container>
  );
}
