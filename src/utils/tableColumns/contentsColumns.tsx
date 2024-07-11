import { FaEdit, FaTrash } from "react-icons/fa"

export const contentsColumns = (handleEditContent: (content: any) => void, handleDelContent: (content: any) => void) => {
    return [
        {
            title: <span className="columnName">#</span>,
            render: (_: any, __: any, index: number) => <span className="columnData">{index + 1}</span>,
            width: '10%'
        },
        {
            title: <span className="columnName">Title</span>,
            render: ({name}: {name: string}) => <span className="columnData">{name}</span>,
            width: '40%'
        },
        {
            title: <span className="columnName">Type</span>,
            render: ({type}: {type: number}) => <span className="columnData">{type === 1 ? 'Offline' : 'Online'}</span>
        },
        {
            title: <span className='columnName'>Actions</span>,
            render: (content: any) => (
              <div style={{ display: 'flex', gap: 7 }}>
                <FaEdit
                  onClick={() => handleEditContent(content)}
                  className='editIcon'
                />
                <FaTrash
                  onClick={() => handleDelContent(content)}
                  className='deleteIcon'
                />
              </div>
            ),
            width: '10%'
          }
    ]
}