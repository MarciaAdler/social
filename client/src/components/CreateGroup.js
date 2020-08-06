import React, { Fragment, useState, useRef } from "react";
import { Container, Form, Col, Button } from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_GROUPS } from "../utils/actions";
export default function CreateGroup() {
  const [state, dispatch] = useStoreContext();
  const [image, setImage] = useState("");
  const [imagename, setImageName] = useState("no image");
  const nameRef = useRef();
  const descriptionRef = useRef();

  function createGroup(event) {
    event.preventDefault();
    API.createGroup({
      name: nameRef.current.value,
      image: imagename,
      description: descriptionRef.current.value,
      AdminId: state.currentUser.id,
    })
      .then((res) => {
        console.log(res);
        uploadGroupImage();
        setGroups();
      })
      .catch((err) => console.log(err));
  }
  function setGroups() {
    API.setGroups().then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_GROUPS,
        groups: res.data,
      }).catch((err) => console.log(err));
    });
  }
  const onChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(nameRef.current.value + "-" + e.target.files[0].name);
  };

  function uploadGroupImage(e) {
    if (imagename !== "no image") {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("groupname", nameRef.current.value);
      API.uploadGroupImage(formData, {
        headers: {
          "Content Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(image);
          console.log(res.statusText);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Container className="signupform--wrapper">
      <Form className="text-left" id="myForm">
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Group Name</Form.Label>
          <Form.Control type="text" placeholder="Group Name" ref={nameRef} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Group Description</Form.Label>
          <Form.Control as="textarea" rows="3" ref={descriptionRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Row className="text-left">
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
                    {imagename}
                  </label>
                </div>
              </Col>
            </Fragment>
          </Form.Row>
        </Form.Group>
        <Form.Row className="justify-content-center signupform--row">
          <Col className="col-8 signupform--submitbuttoncol">
            <Button
              variant="secondary"
              className="button"
              type="submit"
              onClick={createGroup}
            >
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}
