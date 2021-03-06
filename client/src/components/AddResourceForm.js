import React, { useState, useRef, Fragment } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Col, Button } from "react-bootstrap";
import API from "../utils/API";
export default function AddResource() {
  const [state, dispatch] = useStoreContext();
  const [doc, setDoc] = useState("");
  const [docname, setDocName] = useState("");
  const docNameRef = useRef();
  const descriptionRef = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  function createDoc(event) {
    event.preventDefault();
    API.createDoc({
      name: docNameRef.current.value,
      document: docname,
      description: descriptionRef.current.value,
      AdminId: state.currentUser.id,
    })
      .then((res) => {
        console.log(res);
        uploadDoc();
        confirmUpload();
        const form = document.getElementById("myForm");
        form.reset();
        setDocName("");
      })
      .catch((err) => console.log(err));
  }
  const onChange = (e) => {
    setDoc(e.target.files[0]);
    const docName = e.target.files[0].name.replace(/\s+/g, "_");
    const name = docNameRef.current.value.replace(/\s+/g, "");
    setDocName(name + "-" + docName);
  };

  function uploadDoc(e) {
    const formData = new FormData();
    formData.append("doc", doc);
    const name = docNameRef.current.value.replace(/\s+/g, "");
    formData.append("name", name);
    API.uploadResource(formData, {
      headers: {
        "Content Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(doc);
        console.log(res.statusText);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function confirmUpload() {
    setSuccessMessage("Document Uploaded");
    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
    }, 1000);
  }
  return (
    <Container className="signupform--wrapper">
      {state.loggedin ? (
        <Form className="text-left" id="myForm">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Document Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Document Name"
              ref={docNameRef}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Document Description</Form.Label>
            <Form.Control as="textarea" rows="3" ref={descriptionRef} />
          </Form.Group>
          <Form.Group></Form.Group>
          <Form.Group>
            <Form.Label>Upload Document</Form.Label>
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
                      {docname}
                    </label>
                  </div>
                </Col>
              </Fragment>
            </Form.Row>
          </Form.Group>
          <Form.Row className="justify-content-end signupform--row">
            <Col className="col-8 signupform--submitbuttoncol">
              <Button
                variant="secondary"
                className="button"
                type="submit"
                onClick={createDoc}
              >
                Upload
              </Button>
            </Col>
            <Col className="col-3">
              <span
                className="addResource--success text-align-left"
                id="success-message"
              >
                {successMessage}
              </span>
            </Col>
          </Form.Row>
          <Form.Row>
            Click&nbsp; <a href="/resources"> here </a>&nbsp; to return to
            Resources.
          </Form.Row>
        </Form>
      ) : (
        ""
      )}
    </Container>
  );
}
