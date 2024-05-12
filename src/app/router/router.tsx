import { Outlet, createBrowserRouter } from "react-router-dom";
import { PageUseParamsTemplate } from "@/app/mock";
import { Layout } from "@/layouts";
import {
  BuildingCreatePage,
  BuildingListPage,
  GpsDeviceListPage,
  LoginPage,
  OperatorCreatePage,
  OperatorListPage,
  ProfilePage,
  RoleCreatePage,
  RoleEditPage,
  RoleListPage,
  UserCreatePage,
  UserListPage,
  VehicleCreatePage,
  VehicleListPage,
} from "@/pages";
import { ExamplePageCards, ExamplePageMap } from "../mock/examples";
import {
  ProfileSection,
  SessionsSection,
} from "@/pages/profilePage/components";
import { crumb } from "@/components/breadcrumbs/bradcrumbs.types";
import { Breadcrumbs } from "@/components/breadcrumbs";

const DISABLED = true;

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
        <Breadcrumbs />
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
        handle: crumb("Учетные записи", DISABLED),
        children: [
          {
            path: "users",
            element: <UserListPage />,
            handle: crumb("Пользователи"),
          },
          { path: "users/create", element: <UserCreatePage /> },
          { path: "roles", element: <RoleListPage />, handle: crumb("Роли") },
          { path: "roles/create", element: <RoleCreatePage /> },
          { path: "roles/:id/edit", element: <RoleEditPage /> },
        ],
      },
      {
        path: "/entities",
        handle: crumb("Справочники", DISABLED),
        children: [
          {
            path: "buildings",
            element: <BuildingListPage />,
            handle: crumb("Здания"),
          },
          {
            path: "buildings/create",
            element: <BuildingCreatePage />,
            handle: crumb("Создание здания"),
          },
          {
            path: "vehicles",
            element: <VehicleListPage />,
            handle: crumb("Транспортные средства"),
          },
          {
            path: "vehicles/create",
            element: <VehicleCreatePage />,
            handle: crumb("Создание ТС"),
          },
          {
            path: "operators",
            element: <OperatorListPage />,
            handle: crumb("Операторы ТС"),
          },
          {
            path: "operators/create",
            element: <OperatorCreatePage />,
            handle: crumb("Создание оператора ТС"),
          },
          {
            path: "devices",
            element: <GpsDeviceListPage />,
            handle: crumb("GPS Устройства"),
          },
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
