import React from "react";

import { Container, Card, Row, Col, CardGroup } from "react-bootstrap";

export default function Results({ results }) {
  return (
    <Container>
      <CardGroup>
        <Row>
          {results.length > 0
            ? results.map((result) => {
                return (
                  <Col className="col-12 col-md-4 col-sm-6" key={result.id}>
                    <Card className="search--card">
                      <Card.Img
                        variant="top"
                        className="search--image"
                        src={result.image_url}
                      />
                      <Card.Body>
                        <Card.Title>{result.name}</Card.Title>
                        <Card.Text>
                          <strong>Rating:</strong> {result.rating}
                          <br />
                          <strong>Categories: </strong>
                          {result.categories.length > 0
                            ? result.categories.map((category, index) => {
                                return (
                                  <span key={index}>{category.title} </span>
                                );
                              })
                            : ""}
                          <br />
                          <strong>Phone:</strong> {result.display_phone}
                          <br />
                          <strong>Address:</strong>{" "}
                          {result.location.display_address.map(
                            (address, index) => {
                              return (
                                <span key={index}>
                                  {address} <br />
                                </span>
                              );
                            }
                          )}
                          <br />
                          {result.transactions.length > 0
                            ? result.transactions.map((transaction, index) => {
                                return <span key={index}>{transaction} </span>;
                              })
                            : ""}
                        </Card.Text>
                        <a href={result.url} target="_blank">
                          Click here for more info
                        </a>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : ""}
        </Row>
      </CardGroup>
    </Container>
  );
}
