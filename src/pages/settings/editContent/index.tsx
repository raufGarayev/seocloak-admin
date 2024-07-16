import { Button, Form, Input, Select } from 'antd'
import JoditEditor from 'jodit-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../store'
import { setSelectedContent } from '../../../store/slices/contentsSlices'
import PageHeader from '../../../components/ui/pageHeader'
import CustomCard from '../../../components/common/card'
import './editContent.sass'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import {
  createContentAction,
  updateContentAction
} from '../../../store/slices/contentsSlices/actions'
import { toggleModal } from '../../../store/slices/modalSlices'
import { getContent } from '../../../services/contents'

const EditContent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedContent } = useSelector((state: IRootStore) => state.contents)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()

  //   const handleFormChange = (values: any) => {
  //     console.log("values")
  //     dispatch(setSelectedContent({ ...selectedContent, ...values }))
  //   }

  useEffect(() => {
    if(id !== "0") {
        getContent(Number(id)).then((res) => {
            console.log("res", res)
            form.setFieldsValue({
                ...res,
                type: res?.type?.toString()
              })
        })
    }
  }, [id])

  useEffect(() => {
    form.setFieldsValue({
      ...selectedContent,
      type: selectedContent?.type?.toString()
    })
  }, [selectedContent])

  const handleEditCancel = () => {
    navigate(-1)
  }

  const handleEditSave = () => {
    if (id === '0') {
      dispatch(
        createContentAction({
          ...form.getFieldsValue(),
          type: Number(form.getFieldValue('type'))
        })
      ).then(() => {
        dispatch(toggleModal(null))
        dispatch(setSelectedContent(null))
        form.resetFields()
        navigate(-1)
      })
    } else {
      dispatch(
        updateContentAction({
          ...form.getFieldsValue(),
          id: Number(selectedContent?.id),
          type: Number(form.getFieldValue('type'))
        })
      ).then(() => {
        dispatch(toggleModal(null))
        dispatch(setSelectedContent(null))
        form.resetFields()
        navigate(-1)
      })
    }
  }

  return (
    <>
      <PageHeader title='Content editor' />
      <CustomCard>
        <Form
          form={form}
          layout='vertical'
          //   onValuesChange={handleFormChange}
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
        <div className='contentBtns'>
          <Button className='cancelBtn' onClick={handleEditCancel}>
            Cancel
          </Button>
          <Button className='saveBtn' onClick={handleEditSave}>
            Save
          </Button>
        </div>
      </CustomCard>
    </>
  )
}

export default EditContent
