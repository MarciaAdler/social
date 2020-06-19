import React from "react";
import Feed from "../components/Feed";
import PostToFeed from "../components/PostToFeed";

export default function Home() {
  return (
    <div>
      <PostToFeed />
      <Feed />
    </div>
  );
}
