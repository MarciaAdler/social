import React, { createContext, useReducer, useContext } from "react";

import { SET_CURRENT_USER, LOGGEDIN } from "./actions";

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
        },
      };
    case LOGGEDIN:
      return {
        ...state,
        loggedin: true,
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
    },
    loggedin: false,
  });
  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};
export { StoreProvider, useStoreContext };
