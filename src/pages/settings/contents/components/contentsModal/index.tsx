import CustomModal from '../../../../../components/common/modal'
import { Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../../store'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import { useEffect } from 'react'
import { deleteContentAction } from '../../../../../store/slices/contentsSlices/actions'
import {
  setSelectedContent,
  setSelectedContents
} from '../../../../../store/slices/contentsSlices'

const ContentsModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { type, hint } = useSelector((state: IRootStore) => state.modal)
  const { selectedContent, selectedContents } = useSelector(
    (state: IRootStore) => state.contents
  )
  const [form] = Form.useForm()

  const handleModalSubmit = () => {
    if (hint === 'multi') {
      dispatch(
        deleteContentAction(selectedContents.map(content => content.id))
      ).then(() => {
        dispatch(toggleModal(null))
        dispatch(setSelectedContents([]))
      })
    } else {
      if (selectedContent) {
        dispatch(deleteContentAction(selectedContent?.id)).then(() => {
          dispatch(toggleModal(null))
          dispatch(setSelectedContent(null))
          form.resetFields()
        })
      }
    }
  }

  const handleModalCancel = () => {
    dispatch(toggleModal(null))
    dispatch(setSelectedContent(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue({
      ...selectedContent,
      type: selectedContent?.type?.toString()
    })
  }, [selectedContent])

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header={`${type === 'edit' ? 'Edit' : 'Add'} content`}
      saveBtnText='Save'
      cancelBtnText='Cancel'
      rootClass='contentsModal'
    >
      <></>
    </CustomModal>
  )
}

export default ContentsModal
