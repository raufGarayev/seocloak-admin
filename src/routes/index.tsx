import { Routes, Route } from 'react-router-dom'
import { routes, RouteType } from './routes'
import { useEffect, useState } from 'react'
import { fetchGameTypes } from '../services/gametypes'
import slugify from 'slugify'
import Gametype from '../pages/gametype'
import { useSelector } from 'react-redux'
import { IRootStore } from '../store'

const Router = () => {
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const [dynRoutes, setDynRoutes] = useState<RouteType[]>([])

  useEffect(() => {
      const newRoutes = gametypes.map((item: any) => ({
        path: `/${slugify(item.name, {lower: true})}-${item.id}`,
        Component: () => <Gametype />
      }))
      setDynRoutes(newRoutes)

  }, [gametypes])

  return (
    <Routes>
      <Route path='/'>
        {routes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
        {dynRoutes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
      </Route>
    </Routes>
  )
}

export default Router
