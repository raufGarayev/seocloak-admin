import { FaEdit, FaTrash } from 'react-icons/fa'

export const partnersColumns = (
  handleEditPartner: (prt: any) => void,
  handleDelPartner: (prt: any) => void
) => {
  return [
    {
      title: <span className='columnName'>#</span>,
      render: (_: any, __: any, index: number) => (
        <span className='columnData'>{index + 1}</span>
      ),
      width: '7%'
    },
    {
      title: <span className='columnName'>ID</span>,
      render: ({ id }: { id: number }) => <span className='columnData'>{id}</span>,
      width: '7%'
    },
    {
      title: <span className='columnName'>Partner name</span>,
      render: ({ name }: { name: string }) => <span className='columnData'>{name}</span>
    },
    {
      title: <span className='columnName'>Partner logo</span>,
      render: ({ logo }: { logo: string }) => (
        <img src={logo} alt='partner logo' />
      )
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
      )
    }
  ]
}
