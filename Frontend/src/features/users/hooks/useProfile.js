import { useState } from "react";
import {
  getUserProfile,
  followUser,
  unfollowUser,
} from "../services/api.user";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postsCount, setPostsCount] = useState(0);

  async function handleGetProfile(username) {
    setLoading(true);
    try {
      const data = await getUserProfile(username);
      setProfile(data.profile);
      setPosts(data.posts);
      setFollowersCount(data.followersCount);
      setFollowingCount(data.followingCount);
      setIsFollowing(data.isFollowing);
      setPostsCount(data.postsCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleFollow(username) {
    try {
      await followUser(username);
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUnfollow(username) {
    try {
      await unfollowUser(username);
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    profile,
    posts,
    loading,
    followersCount,
    followingCount,
    isFollowing,
    postsCount,
    handleGetProfile,
    handleFollow,
    handleUnfollow,
  };
}
