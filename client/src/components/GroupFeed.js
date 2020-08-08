import React from "react";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import GroupPost from "./GroupPost";
export default function GroupFeed() {
  const [state, dispatch] = useStoreContext();
  return (
    <div>
      <Container>
        <GroupPost />
      </Container>
    </div>
  );
}
