import PageHeader from '../../../components/ui/pageHeader'
import PartnersTable from './components/partnersTable'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { toggleModal } from '../../../store/slices/modalSlices'
import PartnersModal from './components/partnersModal'

const Partners = () => {

  const dispatch = useDispatch<AppDispatch>()

  const handlePartnerAdd = () => {
    dispatch(toggleModal('add'))
  }

  return (
    <>
        <PageHeader title='Partners' btnText='Add' onBtnClick={handlePartnerAdd} />
        <PartnersTable />
        <PartnersModal />
    </>
  )
}

export default Partners