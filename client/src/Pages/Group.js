import React from "react";
import GroupPage from "../components/GroupPage";
import { Button, Container } from "react-bootstrap";
import Chat from "../components/Chat";
export default function Group() {
  return (
    <Container>
      <Chat />
      <div className="text-center mt-5">
        <GroupPage />
      </div>
    </Container>
  );
}
