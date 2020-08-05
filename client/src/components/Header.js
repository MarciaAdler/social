import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_USER, LOGGEDIN, CLEAR_ALL } from "../utils/actions";
import { Link, Redirect } from "react-router-dom";
export default function Header() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (state.currentUser.id === 0 && localStorage.getItem("currentUser")) {
      const currentUserLs = JSON.parse(localStorage.getItem("currentUser"));

      dispatch({
        type: SET_CURRENT_USER,
        currentUser: currentUserLs,
      });

      dispatch({
        type: LOGGEDIN,
      });
    }
  });
  function logOut() {
    dispatch({
      type: CLEAR_ALL,
    });
    localStorage.clear();
    setRedirect(true);
    renderRedirect();
  }
  const renderRedirect = () => {
    if (redirect === true) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="info"
        className="header fixed-top"
      >
        {state.loggedin === true ? (
          <Navbar.Brand href="/">
            <img
              src={require("../images/Neighbor-icon.png")}
              alt="Neighbor"
              className="header--icon"
            ></img>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/signin">
            <img
              src={require("../images/Neighbor-icon.png")}
              alt="Neighbor"
              className="header--icon"
            ></img>
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {state.loggedin ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Feed</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className="" href="#deets">
                More deets
              </Nav.Link>
              <Nav.Link className="" eventKey={2} href="/" onClick={logOut}>
                Logout
              </Nav.Link>
              {/* {state.currentUser.image !== null ? (
                <Nav.Link href="/profile">
                  <img
                    className="header--profileimage"
                    src={
                      process.env.PUBLIC_URL +
                      `/profileimages/${state.currentUser.image}`
                    }
                  />
                </Nav.Link>
              ) : (
                <Nav.Link href="/profile">Profile</Nav.Link>
              )} */}
            </Nav>
            {state.currentUser.image != "" ? (
              <Navbar.Brand href="/profile">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/profileimages/${state.currentUser.image}`
                  }
                  alt="profile image"
                  className="header--icon"
                ></img>
              </Navbar.Brand>
            ) : (
              <Navbar.Brand href="/profile">
                <img
                  className="header--icon"
                  src={require("../images/profile-placeholdericon.png")}
                  alt="profile"
                />
              </Navbar.Brand>
            )}
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Feed</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      {renderRedirect()}
    </div>
  );
}
