# PixelFeed

A modern, production-grade, full-stack social media platform inspired by Instagram. PixelFeed enables users to seamlessly register accounts, manage profiles, upload images to a cloud CDN, interact with posts via likes, and follow or unfollow other users to customize their social experience.


## Why This Project Matters

PixelFeed is not just a CRUD application; it represents a production-quality full-stack engineering effort designed with scalability, security, and clean separation of concerns in mind. Key highlights of the software engineering expertise demonstrated in this codebase:

*   **Secure Authentication Architecture**: Replaces vulnerable `localStorage` authentication patterns with secure, HTTP-only cookie-based JWT transmission. This mitigates Cross-Site Scripting (XSS) risks and keeps user credentials private.
*   **Stateless Image Upload Pipeline**: Integrates `Multer` memory storage with the `ImageKit` Node.js SDK to pipe raw file buffers directly to a global CDN. This keeps the backend server stateless and prevents server disk bloat.
*   **Optimized Aggregation & Feed Generation**: Leverages Mongoose populate queries and batch processing to build a personalized global feed, resolving user details and like states dynamically on the fly.
*   **Database Constraints & Integrity**: Enforces compound database indices with strict unique constraints on Follows and Likes to prevent duplicate data insertion, ensuring integrity even in high-concurrency environments.

---

## Tech Stack

PixelFeed is engineered using a robust modern stack split across a decoupled client-server architecture:

### Frontend
*   **React 19 & React Router 7**: Component-driven SPA architecture with client-side routing.
*   **SCSS**: Clean styling with modular layouts, custom responsive breakpoints, CSS variables, and consistent visual branding.
*   **Axios**: Configured client with `withCredentials: true` to support automatic HTTP-only cookie transmission.

### Backend
*   **Node.js & Express.js**: Fast, stateless REST API architecture with modular routers.
*   **MongoDB & Mongoose**: Flexible, schema-backed Document Database for managing application state.
*   **JWT & BcryptJS**: Industry-standard secure token authentication and salted password hashing (10 salt rounds).
*   **Multer & ImageKit**: Streamlined media ingestion pipeline to upload image assets directly to the cloud.

---

## Key Features

*   **Authentication & Security**: Complete registration, login, and token validation flow. Passwords are securely hashed before storing, and sessions are persisted via secure browser cookies.
*   **Stateless Media Uploads**: Fast, on-the-fly uploads of post images using memory buffering. No temporary files are stored on the server disk.
*   ** Personalized Feed**: Dynamic, chronologically sorted feed of posts from across the platform, including post creator info and live user-like indicators.
*   **Social Relationships**: Follow and unfollow users to adjust follower/following counts in real-time, managed cleanly through independent link models.
*   **Live Interactions**: Single-tap like and unlike options with database-level uniqueness enforcement.
*   **Comprehensive Profiles**: Dedicated user spaces listing user bios, gender metrics, total post counts, follower list sizes, and a visual grid of their uploaded posts.

---

## Project Architecture & Folder Structure

PixelFeed follows a clean directory separation, organizing the client (`Frontend`) and API (`Backend`) separately to make deployment and updates independent.

```text
PixelFeed/
├── Backend/
│   ├── src/
│   │   ├── app.js               # Express application initialization & middleware
│   │   ├── config/
│   │   │   └── database.js      # Mongoose MongoDB connection helper
│   │   ├── controllers/
│   │   │   ├── auth.controller.js # Registration, login, and current user retrieval
│   │   │   ├── post.controller.js # Post creation, feeds, and likes handlers
│   │   │   └── user.controller.js # Profiles and follower relationship handlers
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js # JWT verification and request injection middleware
│   │   ├── models/
│   │   │   ├── follow.model.js  # Schema for follower/followee relationships
│   │   │   ├── like.model.js    # Schema mapping users to liked posts
│   │   │   ├── post.model.js    # Schema for image URLs and captions
│   │   │   └── user.model.js    # Schema for user credentials, details, and default avatars
│   │   └── routes/
│   │       ├── auth.routes.js   # Route mappings for registration/login
│   │       ├── post.routes.js   # Route mappings for post creation, likes, and feed
│   │       └── user.routes.js   # Route mappings for user profile and follows
│   ├── server.js                # Main server listener (runs on Port 3000)
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx             # React DOM root render
│   │   ├── App.jsx              # Main App entry point
│   │   ├── routes.jsx           # React Router paths configuration
│   │   └── features/
│   │       ├── auth/            # Auth pages (Login, Register), context API, and CSS
│   │       ├── landing/         # Splash landing page with responsive entry buttons
│   │       ├── posts/           # Feed viewer and new post upload components
│   │       ├── shared/          # Navigation Bar, loading spinners, and global styling
│   │       └── users/           # Profile page displaying metrics and personal posts
│   ├── index.html
│   ├── vite.config.js           # Vite development and production configuration
│   └── package.json
```

---

## API Overview

All routes except `/api/auth/register` and `/api/auth/login` require a valid JWT token passed automatically in the request cookies.

### Authentication Router (`/api/auth`)

| Method | Endpoint | Auth Required | Payload Format | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | No | `JSON` | Registers a new user, hashes password, sets a JWT cookie, and returns user details. |
| `POST` | `/login` | No | `JSON` | Verifies user credentials, sets a JWT cookie, and returns user details. |
| `GET` | `/getMe` | Yes | None | Decodes the JWT token cookie and returns the currently logged-in user's profile. |

### Posts Router (`/api/posts`)

