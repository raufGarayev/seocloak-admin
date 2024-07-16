import { useEffect } from 'react'
import CustomCard from '../../../../../components/common/card'
import CustomTable from '../../../../../components/common/table'
import { highlightsColumns } from '../../../../../utils/tableColumns/highlightsColumns'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../../store'
import { fetchHighlightsAction } from '../../../../../store/slices/highlightsSlices/actions'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import { setSelectedHighlight } from '../../../../../store/slices/highlightsSlices'
import { IHighlight } from '../../../../../types/highlights'

const HighlightsTable = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {highlights, loading} = useSelector((state: IRootStore) => state.highlights)
    
    useEffect(() => {
        dispatch(fetchHighlightsAction())
    }, [])

    const handleEditHighlight = (hghlght: IHighlight) => {
        dispatch(setSelectedHighlight(hghlght))
        dispatch(toggleModal({type: 'edit'}))
    }

    const handleDelHighlight = (hghlght: IHighlight) => {
        dispatch(setSelectedHighlight(hghlght))
        dispatch(toggleModal({type: 'del'}))
    }

  return (
    <CustomCard>
        <CustomTable columns={highlightsColumns(handleEditHighlight, handleDelHighlight)} data={highlights} loading={loading} />
    </CustomCard>
  )
}

export default HighlightsTable