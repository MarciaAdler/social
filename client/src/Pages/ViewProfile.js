import React from "react";
import { Container } from "react-bootstrap";
import UserProfile from "../components/UserProfile";
import Chat from "../components/Chat";
import { useStoreContext } from "../utils/GlobalState";

export default function Profile() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="home--chat text-center">
      {state.loggedin === true ? <Chat /> : ""}
      <Container className="home--container">
        <UserProfile />
      </Container>
    </Container>
  );
}
