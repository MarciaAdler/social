import React, { useRef, useEffect } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_POSTS } from "../utils/actions";

export default function PostToFeed() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  useEffect(() => {
    getPosts(state.posts);
  }, []);
  function getPosts(posts) {
    API.getPosts(posts)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_POSTS, posts: res.data });
      })
      .catch((err) => console.log(err));
  }
  function createPost(event) {
    API.createPost({
      post: postRef.current.value,
      UserId: state.currentUser.id,
    }).then((res) => {
      getPosts(res);
      const form = document.getElementById("myForm");
      form.reset();
    });
  }
  return (
    <div>
      <Container>
        <Form className="my-3" id="myForm">
          <Row>
            <Col className="col-11">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="posttofeed--post">
                    What's
                    <br /> happening?
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  ref={postRef}
                />
              </InputGroup>
            </Col>
            <Col className="col-12 col-md-1">
              <Button
                variant="secondary"
                className="mt-2 post"
                onClick={createPost}
              >
                Post
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
