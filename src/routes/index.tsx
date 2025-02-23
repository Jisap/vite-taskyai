import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";


const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  }
]


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: rootRouteChildren
  }
])

export default router