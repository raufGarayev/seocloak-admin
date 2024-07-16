import { Form, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setSelectedOnlinePartner, setSelectedOnlinePartners } from '../../../../store/slices/onlinePartnersSlice'
import { AppDispatch, IRootStore } from '../../../../store'
import { toggleModal } from '../../../../store/slices/modalSlices'
import CustomModal from '../../../../components/common/modal'
import {
  createOnlinePartnerAction,
  deleteOnlinePartnerAction
} from '../../../../store/slices/onlinePartnersSlice/actions'

const OnlinePartnerCopyModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { type, hint } = useSelector((state: IRootStore) => state.modal)
  const { selectedOnlinePartner, selectedOnlinePartners } = useSelector(
    (state: IRootStore) => state.onlinePartners
  )
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const [form] = Form.useForm()

  const handleModalSubmit = () => {
    if (type === 'edit') {
      if (hint === 'multi') {
        dispatch(
          createOnlinePartnerAction(
            selectedOnlinePartners.map((partner: any) => ({
              ...partner,
              highlights: partner.highlights.map(
                (highlight: any) => highlight.id
              ),
              id: undefined,
              gametype: partner?.gametype?.id || partner?.gametype
            }))
          )
        ).then(() => {
          dispatch(toggleModal(null))
          form.resetFields()
          dispatch(setSelectedOnlinePartners([]))
        })
      } else {
        dispatch(
          createOnlinePartnerAction({
            ...selectedOnlinePartner,
            id: undefined,
            highlights: selectedOnlinePartner?.highlights?.map(
              highlight => highlight.id
            ),
            gametype:
              //@ts-ignore
              selectedOnlinePartner?.gametype?.id ||
              selectedOnlinePartner?.gametype
          })
        ).then(() => {
          dispatch(toggleModal(null))
          dispatch(setSelectedOnlinePartner(null))
          form.resetFields()
        })
      }
    } else if (type === 'del') {
      if (hint === 'multi') {
        dispatch(
          deleteOnlinePartnerAction(
            //@ts-ignore
            selectedOnlinePartners.map(partner => partner.id)
          )
        ).then(() => {
          dispatch(toggleModal(null))
          dispatch(setSelectedOnlinePartners([]))
          form.resetFields()
        })
      } else {
        if(selectedOnlinePartner) {
          dispatch(deleteOnlinePartnerAction(selectedOnlinePartner.id)).then(
            () => {
              dispatch(toggleModal(null))
              dispatch(setSelectedOnlinePartner(null))
              form.resetFields()
            }
          )
        }
      }
    }
  }

  const handleModalCancel = () => {
    dispatch(toggleModal(null))
    dispatch(setSelectedOnlinePartner(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(selectedOnlinePartner)
  }, [selectedOnlinePartner])

  const handleFormChange = (values: any) => {
    if(hint === 'multi') {
      dispatch(setSelectedOnlinePartners(selectedOnlinePartners.map(partner => ({ ...partner, ...values }))))
    } else {
      dispatch(setSelectedOnlinePartner({ ...selectedOnlinePartner, ...values }))
    }
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
