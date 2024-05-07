import { Outlet, createBrowserRouter } from "react-router-dom";
import { PageUseParamsTemplate } from "@/app/mock";
import { Layout } from "@/layouts";
import {
  BuildingListPage,
  LoginPage,
  ProfilePage,
  RoleCreatePage,
  RoleEditPage,
  RoleListPage,
  UserCreatePage,
  UserListPage,
  VehicleListPage,
} from "@/pages";
import { ExamplePageCards, ExamplePageMap } from "../mock/examples";
import {
  ProfileSection,
  SessionsSection,
} from "@/pages/profilePage/components";
import { BuildingCreatePage } from "@/pages/buildingCreatePage/buildingCreatePage";

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
      {
        path: "/accounts",
        element: <ProfilePage />,
        children: [
          { path: "me", element: <ProfileSection /> },
          { path: "sessions", element: <SessionsSection /> },
        ],
      },
      { path: "/pages/:id", element: <PageUseParamsTemplate /> },
      {
        path: "/identity",
        children: [
          { path: "users", element: <UserListPage /> },
          { path: "users/create", element: <UserCreatePage /> },
          { path: "roles", element: <RoleListPage /> },
          { path: "roles/create", element: <RoleCreatePage /> },
          { path: "roles/:id/edit", element: <RoleEditPage /> },
        ],
      },
      {
        path: "/entities",
        children: [
          { path: "buildings", element: <BuildingListPage /> },
          { path: "buildings/create", element: <BuildingCreatePage /> },
          { path: "vehicles", element: <VehicleListPage /> },
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
