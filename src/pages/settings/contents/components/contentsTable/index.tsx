import { useDispatch, useSelector } from 'react-redux'
import CustomCard from '../../../../../components/common/card'
import CustomTable from '../../../../../components/common/table'
import { contentsColumns } from '../../../../../utils/tableColumns/contentsColumns'
import { AppDispatch, IRootStore } from '../../../../../store'
import { useEffect } from 'react'
import { fetchContentsAction } from '../../../../../store/slices/contentsSlices/actions'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import { setSelectedContent } from '../../../../../store/slices/contentsSlices'
import { IContent } from '../../../../../types/contents'
import { useNavigate } from 'react-router-dom'

const ContentsTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { contents, loading } = useSelector(
    (state: IRootStore) => state.contents
  )
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchContentsAction())
  }, [])

  const handleEditContent = (content: IContent) => {
    console.log("content")
    dispatch(setSelectedContent(content))
    // dispatch(toggleModal('edit'))
    navigate(`/settings/contents/${content.id}`)
  }

  const handleDelContent = (content: IContent) => {
    dispatch(setSelectedContent(content))
    dispatch(toggleModal({type: 'del'}))
  }

  return (
    <CustomCard>
      <CustomTable
        columns={contentsColumns(handleEditContent, handleDelContent)}
        data={contents}
        loading={loading}
      />
    </CustomCard>
  )
}

export default ContentsTable
