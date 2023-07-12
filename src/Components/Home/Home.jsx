import CreateFeed from "../Feed/CreateFeed";
import Post from "../Post/Post";
export default function Home({ feed }) {
  return (
    <>
      <CreateFeed />
      {feed.map((post) => (
        <Post user={post.user} post={post} />
      ))}
    </>
  );
}
