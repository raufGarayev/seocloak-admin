import Contents from "../pages/settings/contents";
import Home from "../pages/home";
import Highlights from "../pages/settings/highlights";
import Partners from "../pages/settings/partners";
import EditContent from "../pages/settings/editContent";

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
  },
  {
    path: "/settings/highlights",
    Component: Highlights
  },
  {
    path: "/settings/contents",
    Component: Contents
  },
  {
    path: "/settings/contents/:id",
    Component: EditContent
  }
];
