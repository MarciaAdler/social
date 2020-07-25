import React, { useRef } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

export default function FeedComment({ post }) {
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
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="text-left">
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
          ref={commentRef}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
    </div>
  );
}
