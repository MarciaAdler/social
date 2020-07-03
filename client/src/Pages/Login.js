import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col } from "react-bootstrap";
export default function Login() {
  return (
    <Container className="login--container">
      <Row>
        <Col className="d-flex justify-content-center col-12 col-md-6">
          <img
            src={require("../images/Neighbor-icon.png")}
            alt="Neighbor"
            className="login--icon"
          />
        </Col>
        <Col className="col-12 col-md-6">
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}
