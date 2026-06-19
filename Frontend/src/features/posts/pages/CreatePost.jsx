import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { createPost } from "../services/api.post";
import "../style/CreatePost.scss";

const CreatePost = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const displayUser = user || {
        username: "anonymous",
        profilePicture:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop",
    };

    const processFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }
        setError("");
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => processFile(e.target.files[0]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        processFile(e.dataTransfer.files[0]);
    };

    const clearImage = (e) => {
        e.stopPropagation();
        setImage(null);
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setError("An image is required to create a post.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("imgURL", image);
            formData.append("caption", caption);
            await createPost(formData);
            navigate("/feed");
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to create post. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="create-post-page">
            <div className="create-post-container">
                <form onSubmit={handleSubmit} className="create-post-card">
                    {/* ── Header ── */}
                    <header className="create-post-header">
                        <div className="create-post-user">
                            <img
                                src={displayUser.profilePicture}
                                alt="User Profile"
                                className="create-post-user-image"
                            />
                            <span className="create-post-username">
                                {displayUser.username}
                            </span>
                        </div>
                        <span className="create-post-badge">New Post</span>
                    </header>

                    {/* ── Image area ── */}
                    <div
                        className={`create-post-image-area${isDragging ? " dragging" : ""}`}
                        onClick={!imagePreview ? () => fileInputRef.current.click() : undefined}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />

                        {imagePreview ? (
                            <div className="create-post-preview-wrapper">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="create-post-preview-img"
                                />
                                <button
                                    type="button"
                                    className="create-post-clear-btn"
                                    onClick={clearImage}
                                    aria-label="Remove Image"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="create-post-upload-prompt">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="upload-icon"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <p className="upload-main">
                                    Drag & drop your photo, or click to browse
                                </p>
                                <p className="upload-sub">Supports JPEG, PNG, WEBP</p>
                            </div>
                        )}
                    </div>

                    {/* ── Footer ── */}
                    <footer className="create-post-footer">
                        <textarea
                            className="create-post-caption"
                            placeholder="Write a caption..."
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            maxLength={2200}
                        />

                        {error && <div className="create-post-error">{error}</div>}

                        <div className="create-post-actions">
                            <button
                                type="button"
                                className="create-post-btn cancel"
                                onClick={() => navigate("/feed")}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="create-post-btn submit"
                                disabled={loading || !image}
                            >
                                {loading ? "Posting…" : "Share"}
                            </button>
                        </div>
                    </footer>
                </form>
            </div>
        </main>
    );
};

export default CreatePost;
