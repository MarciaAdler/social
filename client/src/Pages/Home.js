import React from "react";
import Feed from "../components/Feed";
import PostToFeed from "../components/PostToFeed";

export default function Home() {
  return (
    <div>
      <img src={require("../images/Neighbor-icon.png")} alt="icon" />
      <PostToFeed />
      <Feed />
    </div>
  );
}
