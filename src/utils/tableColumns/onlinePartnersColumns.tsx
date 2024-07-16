import { FaCheckCircle, FaCopy, FaEdit, FaTrash } from 'react-icons/fa'
import '../../styles/columns.sass'
import { MdBlock } from 'react-icons/md'
import { Checkbox, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { IoCopy } from 'react-icons/io5'

export const onlinePartnersColumns = (
  handleEditOnPartner: (partner: any) => void,
  handleDelOnPartner: (partner: any) => void,
  handleOnPartnerStatus: (partner: any) => void,
  handleCopyHere: (partner: any) => void,
  handleCopyAnywhere: (partner: any) => void,
  handleSelect: (partner: any, status: boolean) => void,
  multiSelectMode: boolean,
  selectedOnlinePartners: any,
  onlinePartners: any
) => {
  const columns: {
    key?: string;
    title?: JSX.Element | string;
    render?: (text: any, record: any, index: number) => JSX.Element;
    width?: string;
  }[] = [
    {
      key: 'sort'
    },
    {
      title: <span className='columnName'>Partner name</span>,
      render: ({ partnerName }: { partnerName: string }) => (
        <span className='columnData'>{partnerName}</span>
      ),
      width: '35%'
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
      width: '35%'
    },
    {
      title: <span className='columnName'>Status</span>,
      render: ({ status }: { status: boolean }) => (
        <div className={status ? 'activePartner' : 'inactivePartner'}></div>
      ),
      width: '20%'
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
  ];

  if (multiSelectMode) {
    columns.unshift({
      key: 'select',
      title: 
      <Checkbox
        onChange={e => handleSelect('all', e.target.checked)}
        checked={selectedOnlinePartners.length === onlinePartners.length}
      />,
      render: (partner: any) => <Checkbox
      onChange={e => handleSelect(partner, e.target.checked)}
      checked={selectedOnlinePartners.includes(partner)}
    />,
      width: '15%'
    });
  }

  return columns;
}

