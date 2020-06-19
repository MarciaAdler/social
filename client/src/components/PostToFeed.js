import React from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";

export default function PostToFeed() {
  return (
    <div>
      <Container>
        <Form className="my-5">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>What's happening?</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" aria-label="With textarea" />
          </InputGroup>
          <Button>Post</Button>
        </Form>
      </Container>
    </div>
  );
}
