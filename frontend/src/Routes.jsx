import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import Ranking from "./pages/Ranking";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

function Routes() {
  const { token } = useContext(AuthContext);
  
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/game/:boardId",
          element: <Game />,
        },
        {
          path: "/ranking/:boardId",
          element: <Ranking />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;
