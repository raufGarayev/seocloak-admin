import { Form, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setSelectedOnlinePartner } from '../../../../store/slices/onlinePartnersSlice'
import { AppDispatch, IRootStore } from '../../../../store'
import { toggleModal } from '../../../../store/slices/modalSlices'
import CustomModal from '../../../../components/common/modal'
import { createOnlinePartnerAction } from '../../../../store/slices/onlinePartnersSlice/actions'

const OnlinePartnerCopyModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { type } = useSelector((state: IRootStore) => state.modal)
  const { selectedOnlinePartner } = useSelector(
    (state: IRootStore) => state.onlinePartners
  )
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const [form] = Form.useForm()

  const handleModalSubmit = () => {
    dispatch(createOnlinePartnerAction({
        ...selectedOnlinePartner,
        id: undefined,
        highlights: selectedOnlinePartner?.highlights?.map(highlight => highlight.id),
        //@ts-ignore
        gametype: selectedOnlinePartner?.gametype?.id || selectedOnlinePartner?.gametype
    })).then(() => {
      dispatch(toggleModal(''))
      dispatch(setSelectedOnlinePartner(null))
      form.resetFields()
    })
  }

  const handleModalCancel = () => {
    dispatch(toggleModal(''))
    dispatch(setSelectedOnlinePartner(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(selectedOnlinePartner)
  }, [selectedOnlinePartner])

  const handleFormChange = (values: any) => {
    dispatch(setSelectedOnlinePartner({ ...selectedOnlinePartner, ...values }))
  }

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header={`${type === 'edit' ? 'Edit' : 'Add'} online partner`}
      saveBtnText='Save'
      cancelBtnText='Cancel'
    >
      <Form
        form={form}
        layout='vertical'
        onValuesChange={handleFormChange}
        className='highlightsForm'
      >
        <Form.Item label='Choose gametype' name={'gametype'}>
          <Select
            options={gametypes.map(gametype => ({
              label: gametype.name,
              value: gametype.id
            }))}
          />
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default OnlinePartnerCopyModal
