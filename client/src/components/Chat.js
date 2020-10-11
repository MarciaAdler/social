import React, { useState, useRef } from "react";
import { Button, Modal, ListGroup, Overlay, Tooltip } from "react-bootstrap";
import { SET_USER_LIST, SET_SELECTED_CHAT } from "../utils/actions";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
export default function Chat() {
  const [state, dispatch] = useStoreContext();

  const [show, setShow] = useState(false);

  const [showoverlay, setShowOverlay] = useState(false);
  const target = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getUsers();
  };
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
    };
    window.localStorage.setItem(
      "selectedchat",
      JSON.stringify(localStorageSelectedChat)
    );
  }
  return (
    <div className="text-right chat--div">
      <Button className="chat--button" href="/chatpage">
        Chat
      </Button>
      {/* <Button className="chat--button" onClick={handleShow}>
        Chat
      </Button> */}
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {state.userlist
              ? state.userlist.map((user) => {
                  return (
                    <div key={user.id}>
                      <ListGroup.Item
                        className="chat--username"
                        key={user.id}
                        onClick={() => {
                          selectChat(user);
                        }}
                      >
                        {user.username}
                      </ListGroup.Item>
                    </div>
                  );
                })
              : "no users"}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
