import PageHeader from '../../../components/ui/pageHeader'
import HighlightsTable from './components/highlightsTable'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { toggleModal } from '../../../store/slices/modalSlices'
import HighlightsModal from './components/highlightsModal'

const Highlights = () => {

    const dispatch = useDispatch<AppDispatch>()
    const handleAddBtnClick = () => {
        dispatch(toggleModal('add'))
    }

  return (
    <>
        <PageHeader title='Highlights' btnText='Add' onBtnClick={handleAddBtnClick} />
        <HighlightsTable />
        <HighlightsModal />
    </>
  )
}

export default Highlights