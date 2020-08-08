import React, { useRef, useState, Fragment } from "react";
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

  function createGroupPost() {}
  const onChange = (e) => {
    setImage1(e.target.files[0]);
    setImage1Name(state.currentUser.id + "-" + e.target.files[0].name);
  };
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
              <Button
                variant="secondary"
                className="mt-2 post"
                onClick={createGroupPost}
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
