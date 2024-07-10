import { FaEdit, FaTrash } from 'react-icons/fa'
import '../../styles/columns.sass'

export const onlinePartnersColumns = (
  handleEditOnPartner: (partner: any) => void,
  handleDelOnPartner: (partner: any) => void
) => {
  return [
    {
      title: <span className='columnName'>Partner name</span>,
      render: ({ partnerName }: { partnerName: string }) => (
        <span className='columnData'>{partnerName}</span>
      )
    },
    {
      title: <span className='columnName'>Partner logo</span>,
      render: ({ partnerLogo }: { partnerLogo: string }) => (
        <img src={partnerLogo} alt='partner logo' />
      )
    },
    {
      title: <span className='columnName'>Status</span>,
      render: ({ status }: { status: boolean }) => (
        <span className='columnData'>{status ? 'Active' : 'Inactive'}</span>
      )
    },
    {
      title: <span className='columnName'>Actions</span>,
      render: (partner: any) => (
        <div style={{ display: 'flex', gap: 7 }}>
          <FaEdit
            onClick={() => handleEditOnPartner(partner)}
            className='editIcon'
          />
          <FaTrash
            onClick={() => handleDelOnPartner(partner)}
            className='deleteIcon'
          />
        </div>
      )
    }
  ]
}
