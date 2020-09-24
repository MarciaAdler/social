import React, { createContext, useReducer, useContext } from "react";

import {
  SET_CURRENT_USER,
  LOGGEDIN,
  CLEAR_ALL,
  SET_POSTS,
  SET_SELECTED_USER,
  SET_GROUPS,
  SET_SELECTED_GROUP,
  SET_GROUP_POSTS,
  SET_USER_LIST,
  SET_SELECTED_CHAT,
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
    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedchat: {
          id: action.selectedchat.id,
          username: action.selectedchat.username,
          firstName: action.selectedchat.firstName,
          city: action.selectedchat.city,
          state: action.selectedchat.state,
          image: action.selectedchat.image,
          email: action.selectedchat.email,
          bio: action.selectedchat.bio,
        },
      };
    case SET_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };
    case SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: {
          id: action.selectedGroup.id,
          name: action.selectedGroup.name,
          description: action.selectedGroup.description,
          image: action.selectedGroup.image,
          adminId: action.selectedGroup.adminId,
          adminUsername: action.selectedGroup.adminUsername,
        },
      };
    case SET_GROUP_POSTS:
      return {
        ...state,
        groupposts: action.groupposts,
      };
    case SET_USER_LIST:
      return {
        ...state,
        userlist: action.userlist,
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
        // selectedGroup: {
        //   id: 0,
        //   name: "",
        //   description: "",
        //   image: "",
        //   adminId: 0,
        //   adminUsername: "",
        // },
        loggedin: false,
        // posts: [],
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
    selectedchat: {
      id: 0,
      username: "",
      firstName: "",
      city: "",
      state: "",
      image: "",
      email: "",
      bio: "",
    },
    groups: [],
    selectedGroup: {
      id: 0,
      name: "",
      description: "",
      image: "",
      adminId: 0,
      adminUsername: "",
    },
    userlist: [],
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};
export { StoreProvider, useStoreContext };
