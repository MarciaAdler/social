import React, { useEffect } from "react";
import Feed from "../components/Feed";
import PostToFeed from "../components/PostToFeed";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_USER, LOGGEDIN } from "../utils/actions";
import { Container } from "react-bootstrap";
export default function Home() {
  return (
    <div className="text-center">
      <Container className="home--container">
        <img
          className="icon"
          src={require("../images/Neighbor-icon.png")}
          alt="icon"
        />
        <PostToFeed />
        <Feed />
      </Container>
    </div>
  );
}
