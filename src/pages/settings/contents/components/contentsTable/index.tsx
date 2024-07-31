import { useDispatch, useSelector } from 'react-redux'
import CustomCard from '../../../../../components/common/card'
import CustomTable from '../../../../../components/common/table'
import { contentsColumns } from '../../../../../utils/tableColumns/contentsColumns'
import { AppDispatch, IRootStore } from '../../../../../store'
import { useEffect, useState } from 'react'
import {
  createContentAction,
  fetchContentsAction
} from '../../../../../store/slices/contentsSlices/actions'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import {
  setSelectedContent,
  setSelectedContents
} from '../../../../../store/slices/contentsSlices'
import { IContent } from '../../../../../types/contents'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip } from 'antd'
import { FaCopy, FaTrash } from 'react-icons/fa'

const ContentsTable = () => {
  const [multiSelectMode, setMultiSelectMode] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { contents, loading, selectedContents } = useSelector(
    (state: IRootStore) => state.contents
  )
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchContentsAction())
  }, [])

  const handleEditContent = (content: IContent) => {
    dispatch(setSelectedContent(content))
    navigate(`/settings/contents/${content.id}`)
  }

  const handleDelContent = (content: IContent) => {
    dispatch(setSelectedContent(content))
    dispatch(toggleModal({ type: 'del' }))
  }

  const handleMultiDel = () => {
    dispatch(toggleModal({ type: 'del', hint: 'multi' }))
  }

  const handleMultiCopyHere = () => {
    dispatch(
      createContentAction(
        selectedContents.map((content: any) => ({
          ...content,
          id: undefined,
          type: content.type === 1 ? 2 : 1
        }))
      )
    ).then(() => {
      setMultiSelectMode(false)
      dispatch(setSelectedContents([]))
    })
  }

  const handleSelect = (selectedRowKeys: any, status: boolean) => {
    if (selectedRowKeys !== 'all') {
      if (status) {
        dispatch(setSelectedContents([...selectedContents, selectedRowKeys]))
      } else {
        dispatch(
          setSelectedContents(
            selectedContents.filter(
              (content: any) => content.id !== selectedRowKeys.id
            )
          )
        )
      }
    } else {
      if (status) {
        dispatch(setSelectedContents(contents))
      } else {
        dispatch(setSelectedContents([]))
      }
    }
  }

  const handleCopyContent = (content: IContent) => {
    dispatch(
      createContentAction({
        ...content,
        id: undefined,
        type: content.type === 1 ? 2 : 1
      })
    )
  }

  return (
    <CustomCard>
      <div className='btnsContainer'>
        <Button
          onClick={() => setMultiSelectMode(!multiSelectMode)}
          disabled={contents.length === 0}
        >
          Multi select
        </Button>
        {multiSelectMode && (
          <>
            <Tooltip title='Delete selected'>
              <div className='btnsContainer__btn' onClick={handleMultiDel}>
                <FaTrash className='deleteIcon' />
              </div>
            </Tooltip>
            <Tooltip title='Copy selected here'>
              <div className='btnsContainer__btn' onClick={handleMultiCopyHere}>
                <FaCopy className='copyIcon' />
              </div>
            </Tooltip>
          </>
        )}
      </div>
      <CustomTable
        columns={contentsColumns(
          handleEditContent,
          handleDelContent,
          handleCopyContent,
          multiSelectMode,
          selectedContents,
          contents,
          handleSelect
        )}
        data={contents}
        loading={loading}
      />
    </CustomCard>
  )
}

export default ContentsTable
