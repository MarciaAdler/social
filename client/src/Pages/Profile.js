import React from "react";
import ProfileForm from "../components/ProfileForm";
import { useStoreContext } from "../utils/GlobalState";
import Login from "../Pages/Login"
import { Container } from "react-bootstrap"

export default function Profile() {
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="mt-5 chatpage--main">
      {state.loggedin === false ? (
      <div className="text-center">
        <h3>Please login to view this page</h3>
        <Login />
      </div>
      ): 
      <ProfileForm />
      }
      
      
    </Container>
  );
}
