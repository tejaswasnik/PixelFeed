import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed, createPost } from "../services/api.post";

export function usePost() {
  const context = useContext(PostContext);

  const { feed, setFeed, post, setPost, loading, setLoading } = context;

  async function handleFeed() {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts.reverse());
    setLoading(false);
  }

  async function handleCreatePost(imageFile, caption) {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  }

  return { loading, feed, post, handleFeed, handleCreatePost };
}
