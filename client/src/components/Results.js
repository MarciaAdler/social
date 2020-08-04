import React, { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Card, Row, Col, CardGroup } from "react-bootstrap";
import API from "../utils/API";

export default function Results() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    searchYelp();
  }, []);

  function searchYelp() {
    API.search()
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch((err) => console.log(err));
  }
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
                          {result.display_phone}
                          {result.rating}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : "no results"}
        </Row>
      </CardGroup>
    </Container>
  );
}
