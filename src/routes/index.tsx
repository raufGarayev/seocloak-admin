import { Routes, Route, Navigate } from 'react-router-dom'
import { routes, RouteType } from './routes'
import { useEffect, useState } from 'react'
import slugify from 'slugify'
import Gametype from '../pages/gametype'
import { useSelector } from 'react-redux'
import { IRootStore } from '../store'
import EditOnlinePartner from '../pages/editOnlinePartner'

const Router = () => {
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const [gametypeRoutes, setGametypeRoutes] = useState<RouteType[]>([])
  const [dynGametypeRoutes, setDynGametypeRoutes] = useState<RouteType[]>([])

  useEffect(() => {
      const newRoutes = gametypes.map((item: any) => ({
        path: `/${slugify(item.name, {lower: true})}-${item.id}`,
        Component: () => <Gametype />
      }))
      setGametypeRoutes(newRoutes)

      const newDynRoutes = gametypes.map((item: any) => ({
        path: `/${slugify(item.name, {lower: true})}-${item.id}/:id`,
        Component: () => <EditOnlinePartner />
      }))
      setDynGametypeRoutes(newDynRoutes)
  }, [gametypes])

  return (
    <Routes>
      <Route path='/' element={<Navigate to="/slots-1" replace />} />
        {routes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
        {gametypeRoutes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
        {dynGametypeRoutes.map((route: RouteType, index) => (
          <Route key={index} {...route} />
        ))}
    </Routes>
  )
}

export default Router
