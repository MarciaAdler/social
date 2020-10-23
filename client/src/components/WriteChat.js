import React, { useRef } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { SET_MESSAGES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

import io from "socket.io-client";
export default function WriteChat() {
  const [state, dispatch] = useStoreContext();
  const socket = io("localhost:8080");
  let messageRef = useRef();

  socket.on("RECIEVE_MESSAGE", function (data) {
    addMessage(data);
  });

  const addMessage = (data) => {
    console.log(data);
    dispatch({ type: SET_MESSAGES, messages: [...state.messages, data] });
    console.log(state.messages);
  };

  const sendMessage = (ev) => {
    ev.preventDefault();
    const message = messageRef.current.value;

    socket.emit(
      "SEND_MESSAGE",
      message
      // sender: state.currentUser.id,
      // receiver: state.selectedchat.id,
    );
  };
  // function getMessages(currentuser, receiver) {
  //   API.getMessages(state.currentUser.id, state.selectedchat.id)
  //     .then((res) => {
  //       console.log(res.data);
  //       dispatch({ type: SET_MESSAGES, messages: res.data });
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function writeMessage() {
  //   API.writeMessage({
  //     message: messageRef.current.value,
  //     sender: state.currentUser.id,
  //     receiver: state.selectedchat.id,
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       // getMessages(state.currentUser.id, state.selectedchat.id);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
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
      <Button className="button mt-2" onClick={sendMessage}>
        Send Message
      </Button>
    </Container>
  );
}
