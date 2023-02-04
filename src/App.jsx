import { Route, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import router from "./routes/Routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
