import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="footer--container py-2 text-center">
      <Row>
        <Col>
          <img
            src={require("../images/communitysocial-icon.jpg")}
            alt="Social Community icon"
            className="footer--icon"
          />
          Social Community
        </Col>
        <Col className="footer--about">
          <a href="/About" className="footer--aboutlink">
            About
          </a>
        </Col>
      </Row>
    </Container>
  );
}
