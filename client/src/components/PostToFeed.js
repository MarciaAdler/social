import React, { Fragment, useRef, useEffect, useState } from "react";
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
  const [image1, setImage1] = useState("");
  const [image1name, setImage1Name] = useState(null);

  useEffect(() => {
    getPosts(state.posts);
  }, []);
  function getPosts() {
    API.getPosts()
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
      image1: image1name,
    }).then((res) => {
      if (image1name) {
        uploadPostImage();
        getPosts(res);
        const form = document.getElementById("myForm");
        form.reset();
        setImage1Name(null);
      } else {
        getPosts(res);
        const form = document.getElementById("myForm");
        form.reset();
      }
    });
  }
  const onChange = (e) => {
    setImage1(e.target.files[0]);
    const name = e.target.files[0].name.replace(" ", "_");

    setImage1Name(state.currentUser.id + "-" + name);
  };
  function uploadPostImage(e) {
    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("id", state.currentUser.id);
    API.uploadPostImage(formData, {
      headers: {
        "Content Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(image1);
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Container>
        <Form className="my-3" id="myForm">
          <Row>
            <Col className="col-12">
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
          </Row>
          <Row>
            <Col className="col-12 col-md-8 text-left">
              <label className="mt-2">Upload Image</label>
              <Row>
                <Fragment>
                  <Col className="col-8">
                    <div className="custom-file mb-4">
                      <input
                        type="file"
                        onChange={onChange}
                        className="custom-file-input"
                        id="customFile"
                      />

                      <label className="custom-file-label" htmlFor="customFile">
                        {image1name}
                      </label>
                    </div>
                  </Col>
                  <Col className="col-2">
                    {/* <Button
                      type="button"
                      className="profileform--upload-button ml-3"
                      onClick={uploadPostImage}
                    >
                      Upload
                    </Button> */}
                  </Col>
                </Fragment>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-1">
              <Button className="mt-2 post" onClick={createPost}>
                Post
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
