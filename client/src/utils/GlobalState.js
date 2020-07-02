import React, { createContext, useReducer, useContext } from "react";

import { SET_CURRENT_USER, LOGGEDIN, CLEAR_ALL, SET_POSTS } from "./actions";

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
        },
        loggedin: false,
        posts: [],
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
    },
    loggedin: false,
    posts: [],
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};
export { StoreProvider, useStoreContext };
