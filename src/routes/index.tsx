import AppLayout from "@/layouts/AppLayout";
import RootLayout from "@/layouts/RootLayout";
import AuthSyncPage from "@/pages/AuthSyncPage";
import HomePage from "@/pages/HomePage";
import InboxPage from "@/pages/InboxPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import RootErrorBoundary from "@/pages/RootErrorBoundary";
import { createBrowserRouter } from "react-router";
import type { RouteObject } from "react-router";
import appAction from "@/routes/actions/appAction";
import inboxTaskLoader from "./loaders/inboxLoaders";

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "register",
    element: <RegisterPage/>
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "auth-sync",
    element: <AuthSyncPage />
  }
];

const appRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
    loader: inboxTaskLoader
  }
];


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction
  }
])

export default router