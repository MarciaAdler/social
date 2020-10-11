import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatUserList from "../components/ChatUserList";

export default function ChatPage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-12 col-md-4 d-flex justify-content-center">
          <ChatUserList />
        </Col>
      </Row>
    </Container>
  );
}
