import { FaEdit, FaTrash } from 'react-icons/fa'

export const highlightsColumns = (
  handleEditHighlight: (hglght: any) => void,
  handleDelHighlight: (hghlght: any) => void
) => {
  return [
    {
      title: <span className='columnName'>ID</span>,
      render: ({ id }: { id: number }) => (
        <span className='columnData'>{id}</span>
      ),
      width: '10%'
    },
    {
      title: <span className='columnName'>Highlight name</span>,
      render: ({ name }: { name: string }) => (
        <span className='columnData'>{name}</span>
      )
    },
    {
      title: <span className='columnName'>Actions</span>,
      render: (partner: any) => (
        <div style={{ display: 'flex', gap: 7 }}>
          <FaEdit
            onClick={() => handleEditHighlight(partner)}
            className='editIcon'
          />
          <FaTrash
            onClick={() => handleDelHighlight(partner)}
            className='deleteIcon'
          />
        </div>
      ),
      width: '10%'
    }
  ]
}
