// src/routes/TableUsers.js

import React from "react";
import { useLoaderData } from "react-router-dom";

const User = () => {
  const user = useLoaderData();

  const title = <h1>Hello {user.name} ({user.job})</h1>;
  return (
    <div className="container">
      {title}
    </div>
  );
};

export async function userLoader({ params }) {
  // throw new Error("oh an error");
  const userId = params.userId;
  const url = "https://dummyjson.com/users/" + userId;
  let userApi = await fetch(url);
  userApi = await userApi.json();
  const user = {
    name: userApi.firstName,
    job: userApi.company.title,
  };
  return user;
}

export default User;
