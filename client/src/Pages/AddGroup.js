import React from "react";
import CreateGroup from "../components/CreateGroup";
import { useStoreContext } from "../utils/GlobalState";
import Login from "../Pages/Login"
import { Container } from "react-bootstrap"
export default function Signup() {
  const [state, dispatch] = useStoreContext();
  return (
    <div className="text-center mt-5">
      {state.loggedin === false ? (
      <div className="text-center">
        <h3>Please login to view this page</h3>
        <Login />
      </div>
      ): 
      <CreateGroup />}
    </div>
  );
}
