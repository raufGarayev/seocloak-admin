import { Routes, Route } from "react-router-dom";
import { routes, RouteType } from "./routes";
import { useEffect, useState } from "react";
import { getGameTypes } from "../services/gametypes";
import slugify from "slugify";

const Router = () => {

    const [dynRoutes, setDynRoutes] = useState<RouteType[]>([])

    useEffect(() => {
        getGameTypes().then((res) => {
            const newRoutes = res.map((item: any) => ({
                    path: `/${slugify(item.name)}`,
                    Component: () => <div>{item.name}</div>
            }))
            setDynRoutes(newRoutes)
        })
    }, [])

  return (
    <Routes>
      <Route path="/">
        {routes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
        {dynRoutes.map((route: RouteType, index) => (
            <Route key={index} {...route} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
