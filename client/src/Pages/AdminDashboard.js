import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";

export default function AdminDashboard() {
  const [usercount, setUserCount] = useState(0);
  const [feedPosts, setFeedPosts] = useState(0);
  const [uniquefeedposters, setUniqueFeedPosters] = useState([]);
  const [topusers, setTopUsers] = useState([]);
  const [postcount, setPostCount] = useState([]);
  const [newusers, setNewUsers] = useState([]);
  useEffect(() => {
    countUsers();
    feedposts();
    uniqueFeedPosters();
    getNewUsers();
  }, []);
  function countUsers() {
    API.countUsers()
      .then((res) => {
        setUserCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function feedposts() {
    API.feedposts()
      .then((res) => {
        setFeedPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function uniqueFeedPosters() {
    API.uniqueFeedPosters()
      .then((res) => {
        console.log(res.data);
        setUniqueFeedPosters(res.data.length);
        getUniqueFeedPostersInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUniqueFeedPostersInfo(users) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i].userid;
      API.getUniqueFeedPostsInfo(user)
        .then((res) => {
          if (res.data.length > 0) {
            res.data[0].User["count"] = res.data.length;
            setTopUsers((topusers) => [...topusers, res.data[0].User]);
            //   setPostCount((postcount) => [...postcount, res.data.length]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getNewUsers() {
    API.getNewUsers()
      .then((res) => {
        setNewUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container className="home--chat text-center">
      <h1>Admin Dashboard</h1>
      <Row>
        <Col className="col-4">
          <strong>Total number of users (non-admins):</strong> <br />
          {usercount}
        </Col>
        <Col className="col-4">
          <strong>Total number of posts in feed:</strong> <br />
          {feedPosts}
        </Col>
        <Col className="col-4">
          <strong>Number of unique active posters on feed:</strong> <br />
          {uniquefeedposters}
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <strong>New users (those who signed up in the last 3 days):</strong>{" "}
          <br />
          {newusers.length}
          <ListGroup>
            {newusers.length > 0 ? (
              newusers.map((user, index) => {
                return (
                  <ListGroup.Item key={index} className="admindash--topusers">
                    {user.image !== null ? (
                      <img
                        className="admindash--profileimage"
                        src={
                          process.env.PUBLIC_URL +
                          `/profileimages/${user.image}`
                        }
                      />
                    ) : (
                      <img
                        className="admindash--profileimage"
                        src={require("../images/profile-placeholdericon.png")}
                      />
                    )}
                    {user.username}
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item className="admindash--topusers">
                No New Users
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col className="col-4">
          <strong>Active Users in the last 3 days:</strong> <br />
          {topusers.length}
          <ListGroup>
            {topusers.length > 0 ? (
              topusers.map((user, index) => {
                return (
                  <ListGroup.Item key={user.id} className="admindash--topusers">
                    {user.image !== null ? (
                      <img
                        className="admindash--profileimage"
                        src={
                          process.env.PUBLIC_URL +
                          `/profileimages/${user.image}`
                        }
                      />
                    ) : (
                      <img
                        className="admindash--profileimage"
                        src={require("../images/profile-placeholdericon.png")}
                      />
                    )}
                    {user.username} &nbsp;{" "}
                    <small>{user.count}&nbsp; post(s)</small>
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item className="admindash--topusers">
                No Active Users
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
