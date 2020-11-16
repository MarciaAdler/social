import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import { SET_SELECTED_USER } from "../utils/actions";
import API from "../utils/API";
import dateFormat from "dateformat";
import { Redirect } from "react-router-dom";

export default function ViewChat(props) {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (state.selecteduser && redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/viewprofile/",
            search: `?${state.selecteduser.username}`,
          }}
        />
      );
    }
  };
  
  function selectUser(user) {
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
      type: SET_SELECTED_USER,
      selecteduser: selected,
    });
    let localStorageSelectedUser = {
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
      "selecteduser",
      JSON.stringify(localStorageSelectedUser)
    );
    setRedirect(true);
  }
  return (
    <Container className="chat--viewchat mt-2 feed--feed">
      <div>
        {state.messages.length > 0
          ? state.messages.map((message, index) => {
              return (
                <div key={index}>
                  {message.SenderId ? (<div>
                    {message.Sender.image !== null ? (
                    
                    <img
                      className="chat--profileimage chat--viewprofile mr-2 mt-2 mb-2"
                      src={
                        process.env.PUBLIC_URL +
                        `/profileimages/${message.Sender.image}`
                      }
                      alt="author image"
                      onClick={() => {
                        selectUser(message.Sender);
                      }}
                    />
                  
                    ) : (
                      <img
                        className="chat--profileimage mr-2"
                        src={
                          process.env.PUBLIC_URL +
                          `/profileimages/profile-placeholdericon.png`
                        }
                        alt="author image"
                        onClick={() => {
                          selectUser(message.Sender);
                        }}
                      />
                    )
                  }
                
                  <strong className="ml-2">{message.Sender.username} says: </strong>
                  {message.message}
                  <br></br>
                  <small>
                    
                    {dateFormat(
                      `${message.createdAt}`,
                      "dddd, mmmm, dS, yyyy, h:MM TT"
                    )}{" "}
                    {"EST"}
                  </small>
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
                  <img
                      className="chat--profileimage mr-2 mt-2 mb-2"
                      src={
                        process.env.PUBLIC_URL +
                        `/profileimages/profile-placeholdericon.png`
                      }
                      alt="author image"
                    />
                )}
                
                  <strong className="ml-2">{message.author} says: </strong>
                  {message.message}
                  </div>)}
                  
                  
                </div>
              );
            })
          : " no messages"}
          
      </div>
      {renderRedirect()}
    </Container>
  );
}
