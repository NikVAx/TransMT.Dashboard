import { Outlet, createBrowserRouter } from "react-router-dom";
import { PageUseParamsTemplate } from "@/app/mock";
import { Layout } from "@/layouts";
import {
  LoginPage,
  ProfilePage,
  RoleCreatePage,
  RoleListPage,
  UserCreatePage,
  UserListPage,
} from "@/pages";
import { ExamplePageCards, ExamplePageMap } from "../mock/examples";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "/accounts/me", element: <ProfilePage /> },
      { path: "/pages/:id", element: <PageUseParamsTemplate /> },
      {
        path: "/identity",
        children: [
          { path: "users", element: <UserListPage /> },
          { path: "users/create", element: <UserCreatePage /> },
          { path: "roles", element: <RoleListPage /> },
          { path: "roles/create", element: <RoleCreatePage /> },
        ],
      },
      {
        path: "/examples",
        children: [
          { path: "cards", element: <ExamplePageCards /> },
          { path: "map", element: <ExamplePageMap /> },
        ],
      },
    ],
  },
]);
