import React from "react";
import GroupPage from "../components/GroupPage";
import { Button, Container } from "react-bootstrap";
import Chat from "../components/Chat";
import { useStoreContext } from "../utils/GlobalState";

export default function Group() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container>
      {state.currentUser.id !== 0 ? <Chat /> : ""}

      <div className="text-center mt-5">
        <GroupPage />
      </div>
    </Container>
  );
}
