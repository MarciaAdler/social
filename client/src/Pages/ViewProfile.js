import React from "react";
import { Container } from "react-bootstrap";
import UserProfile from "../components/UserProfile";

export default function Profile() {
  return (
    <div className="text-center">
      <Container className="viewprofile--container">
        <UserProfile />
      </Container>
    </div>
  );
}
