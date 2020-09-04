import React, { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { SET_USER_LIST } from "../utils/actions";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
export default function Chat() {
  const [state, dispatch] = useStoreContext();

  const [show, setShow] = useState(false);

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
  return (
    <div className="text-right chat--div">
      <Button className="chat--button" onClick={handleShow}>
        Chat
      </Button>
      <Modal
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
                  return <ListGroup.Item>{user.username}</ListGroup.Item>;
                })
              : "no users"}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
