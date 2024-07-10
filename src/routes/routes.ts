import Home from "../pages/home";
import Settings from "../pages/settings";
import Partners from "../pages/settings/partners";

export interface RouteType {
  path: string;
  Component: React.ComponentType;
}

export const routes: RouteType[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/settings/partners",
    Component: Partners
  }
];