| Method | Endpoint | Auth Required | Payload Format | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Yes | `multipart/form-data` | Uploads post image to ImageKit using memory buffer, and saves post data. |
| `GET` | `/` | Yes | None | Retrieves all posts authored by the authenticated user. |
| `GET` | `/feed` | Yes | None | Retrieves the global chronological post feed populated with like statuses. |
| `GET` | `/:postId` | Yes | None | Retrieves details for a specific post. |
| `POST` | `/like/:postId` | Yes | None | Registers a like status on the designated post for the logged-in user. |
| `POST` | `/unlike/:postId` | Yes | None | Removes a like status on the designated post. |

### Users Router (`/api/users`)

| Method | Endpoint | Auth Required | Payload Format | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/profile/:username`| Yes | None | Fetches profile stats (followers, following, posts) and post list for a username. |
| `POST` | `/follow/:followee` | Yes | None | Creates a follower relationship entry mapping the current user to the followee. |
| `POST` | `/unfollow/:followee`| Yes | None | Deletes the follower relationship entry. |

---

## Database Schema Design

PixelFeed uses structured Mongoose schemas to establish data models in MongoDB.

### User Model
```javascript
{
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Omitted from query results by default
  bio: { type: String, default: "" },
  profilePicture: { type: String, default: "default-avatar-url" }
}
```

### Post Model
```javascript
{
  caption: { type: String, default: "" },
  imgURL: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }
}
```

### Like Model
```javascript
{
  post: { type: mongoose.Schema.Types.ObjectId, ref: "posts", required: true },
  username: { type: String, required: true }
}
// Compound Index: Enforces uniqueness for (post, username) to avoid multiple likes
```

### Follow Model
```javascript
{
  follower: { type: String, required: true },
  followee: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}
// Compound Index: Enforces uniqueness for (follower, followee) to avoid multiple follow records
```

---

## Technical Challenges & Engineering Solutions

### 1. XSS Vulnerability Prevention (Secure JWTs)
*   **The Challenge**: Traditional SPA storage (like storing JWT in `localStorage` or `sessionStorage`) is vulnerable to Cross-Site Scripting (XSS) scripts accessing tokens and hijacking user sessions.
*   **The Solution**: We implemented cookie-based JWT delivery in the login/registration controller. The server issues a token payload inside an `httpOnly` cookie. This makes it impossible for client-side JavaScript to read the token. The browser automatically appends the token to all Axios backend requests, ensuring stateless verification through backend middleware while shielding the credential.

### 2. Stateless File Uploads to the Cloud (No Local Server Storage)
*   **The Challenge**: Storing uploaded user images on the backend server's local file system leads to architectural bloat, renders horizontal server scaling impossible, and risks data loss on server restart.
*   **The Solution**: Multer is configured to use memory storage (`multer.memoryStorage()`) rather than disk storage. The incoming image buffer is instantly streamed using `@imagekit/nodejs` to ImageKit's globally distributed CDN. The server simply stores the resulting ImageKit URL in MongoDB, keeping the API layer completely stateless and fast.

### 3. Preventing Duplicate Relationships & Race Conditions
*   **The Challenge**: In high-latency networks, a user might double-tap a follow or like button before the UI disables it. This can bypass standard app-level uniqueness checks, generating duplicate rows, skewing metrics, and corrupting counts.
*   **The Solution**: We created database-level constraints using compound indexes inside MongoDB:
    *   `likeSchema.index({ post: 1, username: 1 }, { unique: true })`
    *   `followSchema.index({ follower: 1, followee: 1 }, { unique: true })`
    If a duplicate request passes the controller checks, MongoDB instantly rejects the query with a duplicate key error code (`11000`), protecting schema statistics.

---

## Installation & Setup

Follow these steps to set up and run PixelFeed locally:

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm (v9 or higher)
*   MongoDB Atlas cluster (or local MongoDB instance)
*   ImageKit account (for uploading images)

### 1. Clone the Repository
```bash
git clone https://github.com/tejaswasnik/PixelFeed.git
cd PixelFeed
```

### 2. Set Up the Backend
1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pixelfeed
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=http://localhost:5173
   IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxx
   IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxx
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
   ```
4. Start the backend server in development mode:
   ```bash
   npm run dev
   ```

### 3. Set Up the Frontend
1. Open a new terminal and navigate to the `Frontend` folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_AUTH_BASE_URL=http://localhost:3000/api/auth
   VITE_POST_BASE_URL=http://localhost:3000/api/posts
   VITE_USER_BASE_URL=http://localhost:3000/api/users
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` to explore PixelFeed!

---

## Future Roadmap

- [ ] **Comments System**: Allow users to write and view chronological comments on posts.
- [ ] **Dynamic Search**: Real-time search bar on the navbar to find other users by username.
- [ ] **Real-time Notifications**: Socket.io integration to alert users immediately when they receive likes or new followers.
- [ ] **Dark Mode / Theme Customization**: HSL-based custom styling to toggle dark mode natively.

---

## Visual Mockups

*Since this is a portfolio-ready project, the visual design is crafted to be clean, modern, and fully responsive:*

```text
┌────────────────────────────────────────────────────────┐
│  📸 PixelFeed                     🔍 Search    👤 Profile│
├────────────────────────────────────────────────────────┤
│                                                        │
│   ┌──────────────────────┐      ┌────────────────────┐ │
│   │ @jane_doe            │      │ @john_smith        │ │
│   ├──────────────────────┤      ├────────────────────┤ │
│   │                      │      │                    │ │
│   │                      │      │                    │ │
│   │       [IMAGE]        │      │       [IMAGE]      │ │
│   │                      │      │                    │ │
│   │                      │      │                    │ │
│   ├──────────────────────┤      ├────────────────────┤ │
│   │ ❤️ Like    💬 Comment │      │ ❤️ Like    💬 Comment│ │
│   │ "Beautiful sunset!"  │      │ "Exploring SF!"    │ │
│   └──────────────────────┘      └────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---