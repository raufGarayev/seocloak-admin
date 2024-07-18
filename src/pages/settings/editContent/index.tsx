import { Button, Form, Input, Select, Spin } from 'antd'
import JoditEditor from 'jodit-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../store'
import { setSelectedContent } from '../../../store/slices/contentsSlices'
import PageHeader from '../../../components/ui/pageHeader'
import CustomCard from '../../../components/common/card'
import './editContent.sass'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  createContentAction,
  fetchContentAction,
  updateContentAction
} from '../../../store/slices/contentsSlices/actions'
import { toggleModal } from '../../../store/slices/modalSlices'
import { getContent, getLanguages, translate } from '../../../services/contents'

const EditContent = () => {
  const [languages, setLanguages] = useState([])
  const [translateLoading, setTranslateLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { selectedContent } = useSelector((state: IRootStore) => state.contents)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id !== '0') {
      dispatch(fetchContentAction(Number(id)))
    }

    getLanguages().then(res => {
      setLanguages(
        res.map((lang: any) => ({
          label: lang.name,
          value: lang.code
        }))
      )
    })
  }, [id])

  useEffect(() => {
    form.setFieldsValue(selectedContent)
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

  const handleTranslate = (value: string) => {
    setTranslateLoading(true)
    translate(form.getFieldValue('text'), value)
      .then(res => {
        dispatch(
          setSelectedContent({
            ...selectedContent,
            text: res.translatedText
          })
        )
      })
      .finally(() => {
        setTranslateLoading(false)
      })
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
            <Select placeholder='Select content type' 
              options={[
                { label: 'Offline', value: 1 },
                { label: 'Online', value: 2 },
              ]}
            />
          </Form.Item>
          <Spin spinning={translateLoading}>
            <Form.Item label='Content text' name={'text'} className='textItem'>
              <div className='textTranslate'>
                <Select
                  placeholder='Translate'
                  showSearch
                  filterOption={(input, option) =>
                    //@ts-ignore
                    option?.label.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                  }
                  onSelect={handleTranslate}
                  options={languages}
                />
              </div>
              <JoditEditor
                //@ts-ignore
                value={selectedContent?.text}
                onChange={e =>
                  dispatch(setSelectedContent({ ...selectedContent, text: e }))
                }
              />
            </Form.Item>
          </Spin>
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
