import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
import AddResource from "../components/AddResource";
import Chat from "../components/Chat";
export default function Resources() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="home--chat">
      {state.loggedin === true ? <Chat /> : ""}
      <Container className="home--container">
        <AddResource />
      </Container>
    </Container>
  );
}
