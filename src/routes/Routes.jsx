import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AskQuestion from "../components/main/AskQuestion";
import StackOverFlow from "../components/main/StackOverFlow";

import React from "react";
import SingleQuestion from "../components/main/SingleQuestion";
import Profile from "../components/profile/Profile";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Layout from "../components/layout/Layout";
import { Guest, ProtectedRoute } from "../utils/checkRoutes";

// function RoutesEle() {
//   const { user, isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<StackOverFlow />} />
//           <Route path="/askquestion" element={<AskQuestion />} />
//           <Route path="/singlequestion" element={<SingleQuestion />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

export default createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <StackOverFlow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/askquestion"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/singlequestion"
          element={
            <ProtectedRoute>
              <SingleQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Guest>
              <Login />
            </Guest>
          }
        />
        <Route
          path="/register"
          element={
            <Guest>
              <Register />
            </Guest>
          }
        />
      </Route>
    </>
  )
);

// export default RoutesEle;
