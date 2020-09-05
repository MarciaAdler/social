import React, { useState, useRef, Fragment, useEffect } from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import API from "../utils/API";
import { SET_SELECTED_GROUP, SET_GROUPS } from "../utils/actions";
import { Link, Redirect } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
export default function EditGroupProfile() {
  const [state, dispatch] = useStoreContext();
  const [image, setImage] = useState("");
  const [imagename, setImageName] = useState(state.selectedGroup.image);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    loadRequest(window.location.search);
  }, []);

  function loadRequest(url) {
    console.log("From loadRequest function: ");
    console.log(url);

    if (state.selectedGroup.id === 0) {
      API.getPageFromURL(url.replace("?", ""))
        .then((res) => {
          console.log("res", res);
          const selectedGroup = {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            image: res.data.image,
            adminId: res.data.AdminId,
            adminUsername: res.data.Admin.username,
          };
          dispatch({
            type: SET_SELECTED_GROUP,
            selectedGroup: selectedGroup,
          });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_SELECTED_GROUP,
        selectedGroup: state.selectedGroup,
      });
    }
  }

  const onChange = (e) => {
    setImage(e.target.files[0]);
    const name = state.selectedGroup.name.replace(/\s+/g, "_");
    const fileName = e.target.files[0].name.replace(/\s+/g, "_");
    setImageName(name + "-" + fileName);
  };

  function updateImageName(e) {
    API.updateImageName({
      id: state.selectedGroup.id,
      image: imagename,
    })
      .then((res) => {
        console.log(res.data);
        refreshGroup(state.selectedGroup.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function uploadGroupImage(e) {
    if (imagename !== "no image" || imagename !== "") {
      const formData = new FormData();
      formData.append("image", image);
      const name = state.selectedGroup.name.replace(/\s+/g, "_");
      formData.append("groupname", name);
      API.uploadGroupImage(formData, {
        headers: {
          "Content Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(image);
          updateImageName(state.selectedGroup.id);
          console.log(res.statusText);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function updateGroup(event) {
    event.preventDefault();
    API.updateGroup({
      id: state.selectedGroup.id,
      name: state.selectedGroup.name,
      description: descriptionRef.current.value,
      adminId: state.currentUser.id,
      adminUsername: state.currentUser.username,
    })
      .then((res) => {
        console.log(res);

        refreshGroup();
      })
      .catch((err) => console.log(err));
  }
  function refreshGroup() {
    API.refreshGroup(state.selectedGroup.id)
      .then((res) => {
        dispatch({
          type: SET_SELECTED_GROUP,
          selectedGroup: {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            image: res.data.image,
            adminId: res.data.AdminId,
            adminUsername: state.currentUser.username,
          },
        });
        let localStorageGroup = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          image: res.data.image,
          adminId: res.data.AdminId,
          adminUsername: state.currentUser.username,
        };
        window.localStorage.setItem(
          "selectedgroup",
          JSON.stringify(localStorageGroup)
        );
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Container className="signupform--wrapper">
        <Form className="text-left" id="myForm">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Group Name</Form.Label>
            <div className="editgroup--name">{state.selectedGroup.name}</div>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Group Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              ref={descriptionRef}
              defaultValue={state.selectedGroup.description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Row className="text-left">
              <Fragment>
                <Col className="col-12 col-lg-8">
                  <div className="custom-file mb-4">
                    <input
                      type="file"
                      onChange={onChange}
                      className="custom-file-input"
                      id="customFile"
                    />
                    {imagename === "" ? (
                      <label className="custom-file-label" htmlFor="customFile">
                        {state.selectedGroup.image}
                      </label>
                    ) : (
                      <label className="custom-file-label" htmlFor="customFile">
                        {imagename}
                      </label>
                    )}
                  </div>
                </Col>
                <Col className="col-12 col-lg-4">
                  <Button
                    className="editgroup--upload"
                    onClick={uploadGroupImage}
                  >
                    Upload Image
                  </Button>
                  <small className="ml-2">
                    (Be sure to click upload image button to upload your image)
                  </small>
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
                onClick={updateGroup}
              >
                Update
              </Button>
              <Link
                className="ml-3 editgroup--link"
                to={{
                  pathname: "/group/",
                  search: `?${state.selectedGroup.name}`,
                }}
              >
                Return to group page
              </Link>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    </div>
  );
}
