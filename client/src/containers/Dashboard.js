import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({
    username: "",
    registrated_at: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("/user/current-user")
      .then(({ data }) => {
        const { username, registrated_at, profile_image } = data.user;
        setData({ username, registrated_at, image: profile_image.url });
      })
      .catch((error) => alert(JSON.stringify(error, null, 2)));
  }, []);

  return (
    <>
      <h1>{data.username}</h1>
      <h2>Registrated at : {data.registrated_at}</h2>
      <img src={data.image} alt="random" />
      <a href="/users/logout">
        {" "}
        <button type="button">Logout</button>
      </a>
    </>
  );
}

export default Dashboard;
