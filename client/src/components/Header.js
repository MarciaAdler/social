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
      <Navbar collapseOnSelect expand="lg" bg="info" className="header">
        {state.loggedin === true ? (
          <Navbar.Brand href="/home">
            <img
              src={require("../images/Neighbor-icon.png")}
              alt="Neighbor"
              className="header--icon"
            ></img>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">
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
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="/" onClick={logOut}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      {renderRedirect()}
    </div>
  );
}
