import { Outlet, createBrowserRouter } from "react-router-dom";
import { mock, PageUseFormExample, PageUseParamsTemplate } from "@/app/mock";
import { Layout } from "@/layouts";
import { LoginPage } from "@/pages";

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
      { path: "/pages/example/cards", element: <>{mock.cards(70)}</> },
      { path: "/pages/example/form", element: <PageUseFormExample /> },
      { path: "/pages/:id", element: <PageUseParamsTemplate /> },
      { path: "/pages/:tag/:id", element: <PageUseParamsTemplate /> },
    ],
  },
]);
