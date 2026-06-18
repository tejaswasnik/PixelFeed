import React, { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
const FeedPage = () => {
  const { feed, loading, handleFeed } = usePost();

  useEffect(() => {
    handleFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }
  console.log(feed);
  return (
    <main>
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return <Post user={post.user} post={post} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default FeedPage;
