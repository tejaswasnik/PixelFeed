import React, { useState, useRef } from "react";
import "../style/CreatePost.scss";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);
  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];
    await handleCreatePost(file, caption);
    navigate("/feed");
  }
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <main className="create-post-page">
      <div className="create-post-container">
        <form className="create-post-card" onSubmit={handleSubmit}>
          <header className="create-post-header">
            <h2>Create Post</h2>
          </header>

          <div className="create-post-image-area">
            <input
              type="file"
              accept="image/*"
              className="create-post-file-input"
              ref={postImageInputFieldRef}
            />
          </div>

          <footer className="create-post-footer">
            <textarea
              className="create-post-caption"
              placeholder="Write a caption..."
              maxLength={2200}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />

            <div className="create-post-actions">
              <button type="submit" className="create-post-btn submit">
                Upload
              </button>
            </div>
          </footer>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
