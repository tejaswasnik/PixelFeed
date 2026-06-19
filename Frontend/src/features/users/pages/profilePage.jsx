import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../../shared/Navbar";
import "../style/profilePage.scss";

const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const {
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
  } = useProfile();

  const [followLoading, setFollowLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleGetProfile(username);
  }, [username]);

  useEffect(() => {
    if (profile) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [profile]);

  const isOwnProfile = user?.username === username;

  const onFollowClick = async () => {
    setFollowLoading(true);
    if (isFollowing) {
      await handleUnfollow(username);
    } else {
      await handleFollow(username);
    }
    setFollowLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const genderIcon = (gender) => {
    switch (gender) {
      case "male":
        return "♂";
      case "female":
        return "♀";
      default:
        return "⚧";
    }
  };

  if (loading || !profile) {
    return (
      <>
        <Navbar />
        <main className="profile-page">
          <div className="profile-loading">
            <div className="profile-loading-spinner"></div>
            <p>Loading profile...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <div className={`profile-container ${visible ? "fade-in" : ""}`}>
        {/* ─── Header Card ─── */}
        <div className="profile-card">
          <div className="profile-card-bg"></div>
          <div className="profile-card-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrapper">
                <img
                  src={profile.profilePicture}
                  alt={`${profile.username}'s avatar`}
                  className="profile-avatar"
                  id="profile-avatar"
                />
                <div className="profile-avatar-ring"></div>
              </div>
            </div>

            <div className="profile-info-section">
              <div className="profile-name-row">
                <div>
                  <h1 className="profile-name" id="profile-name">
                    {profile.name}
                  </h1>
                  <span className="profile-username" id="profile-username">
                    @{profile.username}
                  </span>
                </div>
                {!isOwnProfile && (
                  <button
                    className={`profile-follow-btn ${isFollowing ? "following" : ""}`}
                    onClick={onFollowClick}
                    disabled={followLoading}
                    id="profile-follow-btn"
                  >
                    {followLoading ? (
                      <span className="btn-spinner"></span>
                    ) : isFollowing ? (
                      "Following"
                    ) : (
                      "Follow"
                    )}
                  </button>
                )}
              </div>

              {profile.bio && (
                <p className="profile-bio" id="profile-bio">
                  {profile.bio}
                </p>
              )}

              <div className="profile-meta">
                <div className="profile-meta-item" id="profile-email">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{profile.email}</span>
                </div>

                <div className="profile-meta-item" id="profile-gender">
                  <span className="gender-icon">
                    {genderIcon(profile.gender)}
                  </span>
                  <span>
                    {profile.gender.charAt(0).toUpperCase() +
                      profile.gender.slice(1)}
                  </span>
                </div>

                <div className="profile-meta-item" id="profile-joined">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  <span>Joined {formatDate(profile.createdAt)}</span>
                </div>
              </div>

              <div className="profile-stats">
                <div className="profile-stat" id="profile-posts-count">
                  <span className="stat-value">{postsCount}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat-divider"></div>
                <div className="profile-stat" id="profile-followers-count">
                  <span className="stat-value">{followersCount}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-divider"></div>
                <div className="profile-stat" id="profile-following-count">
                  <span className="stat-value">{followingCount}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Posts Grid ─── */}
        <div className="profile-posts-section">
          <div className="profile-posts-header">
            <div className="posts-header-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              <span>Posts</span>
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="profile-no-posts">
              <div className="no-posts-icon">📷</div>
              <p>No posts yet</p>
              <span>When {profile.name} shares photos, they'll appear here.</span>
            </div>
          ) : (
            <div className="profile-posts-grid" id="profile-posts-grid">
              {posts.map((post) => (
                <div className="profile-post-item" key={post._id}>
                  <img
                    src={post.imgURL}
                    alt={post.caption || "Post"}
                    className="profile-post-image"
                    loading="lazy"
                  />
                  <div className="profile-post-overlay">
                    {post.caption && (
                      <p className="profile-post-caption">{post.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </main>
    </>
  );
};

export default ProfilePage;
