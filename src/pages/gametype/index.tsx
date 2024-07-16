import { useEffect, useState } from 'react'
import PageHeader from '../../components/ui/pageHeader'
import OnlinePartnersTable from './components/onlinePartnersTable'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../store'
import { setGameTypeID } from '../../store/slices/onlinePartnersSlice'
import { fetchOnlinePartnersAction } from '../../store/slices/onlinePartnersSlice/actions'
import OnlinePartnerCopyModal from './components/onlinePartnersCopyModal'

const Gametype = () => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [pageName, setPageName] = useState<string>('Something')
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const {filters} = useSelector((state: IRootStore) => state.onlinePartners)
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(isActive) return;
    const pathSegments = location.pathname.split('/')
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Extracting the number from the segment
    const numberMatch = lastSegment.match(/-(\d+)$/)
    const number = numberMatch ? numberMatch[1] : null

    const selectedGameType = gametypes.find(
      gameType => gameType.id === Number(number)
    )

    dispatch(fetchOnlinePartnersAction(Number(number), filters))
    dispatch(setGameTypeID(Number(number)))
    setPageName(selectedGameType ? selectedGameType.name : 'Slots')
  }, [filters, isActive])

  useEffect(() => {
    setIsActive(false)

    return () => {
      setIsActive(true)
    }
  }, [])

  const handleNewOnlinePartner = () => {
    navigate(`${location.pathname}/0`)
  }

  return (
    <>
      <PageHeader title={pageName} btnText='Add' onBtnClick={handleNewOnlinePartner} />
      <OnlinePartnersTable />
      <OnlinePartnerCopyModal />
    </>
  )
}

export default Gametype
