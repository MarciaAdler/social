import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatUserList from "../components/ChatUserList";
import WriteChat from "../components/WriteChat";
import ViewChat from "../components/ViewChat";
export default function ChatPage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-12 col-sm-4 d-flex justify-content-center">
          <ChatUserList />
        </Col>
        <Col className="col-12 col-sm-8">
          <Container className="chat--chat">
            <Row className="d-flex justify-content-center">
              <ViewChat />
            </Row>
            <Row>
              <WriteChat />
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
