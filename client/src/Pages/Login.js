import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Row, Col } from "react-bootstrap";
export default function Login() {
  return (
    <Container className="login--container">
      <Row>
        <Col className="d-flex justify-content-center col-12 col-md-6">
          <img
            src={require("../images/communitysocial-icon.jpg")}
            alt="Social Neighbor"
            className="login--icon"
          />
        </Col>
        <Col className="col-12 col-md-6">
          <LoginForm />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="text-center login--testaccounts">
          <p className="mt-2 ml-2">
            <strong>
              If you are interested in testing out the app, please use the test
              accounts listed below
            </strong>
          </p>
          <p className="ml-2">
            <strong>Usernames:</strong>
            <br />
            <em>Admin account</em> - Marcia
            <br />
            <em>User account</em> - Brooklyn
            <br />
          </p>
          <p className="ml-2">
            <strong>Password for test accounts*:</strong> Test
            <br />
            <small>
              *Please note, the usernames are not case sensitive, but the
              password is
            </small>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
