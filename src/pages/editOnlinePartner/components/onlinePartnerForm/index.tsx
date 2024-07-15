import CustomCard from '../../../../components/common/card'
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton
} from 'antd'
import JoditEditor from 'jodit-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../store'
import { useEffect } from 'react'
import { fetchPartnersAction } from '../../../../store/slices/partnersSlices/actions'
import { fetchHighlightsAction } from '../../../../store/slices/highlightsSlices/actions'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createOnlinePartnerAction,
  getOnlinePartnerAction,
  updateOnlinePartnerAction
} from '../../../../store/slices/onlinePartnersSlice/actions'
import './onlinePartnerForm.sass'
import FormItem from 'antd/es/form/FormItem'
import { setSelectedOnlinePartner } from '../../../../store/slices/onlinePartnersSlice'

const OnlinePartnerForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { partners } = useSelector((state: IRootStore) => state.partners)
  const { highlights } = useSelector((state: IRootStore) => state.highlights)
  const { selectedOnlinePartner, gameTypeId, loading } = useSelector(
    (state: IRootStore) => state.onlinePartners
  )
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  useEffect(() => {
    if (id && id !== '0') {
      dispatch(getOnlinePartnerAction(+id))
    }
    dispatch(fetchPartnersAction({ limit: 1000 }))
    dispatch(fetchHighlightsAction())

    return () => {
      dispatch(setSelectedOnlinePartner(null))
    }
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      ...selectedOnlinePartner,
      highlights: selectedOnlinePartner?.highlights?.map(highlight =>
        highlight.id ? highlight.id : highlight
      ),
      isMobile: selectedOnlinePartner?.isMobile,
      gametype: selectedOnlinePartner?.gametype || gameTypeId
    })
  }, [selectedOnlinePartner])

  const handleFormChange = (values: any) => {
    dispatch(setSelectedOnlinePartner({ ...selectedOnlinePartner, ...values }))
  }

  const handlePartnerEditSave = () => {
    if (id === '0') {
      dispatch(
        createOnlinePartnerAction({
          ...selectedOnlinePartner,
          partnerName: partners.data.find(
            //@ts-ignore
            partner => partner.id === selectedOnlinePartner.partnerName
          )?.name,
          partnerLogo: partners.data.find(
            //@ts-ignore
            partner => partner.id === selectedOnlinePartner.partnerName
          )?.logo,
          gametype: selectedOnlinePartner?.gametype || gameTypeId,
          isMobile: selectedOnlinePartner?.isMobile || false
        })
      ).then(() => {
        form.resetFields()
        dispatch(setSelectedOnlinePartner(null))
        navigate(-1)
      })
    } else {
      if (id) {
        dispatch(updateOnlinePartnerAction(+id, selectedOnlinePartner)).then(
          () => {
            form.resetFields()
            dispatch(setSelectedOnlinePartner(null))
            navigate(-1)
          }
        )
      }
    }
  }

  return (
    <CustomCard>
      <Skeleton loading={loading}>
        <Form
          layout='vertical'
          form={form}
          onFinish={handlePartnerEditSave}
          onValuesChange={handleFormChange}
        >
          <div className='flexedFormItems'>
            <Form.Item label='Partner' name='partnerName'>
              <Select
                options={partners.data.map(partner => ({
                  label: partner.name,
                  value: partner.id
                }))}
                showSearch
                filterOption={(input, option) =>
                  //@ts-ignore
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Form.Item>
            <FormItem label='Gametype' name='gametype'>
              <Select
                mode={id === '0' ? 'multiple' : undefined}
              >
                {gametypes.map(gametype => (
                  <Select.Option key={gametype.id} value={gametype.id}>
                    {gametype.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            <Form.Item label='Mobile' name='isMobile'>
              <Checkbox
                onChange={e => {
                  dispatch(
                    setSelectedOnlinePartner({
                      ...selectedOnlinePartner,
                      isMobile: e.target.checked
                    })
                  )
                }}
                checked={selectedOnlinePartner?.isMobile}
              ></Checkbox>
            </Form.Item>
          </div>
          <Form.Item label='Partner URL' name={'partnerUrl'}>
            <Input />
          </Form.Item>
          <Form.Item label='Bonus Text' name='bonusText'>
            <Input.TextArea />
          </Form.Item>
          <div className='flexedFormItems'>
            <Form.Item label='Highlights' name={'highlights'}>
              <Select
                mode={'multiple'}
                options={highlights.map(highlight => ({
                  label: highlight.name,
                  value: highlight.id
                }))}
                showSearch
                filterOption={(input, option) =>
                  //@ts-ignore
                  option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Form.Item>
            <Form.Item label='Stars' name='stars' className='shortenedItem'>
              <Select>
                <Select.Option value={1}>1</Select.Option>
                <Select.Option value={2}>2</Select.Option>
                <Select.Option value={3}>3</Select.Option>
                <Select.Option value={4}>4</Select.Option>
                <Select.Option value={5}>5</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Rating' name={'rating'} className='shortenedItem'>
              <InputNumber />
            </Form.Item>
          </div>
          <Form.Item label='Review' name='review'>
            <JoditEditor value={form.getFieldValue('text')} />
          </Form.Item>
          <div className='contentBtns'>
            <Form.Item>
              <Button className='cancelBtn'>Cancel</Button>
              <Button className='saveBtn' htmlType='submit'>
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Skeleton>
    </CustomCard>
  )
}

export default OnlinePartnerForm
