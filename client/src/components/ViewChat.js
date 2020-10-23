import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_MESSAGES } from "../utils/actions";
import API from "../utils/API";
export default function ViewChat(props) {
  // function getMessages(currentuser, receiver) {
  //   API.getMessages(state.currentUser.id, state.selectedchat.id)
  //     .then((res) => {
  //       console.log(res.data);
  //       dispatch({ type: SET_MESSAGES, messages: res.data });
  //     })
  //     .catch((err) => console.log(err));
  // }
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="chat--viewchat mt-2">
      <div>
        {state.messages.length > 0
          ? state.messages.map((message) => {
              return <div>{message}</div>;
            })
          : " no messages"}
      </div>
    </Container>
  );
}
