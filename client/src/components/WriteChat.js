import React, { useRef } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { SET_MESSAGES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";

export default function WriteChat() {
  const [state, dispatch] = useStoreContext();
  const messageRef = useRef();

  function writeMessage() {
    state.messages.push(messageRef.current.value);
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
