import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed } from "../services/api.post";

export function usePost() {
  const context = useContext(PostContext);

  const { feed, setFeed, post, setPost, loading, setLoading } = context;

  async function handleFeed() {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  }

  return { loading, feed, post, handleFeed };
}
