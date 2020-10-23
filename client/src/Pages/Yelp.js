import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container } from "react-bootstrap";
import Results from "../components/Results";
import API from "../utils/API";

export default function Yelp() {
  const [formObject, setFormObject] = useState({});
  const [results, setResults] = useState([]);

  // get the results from the yelp API for the business entered in the form
  function searchYelp(business) {
    API.search(business)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ [name]: value });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    searchYelp(formObject.search);
  }
  return (
    <div>
      <Container className="yelp--container">
        <h2>Check out some businesses in the neighborhood!</h2>
        <form className="mt-3 mb-3">
          <label>What would you like to search for? &nbsp;</label>
          <input
            onChange={handleInputChange}
            name="search"
            placeholder="business type"
          />
          <button className="post" onClick={handleFormSubmit}>
            Search
          </button>
        </form>
        <Results results={results} />
      </Container>
    </div>
  );
}
