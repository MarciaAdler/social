import React, { useState, useRef, Fragment, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Container, Form, Col, Button, ListGroup } from "react-bootstrap";
import API from "../utils/API";
import dateFormat from "dateformat";
export default function Resource() {
  const [state, dispatch] = useStoreContext();
  const [docs, setDocuments] = useState([]);
  let componentMounted = true;

  useEffect(() => {
    setResources();
  }, []);
  function setResources() {
    API.getDocs()
      .then((res) => {
        console.log(res.data);
        setDocuments(res.data);
      })
      .catch((err) => console.log(err));
  }
  function deleteResource(doc) {
    API.deleteDoc(doc)
      .then((res) => {
        setResources();
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container className="signupform--wrapper">
      <ListGroup>
        {docs.length > 0
          ? docs.map((doc) => {
              return (
                <ListGroup.Item className="resource--doctext" key={doc.id}>
                  <a
                    className="resource--doclink"
                    href={process.env.PUBLIC_URL + `/resources/${doc.document}`}
                    target="_blank"
                  >
                    <strong>Resource Name: {doc.name}</strong>
                  </a>
                  <br />
                  Resource Description: {doc.description}
                  <br />
                  <small>Posted by: {doc.Admin.username}</small>
                  <br />
                  <small>
                    Posted On:{" "}
                    {dateFormat(
                      `${doc.createdAt}`,
                      "dddd, mmmm, dS, yyyy, h:MM TT"
                    )}{" "}
                    {"EST"}
                  </small>
                  {state.currentUser.id === doc.Admin.id ? (
                    <button
                      className="resource--delete-btn"
                      onClick={() => {
                        deleteResource(doc.id);
                      }}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}
                </ListGroup.Item>
              );
            })
          : ""}
      </ListGroup>
    </Container>
  );
}
