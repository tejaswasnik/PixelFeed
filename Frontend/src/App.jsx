import { RouterProvider } from "react-router";
import { routes } from "./routes";
import "./features/shared/global.scss";
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;