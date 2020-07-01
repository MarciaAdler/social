import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="footer--container py-2 text-center">
      <Row>
        <Col>
          <img
            src={require("../images/Neighbor-icon.png")}
            alt="Neighbor"
            className="footer--icon"
          />
          Neighbor
        </Col>
        <Col className="footer--about">
          <a href="/about" className="footer--aboutlink">
            About
          </a>
        </Col>
      </Row>
    </Container>
  );
}
