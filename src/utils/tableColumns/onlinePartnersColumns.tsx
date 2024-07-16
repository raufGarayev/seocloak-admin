import {
  FaCheckCircle,
  FaCopy,
  FaDesktop,
  FaEdit,
  FaTrash
} from 'react-icons/fa'
import '../../styles/columns.sass'
import { MdBlock } from 'react-icons/md'
import { Checkbox, Dropdown, Select } from 'antd'
import type { MenuProps } from 'antd'
import { IoCopy } from 'react-icons/io5'
import { ImMobile } from 'react-icons/im'

export const onlinePartnersColumns = (
  handleEditOnPartner: (partner: any) => void,
  handleDelOnPartner: (partner: any) => void,
  handleOnPartnerStatus: (partner: any) => void,
  handleCopyHere: (partner: any) => void,
  handleCopyAnywhere: (partner: any) => void,
  handleSelect: (partner: any, status: boolean) => void,
  multiSelectMode: boolean,
  selectedOnlinePartners: any,
  onlinePartners: any,
  handleFilter: (key: string, value: string | null) => void
) => {
  const columns: {
    key?: string
    title?: JSX.Element | string
    render?: (text: any, record: any, index: number) => JSX.Element
    width?: string
    align?: 'center' | 'left' | 'right'
  }[] = [
    {
      key: 'sort'
    },
    {
      title: <span className='columnName'>Partner name</span>,
      render: ({ partnerName }: { partnerName: string }) => (
        <span className='columnData'>{partnerName}</span>
      ),
      width: '30%'
    },
    {
      title: <span className='columnName'>Partner logo</span>,
      render: ({ partnerLogo }: { partnerLogo: string }) => (
        <div className='columnImage'>
          <img
            src={import.meta.env.VITE_DOMAIN + '/images/' + partnerLogo}
            alt='partner logo'
          />
        </div>
      ),
      width: '30%'
    },
    {
      title: (
        <Select
          placeholder='Status'
          style={{ width: 150 }}
          onSelect={e => handleFilter('status', e)}
          allowClear
          onClear={() => handleFilter('status', null)}
        >
          <Select.Option value={true}>Enabled</Select.Option>
          <Select.Option value={false}>Disabled</Select.Option>
        </Select>
      ),
      render: ({ status }: { status: boolean }) => (
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <div className={status ? 'activePartner' : 'inactivePartner'}></div>
        </div>
      ),
      width: '15%',
      align: 'center'
    },
    {
      title: (
        <Select
          placeholder='Version'
          style={{ width: 150 }}
          onSelect={e => handleFilter('isMobile', e)}
          allowClear
          onClear={() => handleFilter('isMobile', null)}
        >
          <Select.Option value={false}>Desktop</Select.Option>
          <Select.Option value={true}>Mobile</Select.Option>
        </Select>
      ),
      render: ({ isMobile }: { isMobile: boolean }) => (
        <div style={{ display: 'grid', placeItems: 'center' }}>
          {isMobile ? (
            <ImMobile fontSize={20} color={'purple'} />
          ) : (
            <FaDesktop color='teal' fontSize={20} />
          )}
        </div>
      ),
      width: '15%',
      align: 'center'
    },
    {
      title: <span className='columnName'>Actions</span>,
      render: (partner: any) => {
        const items: MenuProps['items'] = [
          {
            label: partner.status ? 'Disable' : 'Activate',
            key: '1',
            icon: partner.status ? (
              <MdBlock className='disableIcon' />
            ) : (
              <FaCheckCircle className='activateIcon' />
            ),
            onClick: () => handleOnPartnerStatus(partner),
            style: { color: partner.status ? 'black' : 'green' }
          },
          {
            label: 'Delete',
            key: '3',
            icon: <FaTrash />,
            danger: true,
            onClick: () => handleDelOnPartner(partner)
          },
          {
            label: 'Copy here',
            key: '4',
            icon: <FaCopy className='copyIcon' />,
            style: { color: 'blue' },
            onClick: () => handleCopyHere(partner)
          },
          {
            label: 'Copy anywhere',
            key: '5',
            icon: <IoCopy className='copyIcon' />,
            style: { color: 'blue' },
            onClick: () => handleCopyAnywhere(partner)
          }
        ]

        const menuProps = {
          items
        }
        return (
          <Dropdown.Button
            menu={menuProps}
            onClick={() => handleEditOnPartner(partner)}
          >
            <FaEdit
              onClick={() => handleEditOnPartner(partner)}
              className='editIcon'
            />
          </Dropdown.Button>
        )
      },
      width: '15%'
    }
  ]

  if (multiSelectMode) {
    columns.unshift({
      key: 'select',
      title: (
        <Checkbox
          onChange={e => handleSelect('all', e.target.checked)}
          checked={selectedOnlinePartners.length === onlinePartners.length}
        />
      ),
      render: (partner: any) => (
        <Checkbox
          onChange={e => handleSelect(partner, e.target.checked)}
          checked={selectedOnlinePartners.some(
            (selectedPartner: any) => selectedPartner.id === partner.id
          )}
        />
      ),
      width: '15%'
    })
  }

  return columns
}
