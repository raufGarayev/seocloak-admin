import Home from "../pages/home";

export interface RouteType {
  path: string;
  Component: React.ComponentType;
}

export const routes: RouteType[] = [
  {
    path: "/",
    Component: Home,
  },
];
