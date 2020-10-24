import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import {
  SET_CURRENT_USER,
  LOGGEDIN,
  CLEAR_ALL,
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_GROUP_POSTS,
} from "../utils/actions";
import { Link, Redirect } from "react-router-dom";
import API from "../utils/API";

export default function Header() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);
  const [home, setHome] = useState(false);

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

    // setHome(true);
    // renderRedirect();
  }
  // const renderRedirect = () => {
  //   if (home === true) {
  //     return <Redirect to="/signin" />;
  //   }
  // };

  const renderGroupPage = () => {
    if (state.selectedGroup.id !== 0 && redirect) {
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
  function refreshGroup(group) {
    API.refreshGroup(group.id)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SET_SELECTED_GROUP,
          selectedGroup: {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            image: res.data.image,
            adminId: res.data.AdminId,
            adminUsername: res.data.Admin.username,
          },
        });
        let localStorageGroup = {
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          image: res.data.image,
          adminId: res.data.AdminId,
          adminUsername: res.data.Admin.username,
        };
        window.localStorage.setItem(
          "selectedgroup",
          JSON.stringify(localStorageGroup)
        );
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  }
  function selectGroup(group) {
    console.log("group", group);
    refreshGroup(group);

    // const selectedGroup = {
    //   id: group.id,
    //   name: group.name,
    //   description: group.description,
    //   image: group.image,
    //   adminId: group.AdminId,
    //   adminUsername: group.Admin.username,
    // };
    // dispatch({
    //   type: SET_SELECTED_GROUP,
    //   selectedGroup: selectedGroup,
    // });
    // let localStorageSelectedGroup = {
    //   id: group.id,
    //   name: group.name,
    //   description: group.description,
    //   image: group.image,
    //   adminId: group.AdminId,
    //   adminUsername: group.Admin.username,
    // };
    // window.localStorage.setItem(
    //   "selectedgroup",
    //   JSON.stringify(localStorageSelectedGroup)
    // );
    setRedirect(true);
    getGroupPosts(group);
  }
  function getGroupPosts(selectedGroup) {
    console.log(selectedGroup);
    API.getGroupPosts(selectedGroup.id)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_GROUP_POSTS, groupposts: res.data });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="info"
        className="header fixed-top"
      >
        {state.loggedin === true ? (
          <Navbar.Brand href="/">
            <img
              src={require("../images/social-icon.jpg")}
              alt="Social"
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
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="header--dropdown"
          >
            <Nav className="mr-auto">
              <Nav.Link href="/" className="header--dropdownitem">
                Feed
              </Nav.Link>
              <Nav.Link href="/search" className="header--dropdownitem">
                Search for businesses
              </Nav.Link>
              <NavDropdown
                title="Groups"
                className="header--dropdownitem"
                id="nav-dropdown"
              >
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
                          <hr />
                        </NavDropdown.Item>
                      );
                    })
                  : ""}
                {state.currentUser.id !== 0 ? (
                  <NavDropdown.Item href="/addgroup">
                    Add New Group
                  </NavDropdown.Item>
                ) : (
                  ""
                )}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link className="header--dropdownitem" onClick={logOut}>
                Logout
              </Nav.Link>
            </Nav>
            {state.currentUser.image !== null ? (
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
              <Nav.Link href="/" className="header--dropdownitem">
                Feed
              </Nav.Link>
              <Nav.Link href="/search" className="header--dropdownitem">
                Search for buinesses
              </Nav.Link>
              <NavDropdown
                title="Groups"
                id="nav-dropdown"
                className="header--dropdownitem"
              >
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
            </Nav>
            <Nav>
              <Nav.Link href="/signup" className="header--dropdownitem">
                Signup
              </Nav.Link>
              <Nav.Link href="/signin" className="header--dropdownitem">
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      {renderGroupPage()}
    </div>
  );
}
