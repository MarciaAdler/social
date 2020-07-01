import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function PostToFeed() {
  return (
    <div>
      <Container>
        <Form className="my-3">
          <Row>
            <Col className="col-11">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="posttofeed--post">
                    What's
                    <br /> happening?
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Col>
            <Col className="col-12 col-md-1">
              <Button variant="secondary" className="mt-2 post">
                Post
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
