import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import MyCourses from "./pages/MyCourses";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <Layout />,
    loader: checkLogin,
    children: [
      {
        path: "",
        element: <Courses />,
      },
      {
        path: "addCourse",
        element: <AddCourse />,
      },
      {
        path: "mycourses",
        element: <MyCourses />,
      },
    ],
  },
]);

export default router;
