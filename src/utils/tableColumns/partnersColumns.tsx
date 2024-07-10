import { FaEdit, FaTrash } from 'react-icons/fa'

export const partnersColumns = (
  handleEditPartner: (prt: any) => void,
  handleDelPartner: (prt: any) => void
) => {
  return [
    {
      title: <span className='columnName'>ID</span>,
      render: ({ id }: { id: number }) => <span className='columnData'>{id}</span>,
      width: '10%'
    },
    {
      title: <span className='columnName'>Partner name</span>,
      render: ({ name }: { name: string }) => <span className='columnData'>{name}</span>,
    },
    {
      title: <span className='columnName'>Partner logo</span>,
      render: ({ logo }: { logo: string }) => (
        <div className='columnImage'><img src={`http://localhost:3000/${logo}`} alt='partner logo' /></div>
      ),
      width: '26%'
    },
    {
      title: <span className='columnName'>Actions</span>,
      render: (partner: any) => (
        <div style={{ display: 'flex', gap: 7 }}>
          <FaEdit
            onClick={() => handleEditPartner(partner)}
            className='editIcon'
          />
          <FaTrash
            onClick={() => handleDelPartner(partner)}
            className='deleteIcon'
          />
        </div>
      ),
      width: '10%'
    }
  ]
}
