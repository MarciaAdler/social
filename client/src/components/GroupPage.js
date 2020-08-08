import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_SELECTED_GROUP } from "../utils/actions";
import API from "../utils/API";

export default function GroupPage() {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    loadRequest(window.location.search);
  }, []);

  function loadRequest(url) {
    console.log("From loadRequest function: ");
    console.log(url);

    if (state.selectedGroup.id === 0) {
      API.getPageFromURL(url.replace("?", ""))
        .then((res) => {
          console.log("res", res);
          const selectedGroup = {
            id: res.data.id,
            name: res.data.name,
            description: res.data.description,
            image: res.data.image,
            adminId: res.data.AdminId,
            adminUsername: res.data.Admin.username,
          };
          dispatch({
            type: SET_SELECTED_GROUP,
            selectedGroup: selectedGroup,
          });
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_SELECTED_GROUP,
        selectedGroup: state.selectedGroup,
      });
    }
  }

  return (
    <Container>
      <h2>
        Welcome to <strong>{state.selectedGroup.name}</strong>!
      </h2>
      <br />
      {state.selectedGroup.image !== "no image" ? (
        <img
          className="grouppage--image"
          src={
            process.env.PUBLIC_URL + `/groupimages/${state.selectedGroup.image}`
          }
        />
      ) : (
        " "
      )}
      <h4>{state.selectedGroup.description}</h4>
      Group created by {state.selectedGroup.adminUsername}
    </Container>
  );
}
