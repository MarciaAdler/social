import React, { useRef, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { LOGGEDIN, SET_CURRENT_USER } from "../utils/actions";

export default function LoginForm() {
  const [state, dispatch] = useStoreContext();
  const [errormessage, setErrorMessasge] = useState("");
  const nameRef = useRef();
  const passwordRef = useRef();
  const renderRedirect = () => {
    if (state.loggedin) {
      return <Redirect to="/" />;
    }
  };
  function login(event) {
    event.preventDefault();
    API.getUser({
      username: nameRef.current.value,
      password: passwordRef.current.value,
    })
      .then((results) => {
        console.log(results);
        dispatch({
          type: SET_CURRENT_USER,
          currentUser: {
            id: results.data.id,
            username: results.data.username,
            firstName: results.data.firstName,
            email: results.data.email,
            city: results.data.city,
            state: results.data.state,
            image: results.data.image,
            bio: results.data.bio,
            link: results.data.link,
          },
        });

        let localStorageUser = {
          id: results.data.id,
          username: results.data.username,
          firstName: results.data.firstName,
          email: results.data.email,
          city: results.data.city,
          state: results.data.state,
          image: results.data.image,
          bio: results.data.bio,
          link: results.data.link,
        };

        window.localStorage.setItem(
          "currentUser",
          JSON.stringify(localStorageUser)
        );

        dispatch({
          type: LOGGEDIN,
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessasge("Username or password is incorrect");
      });
  }

  return (
    <div className="loginform--wrapper">
      <p className="error-message">{errormessage}</p>
      <Form className="loginform--form div-to-align justify-content-center">
        <Form.Group controlId="formUsername">
          <Form.Label>
            <strong>Username</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            ref={nameRef}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>
            <strong>Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button
          className="button"
          variant="secondary"
          type="submit"
          onClick={login}
        >
          Sign-in
        </Button>
        <span className="ml-3">
          Click <a href="/reset">here</a> to reset password
        </span>
      </Form>
      {renderRedirect()}
    </div>
  );
}
