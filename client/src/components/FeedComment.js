import React, { useRef, useState, useEffect } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import Comments from "../components/Comments";
export default function FeedComment(props) {
  const [state, dispatch] = useStoreContext();
  const [number, setNumber] = useState(0);
  const [comments, setComments] = useState([]);
  const commentRef = useRef();
  const [postlikes, setPostLikes] = useState(0);
  const [like, setLike] = useState(true);
  let iLike = false;
  useEffect(() => {
    commentCount(props.post);
    getAllLikes(props.post);
  }, [state.userlikedposts]);

  function addComment(post) {
    API.addComment({
      comment: commentRef.current.value,
      PostId: post,
      CommenterId: state.currentUser.id,
    })
      .then((res) => {
        getComments2(props.post);
        // props.getComments2(props.post);
        commentCount2(post);

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

  function getComments3(id) {
    console.log(id);
    API.getComments(id)
      .then((res) => {
        setComments(res.data);
        // commentCount(id);
      })
      .catch((err) => console.log(err));
  }
  function getComments2(id) {
    API.getComments2(id)
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => console.log(err));
  }
  function getAllLikes(post) {
    API.getAllLikes(post.id).then((res) => {
      setPostLikes(res.data.length);
    });
  }
  function likePost(post) {
    if (
      (like === false && iLike === false) ||
      (like === true && iLike === false)
    ) {
      API.likePost({
        userId: state.currentUser.id,
        postId: post,
      })
        .then((res) => {
          setLike(true);

          props.updateUserLikes(state.currentUser);
          getAllLikes(post);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      API.updateLike({
        userId: state.currentUser.id,
        postId: post,
      })
        .then((res) => {
          setLike(false);

          props.updateUserLikes(state.currentUser);
          getAllLikes(post);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function checkIfLiked(liked, post) {
    for (let i = 0; i < liked.length; i++) {
      if (liked[i].postId === post.id) {
        iLike = true;
        return (
          <span>
            <i className="fas fa-heart"></i>
          </span>
        );
      }
    }
    return (
      <span>
        <i className="far fa-heart"></i>
      </span>
    );
  }
  return (
    <div className="text-left">
      <div className="feed--likes">
        <span
          onClick={() => {
            likePost(props.post.id);
          }}
        >
          {checkIfLiked(state.userlikedposts, props.post)}
          &nbsp;
        </span>
        <small>{postlikes} Likes</small> &nbsp;
        <small>{number} Comments</small>
      </div>
      {state.loggedin === true ? (
        <div>
          <Form className="text-left" id="myForm">
            <InputGroup size="sm" className="mb-3 feed--commentinput">
              <InputGroup.Prepend>
                <InputGroup.Text
                  type="reset"
                  className="feed--submitcomment"
                  id="inputGroup-sizing-sm"
                  onClick={() => {
                    addComment(props.post.id);
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
          <Comments
            id={props.post}
            // getComments={props.getComments}
            getComments2={getComments2}
            commentCount={commentCount}
            number={number}
            comments={comments}
          ></Comments>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
