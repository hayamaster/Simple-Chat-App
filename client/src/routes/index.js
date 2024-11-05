import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MessagePage from "../components/MessagePage";
import {
  Home,
  RegisterPage,
  CheckEmailPage,
  CheckPasswordPage,
} from "../pages";
import { AuthLayout } from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: "email",
        element: (
          <AuthLayout>
            <CheckEmailPage />
          </AuthLayout>
        ),
      },
      {
        path: "password",
        element: (
          <AuthLayout>
            <CheckPasswordPage />
          </AuthLayout>
        ),
      },
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
