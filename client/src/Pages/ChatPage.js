import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatUserList from "../components/ChatUserList";
import WriteChat from "../components/WriteChat";
import ViewChat from "../components/ViewChat";
import io from "socket.io-client";
import { useStoreContext } from "../utils/GlobalState";
import Login from "./Login";
export default function ChatPage() {
  const [state, dispatch] = useStoreContext();
  const socket = io("localhost:8080");
  return (
    <Container className="mt-5">
      {state.loggedin === false ? (
        <div className="text-center">
          <h3>Please login to view this page</h3>
          <Login />
        </div>
      ) : (
        <Row>
          <Col className="col-12 col-sm-4 d-flex justify-content-center">
            <ChatUserList />
          </Col>
          <Col className="col-12 col-sm-8">
            <Container className="chat--chat">
              <h3 className="chat--with">
                Messages with: {state.selectedchat.username}
              </h3>
              <Row className="d-flex justify-content-center">
                <ViewChat />
              </Row>
              <Row>
                <WriteChat />
              </Row>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
}
