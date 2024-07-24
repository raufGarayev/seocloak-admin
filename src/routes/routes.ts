import Contents from "../pages/settings/contents";
import Highlights from "../pages/settings/highlights";
import Partners from "../pages/settings/partners";
import EditContent from "../pages/settings/editContent";
import Blogs from "../pages/blogs";
import EditBlog from "../pages/editBlog";
import Gametype from "../pages/gametype";

export interface RouteType {
  path: string;
  Component: React.ComponentType;
}

export const routes: RouteType[] = [
  {
    path: "/slots-1",
    Component: Gametype,
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
  },
  {
    path: '/blogs',
    Component: Blogs
  },
  {
    path: '/blogs/:id',
    Component: EditBlog
  }
];
