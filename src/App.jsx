import { useState } from "react";
import Post from "./Components/Post/Post";
import Nav from "./Components/Nav/Nav";
import CreateFeed from "./Components/Feed/CreateFeed";
import Notifications from "./Components/Notifications/Notifications";
import Profile from "./Components/profile/Profile";


class User{
  constructor(id,username, state, profile,starred = [] ){
    this.id = id
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
  constructor(id ,user, community, date, text, image, location = null,commments, votes = 0){
    this.id = id
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
class Comment{
  constructor(id,user,text,replies){
    this.id = id
    this.user = user
    this.text = text
    this.replies = replies
  }
}

class Reply{
  constructor(id,user,text){
    this.id = id
    this.user = user
    this.text = text
  }
}

function App() {
  const user = new User(1,"Ehab Mohamed","w","https://spunout.ie/wp-content/uploads/2021/01/portrait-black-young-man-face-man-person-ethnic-student-diversity-diverse-confident-millennial_t20_K6aZOV-2.jpg")
  const reply = new Reply(1,user,"I agreeeeee")
  const comment = new Comment(1,user,"Yeah I Like this book", Array(3).fill(reply))
  const comments = Array(15).fill(comment)
  const post = new PostObj(1,user, "Head First Javascript",30,"best book about javascript, hands down, would very much recommend for any one who is just starting out.","https://www.flenov.info//pics/4a5/4077-HeadFirstJavaScript.jpg","Cairo, Egypt",comments,14)
  return (
    <>
      <Post user = {user} post={post} />
      <Nav/>   
    </>
  );
}

export default App;
