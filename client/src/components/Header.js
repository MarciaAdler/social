import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import {
  SET_CURRENT_USER,
  LOGGEDIN,
  CLEAR_ALL,
  SET_GROUPS,
  SET_SELECTED_GROUP,
} from "../utils/actions";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";
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
    setGroups();
  }, []);

  function setGroups() {
    API.setGroups()
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SET_GROUPS,
          groups: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
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
  const renderGroupPage = () => {
    if (state.selectedGroup && redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/group/",
            search: `?${state.selectedGroup.name}`,
          }}
        />
      );
    }
  };

  function selectGroup(group) {
    console.log("group", group);
    const selectedGroup = {
      id: group.id,
      name: group.name,
      description: group.description,
      image: group.image,
      adminId: group.AdminId,
      adminUsername: group.Admin.username,
    };
    dispatch({
      type: SET_SELECTED_GROUP,
      selectedGroup: selectedGroup,
    });
    let localStorageSelectedGroup = {
      id: group.id,
      name: group.name,
      description: group.description,
      image: group.image,
      adminId: group.AdminId,
      adminUsername: group.Admin.username,
    };
    window.localStorage.setItem(
      "selectedgroup",
      JSON.stringify(localStorageSelectedGroup)
    );
    setRedirect(true);
  }
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
              <Nav.Link href="/search">Search for buinesses</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Groups" id="nav-dropdown">
                {state.groups.length > 0
                  ? state.groups.map((group) => {
                      return (
                        <NavDropdown.Item
                          key={group.id}
                          onClick={() => {
                            selectGroup(group);
                          }}
                        >
                          {group.name}
                        </NavDropdown.Item>
                      );
                    })
                  : ""}
                <NavDropdown.Item href="/addgroup">
                  Add New Group
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="" eventKey={2} href="/" onClick={logOut}>
                Logout
              </Nav.Link>
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
              <Nav.Link href="/search">Search for buinesses</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Groups" id="nav-dropdown">
                {state.groups.length > 0
                  ? state.groups.map((group) => {
                      return (
                        <NavDropdown.Item
                          key={group.id}
                          onClick={() => {
                            selectGroup(group);
                          }}
                        >
                          {group.name}
                        </NavDropdown.Item>
                      );
                    })
                  : ""}
              </NavDropdown>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      {renderGroupPage()}
    </div>
  );
}
