import React, { useRef, useState, Fragment, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_GROUP_POSTS } from "../utils/actions";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function GroupPost() {
  const [state, dispatch] = useStoreContext();
  const postRef = useRef();
  const [image1, setImage1] = useState("");
  const [image1name, setImage1Name] = useState(null);
  //   useEffect(() => {
  //     if (state.selectedGroup.id !== 0) {
  //       getGroupPosts(state.selectedGroup.id);
  //     } else if (JSON.parse(localStorage.getItem("selectedgroup"))) {
  //       getGroupPosts(JSON.parse(localStorage.getItem("selectedgroup")));
  //     }
  //   }, []);
  function getGroupPosts(selectedGroup) {
    console.log(selectedGroup);
    API.getGroupPosts(selectedGroup)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_GROUP_POSTS, groupposts: res.data });
      })
      .catch((err) => console.log(err));
  }
  function createGroupPost() {
    API.createGroupPost({
      post: postRef.current.value,
      UserId: state.currentUser.id,
      image1: image1name,
      GroupId: state.selectedGroup.id,
    }).then((res) => {
      console.log(res);
      if (image1name) {
        uploadPostImage();
        getGroupPosts(state.selectedGroup.id);
        const form = document.getElementById("myForm");
        form.reset();
        setImage1Name(null);
      } else {
        getGroupPosts(state.selectedGroup.id);
        const form = document.getElementById("myForm");
        form.reset();
      }
    });
  }
  const onChange = (e) => {
    setImage1(e.target.files[0]);
    const groupname = state.selectedGroup.name.replace(" ", "");
    setImage1Name(
      groupname + "-" + state.currentUser.id + "-" + e.target.files[0].name
    );
  };

  function uploadPostImage(e) {
    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("id", state.currentUser.id);
    const groupname = state.selectedGroup.name.replace(" ", "");
    formData.append("groupname", groupname);
    API.uploadGroupPostImage(formData, {
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
                </Fragment>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="col-12 col-md-1">
              <Button className="mt-2 post" onClick={createGroupPost}>
                Post
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
