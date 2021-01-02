import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
import AddResourceForm from "../components/AddResourceForm";
import Chat from "../components/Chat";
export default function Resources() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="home--chat">
      {state.loggedin === true ? <Chat /> : ""}
      <Container className="home--container">
        <AddResourceForm />
      </Container>
    </Container>
  );
}
