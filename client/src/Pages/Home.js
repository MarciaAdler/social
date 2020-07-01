import React, { useEffect } from "react";
import Feed from "../components/Feed";
import PostToFeed from "../components/PostToFeed";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_USER, LOGGEDIN } from "../utils/actions";

export default function Home() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    if (state.currentUser.id === 0 && localStorage.getItem("currentUser")) {
      const currentUserLs = JSON.parse(localStorage.getItem("currentUser"));

      dispatch({
        type: SET_CURRENT_USER,
        currentUser: currentUserLs,
      });

      dispatch({
        type: LOGGEDIN,
      });
    }
  });
  return (
    <div className="text-center">
      <img
        className="icon"
        src={require("../images/Neighbor-icon.png")}
        alt="icon"
      />
      <PostToFeed />
      <Feed />
    </div>
  );
}
