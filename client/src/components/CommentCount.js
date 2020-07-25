import React, { useEffect, useState } from "react";
import API from "../utils/API";

export default function CommentCount({ id }) {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    commentCount(id);
  });

  function commentCount(id) {
    API.getComments(id)
      .then((res) => {
        console.log(res.data);
        setNumber(res.data.length);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="text-left">
      <small>{number} Comments</small>
    </div>
  );
}
