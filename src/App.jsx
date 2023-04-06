import { useState } from "react";
import Post from "./Components/Post/Post";

function App() {
  const user = {
    username: "Ehab Mohamed",
    state: "w"
  }

  return (
    <>
      <Post user = {user} community={"Head First Javascript"} text={"best book about javascript, hands down, would very much recommend for any one who is just starting out."} reacts={10} comments={15}/>
      <Post user = {user} community={"Head First Javascript"} text={"best book about javascript, hands down, would very much recommend for any one who is just starting out."} reacts={10} comments={15}/>
      <Post user = {user} community={"Head First Javascript"} text={"best book about javascript, hands down, would very much recommend for any one who is just starting out."} reacts={10} comments={15}/>
    </>
  );
}

export default App;
