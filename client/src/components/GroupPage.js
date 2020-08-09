import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_SELECTED_GROUP, SET_GROUP_POSTS } from "../utils/actions";
import API from "../utils/API";
import GroupFeed from "./GroupFeed";

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
          getGroupPosts(selectedGroup);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_SELECTED_GROUP,
        selectedGroup: state.selectedGroup,
      });
      getGroupPosts(state.selectedGroup);
    }
  }
  function getGroupPosts(selectedGroup) {
    console.log(selectedGroup.id);
    API.getGroupPosts(selectedGroup.id)
      .then((res) => {
        console.log(res);
        dispatch({ type: SET_GROUP_POSTS, groupposts: res.data });
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container>
      {state.currentUser.username === state.selectedGroup.adminUsername ? (
        <div className="text-left">
          <Button>Edit Page</Button>
        </div>
      ) : (
        ""
      )}
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
      <GroupFeed />
    </Container>
  );
}
