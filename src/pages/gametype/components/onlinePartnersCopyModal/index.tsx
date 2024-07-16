import { Form, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  setMultiSelectMode,
  setSelectedOnlinePartner,
  setSelectedOnlinePartners
} from '../../../../store/slices/onlinePartnersSlice'
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
    if (type === 'copyan') {
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
        ).then(() => clearModal())
      }
    } else if (type === 'copyhe') {
      if(hint === 'multi') {
        dispatch(
          createOnlinePartnerAction(
            selectedOnlinePartners.map((partner: any) => ({
              ...partner,
              highlights: partner.highlights.map(
                (highlight: any) => highlight.id
              ),
              id: undefined,
              gametype: partner.gametype?.id
                ? partner.gametype.id
                : partner.gametype
            }))
          )
        ).then(() => clearModal())
      } else {
        if(selectedOnlinePartner) {
          dispatch(createOnlinePartnerAction({
            ...selectedOnlinePartner,
            id: undefined,
            highlights: selectedOnlinePartner?.highlights?.map(
              highlight => highlight.id
            ),
            //@ts-ignore
            gametype: selectedOnlinePartner?.gametype?.id
            //@ts-ignore
              ? selectedOnlinePartner.gametype.id
              : selectedOnlinePartner.gametype
          })).then(() => clearModal())
        }
      }
    } else if (type === 'del') {
      if (hint === 'multi') {
        dispatch(
          deleteOnlinePartnerAction(
            //@ts-ignore
            selectedOnlinePartners.map(partner => partner.id)
          )
        ).then(() => {
          clearModal()
        })
      } else {
        if (selectedOnlinePartner) {
          dispatch(deleteOnlinePartnerAction(selectedOnlinePartner.id)).then(
            () => clearModal()
          )
        }
      }
    }
  }

  const clearModal = () => {
    dispatch(toggleModal(null))
    dispatch(setSelectedOnlinePartner(null))
    form.resetFields()
    dispatch(setSelectedOnlinePartners([]))
    dispatch(setMultiSelectMode(false))
  }

  const handleModalCancel = () => {
    dispatch(toggleModal({
      isOpen: false,
    }))
    dispatch(setSelectedOnlinePartner(null))
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(selectedOnlinePartner)
  }, [selectedOnlinePartner])

  const handleFormChange = (values: any) => {
    // Clone the values object to avoid mutating the original
    let updatedValues = { ...values };
  
    // If "Don't change" is selected for isMobile, remove it from the updates
    if (updatedValues.isMobile === null) {
      delete updatedValues.isMobile;
    }
  
    if (hint === 'multi') {
      dispatch(
        setSelectedOnlinePartners(
          selectedOnlinePartners.map(partner => ({ ...partner, ...updatedValues }))
        )
      );
    } else {
      dispatch(
        setSelectedOnlinePartner({ ...selectedOnlinePartner, ...updatedValues })
      );
    }
  };

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
        {type === 'copyan' && (
          <Form.Item label='Choose gametype' name={'gametype'}>
            <Select
              options={gametypes.map(gametype => ({
                label: gametype.name,
                value: gametype.id
              }))}
            />
          </Form.Item>
        )}
        <Form.Item label='Change mobile / desktop of all partners to' name={'isMobile'}>
          <Select>
            <Select.Option value={null}>Don't change</Select.Option>
            <Select.Option value={false}>Desktop</Select.Option>
            <Select.Option value={true}>Mobile</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default OnlinePartnerCopyModal
