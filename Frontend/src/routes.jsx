import { createBrowserRouter } from "react-router";
import Landing from "./features/landing/pages/Landing";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import FeedPage from "./features/posts/pages/FeedPage";
import CreatePost from "./features/posts/pages/CreatePost";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (<Landing />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/register",
    element: (<Register />),
  },
  {
    path: "/feed",
    element: (<FeedPage />),
  },
  {
    path: "/create",
    element: (<CreatePost/>)
  }
]);
