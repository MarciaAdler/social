import React from "react";
import EditGroupProfile from "../components/EditGroupProfile";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import Login from "../Pages/Login"

export default function EditGroup() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="text-center mt-5">
      {state.loggedin === false ? (
      <div className="text-center">
        <h3>Please login to view this page</h3>
        <Login />
      </div>
      ): 
      <EditGroupProfile />}
    </Container>
  );
}
