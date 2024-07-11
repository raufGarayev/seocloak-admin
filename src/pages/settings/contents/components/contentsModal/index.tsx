import CustomModal from '../../../../../components/common/modal'
import { Form, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../../store'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import { useEffect } from 'react'
import {
  createContentAction,
  updateContentAction
} from '../../../../../store/slices/contentsSlices/actions'
import { setSelectedContent } from '../../../../../store/slices/contentsSlices'
import JoditEditor from 'jodit-react'

const ContentsModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { type } = useSelector((state: IRootStore) => state.modal)
  const { selectedContent } = useSelector((state: IRootStore) => state.contents)
  const [form] = Form.useForm()

  const handleModalSubmit = () => {
    if (type === 'add') {
      dispatch(
        createContentAction({
          ...selectedContent,
          type: Number(selectedContent?.type)
        })
      ).then(() => {
        dispatch(toggleModal(''))
        dispatch(setSelectedContent(null))
        form.resetFields()
      })
    } else if ('edit') {
      dispatch(
        updateContentAction({
          ...selectedContent,
          type: Number(selectedContent?.type)
        })
      ).then(() => {
        dispatch(toggleModal(''))
        dispatch(setSelectedContent(null))
        form.resetFields()
      })
    }
  }

  const handleModalCancel = () => {
    dispatch(toggleModal(''))
    dispatch(setSelectedContent(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue({
      ...selectedContent,
      type: selectedContent?.type?.toString()
    })
  }, [selectedContent])

  const handleFormChange = (values: any) => {
    dispatch(setSelectedContent({ ...selectedContent, ...values }))
  }

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header={`${type === 'edit' ? 'Edit' : 'Add'} content`}
      saveBtnText='Save'
      cancelBtnText='Cancel'
      rootClass='contentsModal'
    >
      <Form
        form={form}
        layout='vertical'
        onValuesChange={handleFormChange}
        className='highlightsForm'
      >
        <Form.Item label='Content name' name={'name'}>
          <Input placeholder='Enter content name' />
        </Form.Item>
        <Form.Item label='Content type' name={'type'}>
          <Select placeholder='Select content type'>
            <Select.Option value='2'>Online</Select.Option>
            <Select.Option value='1'>Offline</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='Content text' name={'text'}>
          <JoditEditor value={form.getFieldValue('text')} />
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default ContentsModal
