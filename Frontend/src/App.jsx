import { RouterProvider } from "react-router";
import { routes } from "./routes";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { PostProvider } from "./features/posts/post.context";
function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={routes} />
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
