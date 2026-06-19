import React, { useState } from "react";
import "../style/Post.scss";
import { likePost, unLikePost } from "../services/api.post";

const Post = ({ user, post } = {}) => {
  const [liked, setLiked] = useState(post?.isLiked || false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await unLikePost(post._id);
        setLiked(false);
      } else {
        await likePost(post._id);
        setLiked(true);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleImageDoubleClick = async () => {
    if (!liked) {
      try {
        await likePost(post._id);
        setLiked(true);
      } catch (error) {
        console.error(error);
      }
    }

    setShowHeartOverlay(true);

    setTimeout(() => {
      setShowHeartOverlay(false);
    }, 800);
  };

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-user">
          <img
            src={user.profilePicture}
            alt="User Profile"
            className="post-user-image"
          />
          <span className="post-username">{user.username}</span>
        </div>
      </header>

      <div
        className="post-image-container"
        onDoubleClick={handleImageDoubleClick}
      >
        <img
          src={post.imgURL}
          alt="Post"
          className="post-image"
          loading="lazy"
        />
        {showHeartOverlay && (
          <div className="post-heart-overlay">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        )}
      </div>

      <footer className="post-footer">
        <div className="post-actions">
          <div className="post-actions-left">
            {/* Like */}
            <button
              onClick={handleLike}
              className={`post-action-btn like-btn ${liked ? "is-liked" : ""}`}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>

            {/* Comment */}
            <button
              className="post-action-btn comment-btn"
              aria-label="Comment"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </button>

            {/* Share */}
            <button className="post-action-btn share-btn" aria-label="Share">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        <p className="post-caption">
          <span className="post-username">{user.username}</span> {post.caption}
        </p>
      </footer>
    </article>
  );
};

export default Post;
