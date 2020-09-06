import React from "react";
import GroupPage from "../components/GroupPage";
import { Button, Container } from "react-bootstrap";
import Chat from "../components/Chat";
import { useStoreContext } from "../utils/GlobalState";

export default function Group() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      {state.currentUser.id !== 0 ? <Chat /> : ""}

      <Container className="text-center mt-5 home--container">
        <GroupPage />
      </Container>
    </div>
  );
}
