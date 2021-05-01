import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import {
  SET_CURRENT_USER,
  LOGGEDIN,
  CLEAR_ALL,
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_GROUP_POSTS,
  SET_USER_LIKES,
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

    setHome(true);
    renderHomePage();
  }

  const renderHomePage = () => {
    if (home) {
      return <Redirect push to={{ pathname: "/signin/" }} />;
    }
  };
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
            <div className="header--dropdownitem header--homelink">
              <img
                src={require("../images/communitysocial-icon.jpg")}
                alt="Social Neighbor"
                className="header--icon"
              ></img>
              <span className="header--profile-label">Home</span>
            </div>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/signin">
            <div className="header--dropdownitem header--homelink">
              <img
                src={require("../images/communitysocial-icon.jpg")}
                alt="Social Neighbor"
                className="header--icon"
              ></img>
              <span className="header--profile-label">Signin</span>
            </div>
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
                <i className="fas fa-rss-square text-align-center header--icons"></i>
                <span className="header--profile-label">Feed</span>
              </Nav.Link>
              <Nav.Link href="/search" className="header--dropdownitem">
                <i className="fas fa-search text-align-center header--icons"></i>
                <span className="header--profile-label">Search</span>
              </Nav.Link>
              <div className="header--dropdownitem nav-link">
                <i className="fas fa-user-friends header--icons"></i>
                <NavDropdown
                  className="header--profile-label"
                  id="nav-dropdown"
                  title="Groups"
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
              </div>
              <Nav.Link href="/resources" className="header--dropdownitem">
                <i className="fas fa-archive text-align-center header--icons"></i>
                <span className="header--profile-label">Resources</span>
              </Nav.Link>
            </Nav>
            <Nav>
              {state.currentUser.role === "Admin" ? (
                <Nav.Link
                  href="/admindashboard"
                  className="header--dropdownitem"
                >
                  <i className="fas fa-chart-line header--icons"></i>
                  <span className="header--profile-label">Dashboard</span>
                </Nav.Link>
              ) : (
                ""
              )}
              <Nav.Link className="header--dropdownitem" onClick={logOut}>
                <i className="fas fa-sign-out-alt header--icons"></i>
                <span className="header--profile-label">Logout</span>
              </Nav.Link>
            </Nav>
            {state.currentUser.image !== null ? (
              <Navbar.Brand href="/profile">
                <div className="header--dropdownitem header--headerlink">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/profileimages/${state.currentUser.image}`
                    }
                    alt="profile image"
                    className="header--profileimage"
                  ></img>
                  <span className="header--profile-label">Profile</span>
                </div>
              </Navbar.Brand>
            ) : (
              <Navbar.Brand href="/profile">
                <div className="header--dropdownitem header--headerlink">
                  <img
                    className="header--icon"
                    src={require("../images/profile-placeholdericon.png")}
                    alt="profile"
                  />
                  <span className="header--profile-label">Profile</span>
                </div>
              </Navbar.Brand>
            )}
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" className="header--dropdownitem">
                <i className="fas fa-rss-square text-align-center header--icons"></i>
                <span className="header--profile-label">Feed</span>
              </Nav.Link>
              <Nav.Link href="/search" className="header--dropdownitem">
                <i className="fas fa-search text-align-center header--icons"></i>
                <span className="header--profile-label">Search</span>
              </Nav.Link>
              <div className="header--dropdownitem nav-link">
                <i className="fas fa-user-friends header--icons"></i>
                <NavDropdown
                  className="header--profile-label"
                  id="nav-dropdown"
                  title="Groups"
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
              </div>
              <Nav.Link href="/resources" className="header--dropdownitem">
                <i className="fas fa-archive text-align-center header--icons"></i>
                <span className="header--profile-label">Resources</span>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/signup" className="header--dropdownitem">
                <i className="fas fa-user-plus"></i>
                <span className="header--profile-label">Signup</span>
              </Nav.Link>
              <Nav.Link
                href="/signin"
                className="header--dropdownitem header--headerlink"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span className="header--profile-label">Login</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      {renderGroupPage()}
      {renderHomePage()}
    </div>
  );
}
