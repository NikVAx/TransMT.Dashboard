import { Layout } from "@/layouts/layout";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { mock, PageWidthTemplate, PageUseParamsTemplate } from "@/app/mock";

console.log(mock.routes(3, 3));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: "/pages/cards", element: <>{mock.cards(70)}</> },
      { path: "/pages/full", element: <PageWidthTemplate /> },
      { path: "/pages/:id", element: <PageUseParamsTemplate /> },
    ],
  },
]);
