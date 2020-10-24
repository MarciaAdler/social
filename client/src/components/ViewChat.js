import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_MESSAGES } from "../utils/actions";
import API from "../utils/API";
export default function ViewChat(props) {
  // function getMessages(currentuser, receiver) {
  //   API.getMessages(state.currentUser.id, state.selectedchat.id)
  //     .then((res) => {
  //       console.log(res.data);
  //       dispatch({ type: SET_MESSAGES, messages: res.data });
  //     })
  //     .catch((err) => console.log(err));
  // }
  const [state, dispatch] = useStoreContext();
  return (
    <Container className="chat--viewchat mt-2">
      <div>
        {state.messages.length > 0
          ? state.messages.map((message, index) => {
              return (
                <div key={index}>
                  {message.SenderId ? (<div>
                    {message.Sender.image !== null ? (
                    
                    <img
                      className="chat--profileimage mr-2 mt-2 mb-2"
                      src={
                        process.env.PUBLIC_URL +
                        `/profileimages/${message.Sender.image}`
                      }
                      alt="author image"
                    />
                  
                ) : (
                  ""
                )}
                
                  <strong className="ml-2">{message.Sender.username} says: </strong>
                  {message.message}
                  </div>): (<div>
                    {message.image !== null ? (
                    
                    <img
                      className="chat--profileimage mr-2 mt-2 mb-2"
                      src={
                        process.env.PUBLIC_URL +
                        `/profileimages/${message.image}`
                      }
                      alt="author image"
                    />
                  
                ) : (
                  ""
                )}
                
                  <strong className="ml-2">{message.username} says: </strong>
                  {message.message}
                  </div>)}
                  
                  
                </div>
              );
            })
          : " no messages"}
          
      </div>
    </Container>
  );
}
