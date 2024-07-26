import CustomModal from '../../../../../components/common/modal'
import { Button, Form, Image, Input, Upload, UploadProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../../store'
import { toggleModal } from '../../../../../store/slices/modalSlices'
import { useEffect } from 'react'
import {
  createPartnerAction,
  deletePartnerAction,
  updatePartnerAction
} from '../../../../../store/slices/partnersSlices/actions'
import { setSelectedPartner } from '../../../../../store/slices/partnersSlices'

const PartnersModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { type } = useSelector((state: IRootStore) => state.modal)
  const { selectedPartner } = useSelector((state: IRootStore) => state.partners)
  const [form] = Form.useForm()

  const handleModalSubmit = () => {
    if (type === 'add') {
      dispatch(createPartnerAction(selectedPartner)).then(() => {
        dispatch(toggleModal(null))
        dispatch(setSelectedPartner(null))
        form.resetFields()
      })
    } else if (type === 'edit') {
      dispatch(updatePartnerAction(selectedPartner)).then(() => {
        dispatch(toggleModal(null))
        dispatch(setSelectedPartner(null))
        form.resetFields()
      })
    } else {
        console.log("dsds")
      if (selectedPartner) {
        console.log("dsds")
        dispatch(deletePartnerAction(selectedPartner.id)).then(() => {
          dispatch(toggleModal(null))
          dispatch(setSelectedPartner(null))
          form.resetFields()
        })
      }
    }
  }

  const handleModalCancel = () => {
    dispatch(toggleModal(null))
    dispatch(setSelectedPartner(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(selectedPartner)
  }, [selectedPartner])

  const handleFormChange = (values: any) => {
    dispatch(setSelectedPartner({ ...selectedPartner, ...values }))
  }

  const handleGeneralInfoStateChange = (path: string) => {
    // dispatch(setGeneralInfoState({ key, value }));
    dispatch(setSelectedPartner({ ...selectedPartner, logo: path }))
  }

  const coverUploadProps: UploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_BASE_URL}/partners/upload`,
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

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header={`${type === 'edit' ? 'Edit' : 'Add'} partner`}
      saveBtnText='Save'
      cancelBtnText='Cancel'
    >
      <Form
        form={form}
        layout='vertical'
        onValuesChange={handleFormChange}
        className='highlightsForm'
      >
        <Form.Item label='Partner name' name={'name'}>
          <Input placeholder='Enter partner name' />
        </Form.Item>
        <Form.Item label='Partner logo' name={'url'}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {selectedPartner?.logo && (
              <Image
                src={
                  import.meta.env.VITE_DOMAIN +
                  '/images/partners/' +
                  selectedPartner?.logo
                }
                width={'100%'}
                height={120}
              />
            )}
            <Upload {...coverUploadProps}>
              <Button style={{ marginTop: 10 }}>Upload</Button>
            </Upload>
          </div>
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default PartnersModal
