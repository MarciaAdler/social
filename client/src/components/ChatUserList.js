import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import {
  SET_USER_LIST,
  SET_SELECTED_CHAT,
  SET_MESSAGES,
} from "../utils/actions";

export default function ChatUserList() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    getUsers();
  }, []);
  // async function getMessages(currentuser, receiver) {
  //   console.log(currentuser, receiver);
  //   const { data } = await API.getMessages(currentuser, receiver);

  //   dispatch({ type: SET_MESSAGES, messages: data });
  //   console.log(data);
  // }

  function getMessages(currentuser, receiver) {
    API.getMessages(currentuser, receiver)
      .then((res) => {
        dispatch({
          type: SET_MESSAGES,
          messages: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  function getUsers() {
    API.getUsers()
      .then((res) => {
        dispatch({
          type: SET_USER_LIST,
          userlist: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  function selectChat(user) {
    console.log(user);
    const selected = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      city: user.city,
      state: user.state,
      image: user.image,
      email: user.email,
      bio: user.bio,
      link: user.link,
    };
    dispatch({
      type: SET_SELECTED_CHAT,
      selectedchat: selected,
    });
    let localStorageSelectedChat = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      city: user.city,
      state: user.state,
      image: user.image,
      email: user.email,
      bio: user.bio,
      link: user.link,
    };
    window.localStorage.setItem(
      "selectedchat",
      JSON.stringify(localStorageSelectedChat)
    );
    getMessages(state.currentUser.id, user.id);
  }

  return (
    <div className="chat--userlist">
      <ListGroup>
        {state.userlist
          ? state.userlist.map((user) => {
              return (
                <ListGroup.Item
                  className="chat--username feed--feed"
                  key={user.id}
                  onClick={() => {
                    selectChat(user);
                  }}
                >
                  <div key={user.id}>
                    {user.image !== null ? (
                      <img
                        className="chat--profileimage mr-2"
                        src={
                          process.env.PUBLIC_URL +
                          `/profileimages/${user.image}`
                        }
                        alt="author image"
                      />
                    ) : (
                      <img
                        className="chat--profileimage mr-2"
                        src={
                          process.env.PUBLIC_URL +
                          `/profileimages/profile-placeholdericon.png`
                        }
                        alt="author image"
                      />
                    )}
                    {user.username}
                  </div>
                </ListGroup.Item>
              );
            })
          : "no users"}
      </ListGroup>
    </div>
  );
}
