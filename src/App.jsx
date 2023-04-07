import { useState } from "react";
import Post from "./Components/Post/Post";

class User{
  constructor(username, state, profile,starred = [] ){
    this.username = username
    this.state = state
    this.starred = starred
    this.profile = profile
  }

  addStarred(post){
    this.starred.push(post)
  }
}

class PostObj{
  constructor(user, community, date, text, image, location = null,commments = [], votes = 0){
    this.user = user
    this.community = community
    this.location = location
    this.date = date
    this.text = text
    this.image = image
    this.votes = votes
    this.comments = commments
  }

  setVotes(vote){
    this.votes += vote
  }
  setLocation(loc){
    this.location = loc
  }

  addComment(comment){
    this.comments.push(comment)
  }

}




function App() {
  const user = new User("Ehab Mohamed","r","https://spunout.ie/wp-content/uploads/2021/01/portrait-black-young-man-face-man-person-ethnic-student-diversity-diverse-confident-millennial_t20_K6aZOV-2.jpg")
  const post = new PostObj(user, "Head First Javascript",30,"best book about javascript, hands down, would very much recommend for any one who is just starting out.","https://www.flenov.info//pics/4a5/4077-HeadFirstJavaScript.jpg","Cairo, Egypt",[""],14)
  return (
    <>
      <Post user = {user} post={post} />
    </>
  );
}

export default App;
