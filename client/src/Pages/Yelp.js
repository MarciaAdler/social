import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
import Results from "../components/Results";
export default function Yelp() {
  return (
    <div>
      <Container className="yelp--container">
        <h2>Check out some businesses in the neighborhood!</h2>
        <Results />
      </Container>
    </div>
  );
}
