import React, { useEffect } from "react";
import Feed from "../components/Feed";
import PostToFeed from "../components/PostToFeed";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_USER, LOGGEDIN } from "../utils/actions";
import { Container, Button } from "react-bootstrap";
import Chat from "../components/Chat";
export default function Home() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="home--chat">
      {state.loggedin === true ? <Chat /> : ""}

      <Container className="home--container">
        <img
          className="icon mb-3"
          src={require("../images/social-icon.jpg")}
          alt="icon"
        />

        {state.loggedin === true ? <PostToFeed /> : ""}

        <Feed />
      </Container>
    </Container>
  );
}
