import React, { useEffect } from 'react'
import CustomCard from '../../../../components/common/card'
import { Button, Form, Input, Skeleton, Upload, UploadProps } from 'antd'
import JoditEditor from 'jodit-react'
import { setSelectedBlog } from '../../../../store/slices/blogsSlices'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../store'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createBlogAction,
  fetchBlogAction,
  updateBlogAction
} from '../../../../store/slices/blogsSlices/actions'

const BlogForm = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch<AppDispatch>()
  const { selectedBlog } = useSelector((state: IRootStore) => state.blogs)
  const navigate = useNavigate()
  const { id } = useParams()


  useEffect(() => {
    if(id && id !== '0') {
      dispatch(fetchBlogAction(+id))
    }

    return () => {
      dispatch(setSelectedBlog(null))
    }
  }, [])

  const handleGeneralInfoStateChange = (path: string) => {
    // dispatch(setGeneralInfoState({ key, value }));
    dispatch(setSelectedBlog({ ...selectedBlog, image: path }))
  }

  const imageUploadProps: UploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_BASE_URL}/blogs/upload`,
    onChange (info: any) {
      if (info.file.status === 'uploading' && info.file.percent === 100) {
        info.file.status = 'done'
      }
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('clToken')}`
    },
    //@ts-ignore
    onSuccess: (res: any) => {
      handleGeneralInfoStateChange(res.originalname)
    },
    showUploadList: {
      showPreviewIcon: false,
      showDownloadIcon: false,
      showRemoveIcon: false
    }
  }

  useEffect(() => {
    form.setFieldsValue(selectedBlog)
  }, [selectedBlog])

  const handleEditCancel = () => {
    dispatch(setSelectedBlog(null))
    form.resetFields()
    navigate(-1)
  }

  const handleEditSave = () => {
    if (id === '0') {
      dispatch(createBlogAction(selectedBlog)).then(() => {
        dispatch(setSelectedBlog(null))
        form.resetFields()
        navigate(-1)
      })
    } else {
      dispatch(updateBlogAction(selectedBlog)).then(() => {
        dispatch(setSelectedBlog(null))
        form.resetFields()
        navigate(-1)
      })
    }
  }

  const handleFormChange = (values: any) => {
    dispatch(setSelectedBlog({ ...selectedBlog, ...values }))
  }

  return (
    <CustomCard>
      {/* <Skeleton active={false}> */}
      <Form
        layout='vertical'
        onFinish={handleEditSave}
        onValuesChange={handleFormChange}
      >
        <div className='flexedFormItems'>
          <Form.Item label='Blog title' name={'title'}>
            <Input />
          </Form.Item>
          <Form.Item label='Blog image' name={'image'}>
            <Upload {...imageUploadProps}>
              <Button>Click to upload</Button>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item label='Content' name={'content'}>
          <JoditEditor value='' />
        </Form.Item>
        <div className='contentBtns'>
          <Button className='cancelBtn' onClick={handleEditCancel}>
            Cancel
          </Button>
          <Form.Item>
            <Button className='saveBtn' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
      {/* </Skeleton> */}
    </CustomCard>
  )
}

export default BlogForm
