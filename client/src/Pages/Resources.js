import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
import Resource from "../components/Resource";
import Chat from "../components/Chat";
export default function Resources() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="home--chat">
      {state.loggedin === true ? <Chat /> : ""}
      <Container className="resource--container">
        {state.loggedin === true ? (
          <div>
            Click <a href="/addresource">here</a> to add a new document
            <Resource />
          </div>
        ) : (
          <Resource />
        )}
      </Container>
    </Container>
  );
}
