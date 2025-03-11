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
import TodayTaskPage from "@/pages/TodayTaskPage";
import todayTaskLoader from "./loaders/todayTaskLoader";
import UpcomingTaskPage from "@/pages/UpcomingTaskPage";
import upcomingTaskLoader from "./loaders/upcomingTaskLoader";
import CompletedTaskPage from "@/pages/CompletedTaskPage";
import completedTaskLoader from "./loaders/completedTaskLoader";
import projectAction from "./actions/projectAction";

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
  },{
    path: 'today',
    element: <TodayTaskPage />,
    loader: todayTaskLoader,
  },
  {
    path: 'upcoming',
    element: <UpcomingTaskPage />,
    loader: upcomingTaskLoader,
  },
  {
    path: 'completed',
    element: <CompletedTaskPage />,
    loader: completedTaskLoader,
  },
  {
    path: "projects",
    action: projectAction
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