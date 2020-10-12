import React, { useRef } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";

export default function WriteChat() {
  const messageRef = useRef();

  function writeMessage() {
    console.log(messageRef.current.value);
  }
  return (
    <Container className="chat--writechat">
      <InputGroup>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          ref={messageRef}
          placeholder="Write message here"
        />
      </InputGroup>
      <Button className="button mt-2" onClick={writeMessage}>
        Send Message
      </Button>
    </Container>
  );
}
