import React from "react";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";

export default function ViewChat() {
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
