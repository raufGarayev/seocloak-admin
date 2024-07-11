import React from 'react'
import PageHeader from '../../../components/ui/pageHeader'
import ContentsTable from './components/contentsTable'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { toggleModal } from '../../../store/slices/modalSlices'
import ContentsModal from './components/contentsModal'
import { useNavigate } from 'react-router-dom'

const Contents = () => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleAddContent = () => {
    // dispatch(toggleModal('add'))
    navigate('/settings/contents/0')
  }

  return (
    <>
        <PageHeader title='Contents' btnText='Add' onBtnClick={handleAddContent} />
        <ContentsTable />
        {/* <ContentsModal /> */}
    </>
  )
}

export default Contents