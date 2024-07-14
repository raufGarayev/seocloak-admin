import CustomModal from '../../../../../components/common/modal'
import { Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../../store'
import './highlightsModal.sass'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import { setSelectedHighlight } from '../../../../../store/slices/highlightsSlices'
import { useEffect } from 'react'
import {
  createHighlightsAction,
  deleteHighlightsAction,
  updateHighlightsAction
} from '../../../../../store/slices/highlightsSlices/actions'

const HighlightsModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { type } = useSelector((state: IRootStore) => state.modal)
  const { selectedHighlight } = useSelector(
    (state: IRootStore) => state.highlights
  )
  const [form] = Form.useForm()

  const handleModalSubmit = () => {
    if (type === 'add') {
      dispatch(createHighlightsAction(selectedHighlight)).then(() => {
        dispatch(toggleModal(''))
        dispatch(setSelectedHighlight(null))
        form.resetFields()
      })
    } else if (type === 'edit') {
      dispatch(updateHighlightsAction(selectedHighlight)).then(() => {
        dispatch(toggleModal(''))
        dispatch(setSelectedHighlight(null))
        form.resetFields()
      })
    } else {
      if (selectedHighlight) {
        dispatch(deleteHighlightsAction(selectedHighlight.id)).then(() => {
          dispatch(toggleModal(''))
          dispatch(setSelectedHighlight(null))
          form.resetFields()
        })
      }
    }
  }

  const handleModalCancel = () => {
    dispatch(toggleModal(''))
    dispatch(setSelectedHighlight(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(selectedHighlight)
  }, [selectedHighlight])

  const handleFormChange = (values: any) => {
    dispatch(setSelectedHighlight({ ...selectedHighlight, ...values }))
  }

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header={`${type === 'edit' ? 'Edit' : 'Add'} highlight`}
      saveBtnText='Save'
      cancelBtnText='Cancel'
    >
      <Form
        form={form}
        layout='vertical'
        onValuesChange={handleFormChange}
        className='highlightsForm'
      >
        <Form.Item label='Highlight value' name={'name'}>
          <Input placeholder="E.g 'High bonuses'" />
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default HighlightsModal
