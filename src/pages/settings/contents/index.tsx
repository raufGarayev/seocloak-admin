import PageHeader from '../../../components/ui/pageHeader'
import ContentsModal from './components/contentsModal'
import ContentsTable from './components/contentsTable'
import { useNavigate } from 'react-router-dom'

const Contents = () => {

  const navigate = useNavigate()

  const handleAddContent = () => {
    // dispatch(toggleModal('add'))
    navigate('/settings/contents/0')
  }

  return (
    <>
        <PageHeader title='Contents' btnText='Add' onBtnClick={handleAddContent} />
        <ContentsTable />
        <ContentsModal />
    </>
  )
}

export default Contents