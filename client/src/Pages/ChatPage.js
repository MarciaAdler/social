import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatUserList from "../components/ChatUserList";
import WriteChat from "../components/WriteChat";
import ViewChat from "../components/ViewChat";
export default function ChatPage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-12 col-md-4 d-flex justify-content-center">
          <ChatUserList />
        </Col>
        <Col>
          <Row>
            <ViewChat />
          </Row>
          <Row>
            <WriteChat />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
