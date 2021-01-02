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
        const form = document.getElementById("myForm");
        form.reset();
      })
      .catch((err) => console.log(err));
  }
  const onChange = (e) => {
    setDoc(e.target.files[0]);
    const name = docNameRef.current.value.replace(" ", "");
    setDocName(name + "-" + e.target.files[0].name);
  };

  function uploadDoc(e) {
    const formData = new FormData();
    formData.append("doc", doc);
    const name = docNameRef.current.value.replace(" ", "");
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
          <Form.Row className="justify-content-center signupform--row">
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
          </Form.Row>
        </Form>
      ) : (
        ""
      )}
    </Container>
  );
}
