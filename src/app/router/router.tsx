import { Outlet, createBrowserRouter } from "react-router-dom";
import { PageUseParamsTemplate } from "@/app/mock";
import { Layout } from "@/layouts";
import {
  BuildingCreatePage,
  BuildingEditPage,
  BuildingListPage,
  DashboardPage,
  GeoZoneCreatePage,
  GeoZoneEditPage,
  GeoZoneListPage,
  GpsDeviceCreatePage,
  GpsDeviceEditPage,
  GpsDeviceListPage,
  LoginPage,
  MapPage,
  OperatorCreatePage,
  OperatorEditPage,
  OperatorListPage,
  ProfilePage,
  ReportByGeoZonePage,
  RoleCreatePage,
  RoleEditPage,
  RoleListPage,
  UserCreatePage,
  UserListPage,
  VehicleCreatePage,
  VehicleEditPage,
  VehicleListPage,
  ReportByVehiclePage
} from "@/pages";
import {
  ProfileSection,
  SessionsSection,
} from "@/pages/profilePage/components";
import { crumb } from "@/components/breadcrumbs/bradcrumbs.types";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ModelingPage } from "@/pages/modelingPage";

const DISABLED = true;

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "modeling",
        element: <ModelingPage />,
      },
    ],
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
          {
            path: "users/create",
            element: <UserCreatePage />,
            handle: crumb("Создание пользователя"),
          },
          { path: "roles", element: <RoleListPage />, handle: crumb("Роли") },
          {
            path: "roles/create",
            element: <RoleCreatePage />,
            handle: crumb("Создание роли"),
          },
          {
            path: "roles/:id/edit",
            element: <RoleEditPage />,
            handle: crumb("Редактирование роли"),
          },
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
            path: "buildings/:id/edit",
            element: <BuildingEditPage />,
            handle: crumb("Редактирование здания"),
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
            path: "vehicles/:id/edit",
            element: <VehicleEditPage />,
            handle: crumb("Редактирование ТС"),
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
            path: "operators/:id/edit",
            element: <OperatorEditPage />,
            handle: crumb("Редактирование оператора ТС"),
          },
          {
            path: "devices",
            element: <GpsDeviceListPage />,
            handle: crumb("GPS Устройства"),
          },
          {
            path: "devices/create",
            element: <GpsDeviceCreatePage />,
            handle: crumb("Создание GPS устройства"),
          },
          {
            path: "devices/:id/edit",
            element: <GpsDeviceEditPage />,
            handle: crumb("Редактирование GPS устройсва"),
          },
          {
            path: "geozones",
            element: <GeoZoneListPage />,
            handle: crumb("Геозоны"),
          },
          {
            path: "geozones/create",
            element: <GeoZoneCreatePage />,
            handle: crumb("Создание геозоны"),
          },
          {
            path: "geozones/:id/edit",
            element: <GeoZoneEditPage />,
            handle: crumb("Редактирование геозоны"),
          },
        ],
      },
      {
        path: "/reports",
        handle: crumb("Отчеты", DISABLED),
        children: [
          {
            path: "by-geozones",
            element: <ReportByGeoZonePage />,
            handle: crumb("Отчет по геозонам"),
          },
          {
            path: "by-vehicles",
            element: <ReportByVehiclePage/>,
            handle: crumb("Отчет по ТС"),
          },
        ],
      },
    ],
  },
]);
