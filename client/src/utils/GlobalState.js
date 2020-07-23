import React, { createContext, useReducer, useContext } from "react";

import {
  SET_CURRENT_USER,
  LOGGEDIN,
  CLEAR_ALL,
  SET_POSTS,
  SET_SELECTED_USER,
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.currentUser.id,
          username: action.currentUser.username,
          firstName: action.currentUser.firstName,
          city: action.currentUser.city,
          state: action.currentUser.state,
          image: action.currentUser.image,
          email: action.currentUser.email,
          bio: action.currentUser.bio,
        },
      };
    case LOGGEDIN:
      return {
        ...state,
        loggedin: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        selecteduser: {
          id: action.selecteduser.id,
          username: action.selecteduser.username,
          firstName: action.selecteduser.firstName,
          city: action.selecteduser.city,
          state: action.selecteduser.state,
          image: action.selecteduser.image,
          email: action.selecteduser.email,
          bio: action.selecteduser.bio,
        },
      };
    case CLEAR_ALL:
      return {
        ...state,
        currentUser: {
          id: 0,
          username: "",
          firstName: "",
          city: "",
          state: "",
          image: "",
          email: "",
          bio: "",
        },
        loggedin: false,
        posts: [],
        selecteduser: {
          id: 0,
          username: "",
          firstName: "",
          city: "",
          state: "",
          image: "",
          email: "",
          bio: "",
        },
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser: {
      id: 0,
      username: "",
      firstName: "",
      city: "",
      state: "",
      image: "",
      email: "",
      bio: "",
    },
    loggedin: false,
    posts: [],
    selecteduser: {
      id: 0,
      username: "",
      firstName: "",
      city: "",
      state: "",
      image: "",
      email: "",
      bio: "",
    },
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};
export { StoreProvider, useStoreContext };
