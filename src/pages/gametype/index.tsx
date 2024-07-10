import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/ui/pageHeader'
import OnlinePartnersTable from './components/onlinePartnersTable'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootStore } from '../../store'

const Gametype = () => {
  const [pageName, setPageName] = useState<string>('')
  const {gametypes} = useSelector((state: IRootStore) => state.gametypes)
  const location = useLocation()

  useEffect(() => {
    // Extracting the last part of the pathname
    // Extracting the last part of the pathname
    const pathSegments = location.pathname.split('/')
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Extracting the number from the segment
    const numberMatch = lastSegment.match(/-(\d+)$/)
    const number = numberMatch ? numberMatch[1] : null

    const selectedGameType = gametypes.find((gameType) => gameType.id === Number(number))
    setPageName(selectedGameType ? selectedGameType.name : 'Test')
  }, [])

  return (
    <>
      <PageHeader title={pageName} />
      <OnlinePartnersTable />
    </>
  )
}

export default Gametype
