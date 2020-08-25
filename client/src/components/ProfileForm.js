import React, { useEffect, useRef, useState, Fragment } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_CURRENT_USER } from "../utils/actions";
export default function ProfileForm() {
  const [state, dispatch] = useStoreContext();
  const nameRef = useRef();
  const usernameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const emailRef = useRef();
  const bioRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState("");
  const [imagename, setImageName] = useState(state.currentUser.image);

  function updateProfile(profile) {
    API.updateProfile({
      id: state.currentUser.id,
      username: usernameRef.current.value,
      firstName: nameRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      email: emailRef.current.value,
      image: imagename,
      bio: bioRef.current.value,
    })
      .then((response) => {
        console.log(response.data);
        if (image !== "") {
          uploadProfileImage();
          refreshUser();
          confirmUpdate();
        } else {
          refreshUser();
          confirmUpdate();
        }
      })
      .catch((err) => console.log(err));
  }
  function refreshUser() {
    API.refreshCurrentUser(state.currentUser.id)
      .then((results) => {
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
            firstName: results.data.firstName,
            city: results.data.city,
            state: results.data.state,
            email: results.data.email,
            image: results.data.image,
            bio: results.data.bio,
          },
        });
        let localStorageUser = {
          id: results.data.id,
          username: results.data.username,
          firstName: results.data.firstName,
          city: results.data.city,
          state: results.data.state,
          email: results.data.email,
          image: results.data.image,
          bio: results.data.bio,
        };
        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(localStorageUser)
        );

        // uploadProfileImage();
      })
      .catch((err) => console.log(err));
  }
  function confirmUpdate() {
    setSuccessMessage("Profile Updated");
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 1000);
  }
  const onChange = (e) => {
    setImage(e.target.files[0]);
    const name = e.target.files[0].name.replace(" ", "_");
    setImageName(usernameRef.current.value + "-" + name);
  };

  function uploadProfileImage(e) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", usernameRef.current.value);
    API.uploadProfileImage(formData, {
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

  return (
    <div>
      <Container className="profileform--wrapper">
        {state.currentUser.id !== 0 ? (
          <Form>
            <Form.Group as={Row} className="justify-content-center">
              <Form.Label column sm={3}>
                Username
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  name="username"
                  ref={usernameRef}
                  defaultValue={state.currentUser.username}
                ></Form.Control>
              </Col>
            </Form.Group>
            {state.currentUser.image !== "" ? (
              <h3>
                <img
                  className="profileform--profileimage"
                  src={
                    process.env.PUBLIC_URL +
                    `/profileimages/${state.currentUser.image}`
                  }
                />
              </h3>
            ) : (
              "Please upload a profile image"
            )}

            <Form.Group as={Row} className="d-flex justify-content-center">
              <Fragment>
                <Col className="col-md-10 col-sm-12 profileform--uploadimage">
                  <div className="custom-file mb-3">
                    <input
                      type="file"
                      onChange={onChange}
                      className="custom-file-input"
                      id="customFile"
                    />
                    {imagename != "" ? (
                      <label className="custom-file-label" htmlFor="customFile">
                        {imagename}
                      </label>
                    ) : (
                      <label className="custom-file-label" htmlFor="customFile">
                        {state.currentUser.image}
                      </label>
                    )}
                  </div>
                </Col>
              </Fragment>
            </Form.Group>
            <Form.Group as={Row} className="justify-content-center">
              <Form.Label column sm={3}>
                First Name
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  name="firstName"
                  ref={nameRef}
                  defaultValue={state.currentUser.firstName}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="justify-content-center">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="text"
                  name="email"
                  ref={emailRef}
                  defaultValue={state.currentUser.email}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Row className="justify-content-center">
              <div className="profileform--city-state">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    defaultValue={state.currentUser.city}
                    ref={cityRef}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    defaultValue={state.currentUser.state}
                    ref={stateRef}
                  ></Form.Control>
                </Form.Group>
              </div>
            </Form.Row>
            <Form.Row className="justify-content-center">
              <div className="profileform--city-state">
                <Form.Group as={Col}>
                  <Form.Label>About Me:</Form.Label>
                  <Form.Control
                    className="profileform--bio"
                    as="textarea"
                    rows="5"
                    ref={bioRef}
                    defaultValue={state.currentUser.bio}
                  />
                </Form.Group>
              </div>
            </Form.Row>
            <Button
              className="button"
              onClick={() => {
                updateProfile(state.currentUser.id);
              }}
            >
              Update
            </Button>
            <span className="profileform--success" id="success-message">
              {successMessage}
            </span>
          </Form>
        ) : (
          "Please Signin"
        )}
      </Container>
    </div>
  );
}
