import { Form, Input, Select } from 'antd'
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
    // if (type === 'add') {
    //   dispatch(createHighlightsAction(selectedOnlinePartner)).then(() => {
    //     dispatch(toggleModal(''))
    //     dispatch(setSelectedOnlinePartner(null))
    //     form.resetFields()
    //   })
    // } else if (type === 'edit') {
    //   dispatch(updateHighlightsAction(selectedOnlinePartner)).then(() => {
    //     dispatch(toggleModal(''))
    //     dispatch(setSelectedOnlinePartner(null))
    //     form.resetFields()
    //   })
    // } else {
    //   if (selectedOnlinePartner) {
    //     dispatch(deleteHighlightsAction(selectedOnlinePartner.id)).then(() => {
    //       dispatch(toggleModal(''))
    //       dispatch(setSelectedOnlinePartner(null))
    //       form.resetFields()
    //     })
    //   }
    // }
    console.log(selectedOnlinePartner)
    dispatch(createOnlinePartnerAction({
        ...selectedOnlinePartner,
        id: undefined,
        highlights: selectedOnlinePartner?.highlights?.map(highlight => highlight.id),
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
