import { Router, RouterProvider } from "react-router";
import { routes } from "./routes";
import "./features/shared/global.scss"
function App() {
  return <RouterProvider router={routes} />;
}

export default App;
