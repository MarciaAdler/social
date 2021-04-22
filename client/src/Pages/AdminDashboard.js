import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import API from "../utils/API";

export default function AdminDashboard() {
  const [usercount, setUserCount] = useState(0);
  const [feedPosts, setFeedPosts] = useState(0);
  const [uniquefeedposters, setUniqueFeedPosters] = useState([]);
  const [topusers, setTopUsers] = useState([]);
  const [postcount, setPostCount] = useState([]);

  useEffect(() => {
    countUsers();
    feedposts();
    uniqueFeedPosters();
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
          console.log(res.data.length);
          setTopUsers((topusers) => [...topusers, res.data[0].User]);
          setPostCount((postcount) => [...postcount, res.data.length]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Container className="home--chat text-center">
      <h1>Admin Dashboard</h1>
      <Row>
        <Col className="col-4">
          Total number of users (non-admins): <br />
          {usercount}
        </Col>
        <Col className="col-4">
          Total number of posts in feed: <br />
          {feedPosts}
        </Col>
        <Col className="col-4">
          Number of unique active posters on feed: <br />
          {uniquefeedposters}
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          Top five users: <br />
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
                    {user.username} &nbsp; {postcount[index]}
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item className="admindash--topusers">
                No Data
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
