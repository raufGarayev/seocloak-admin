import { Checkbox } from 'antd'
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa'

export const contentsColumns = (
  handleEditContent: (content: any) => void,
  handleDelContent: (content: any) => void,
  handleCopyContent: (content: any) => void,
  multiSelectMode: boolean,
  selectedContents: any,
  contents: any,
  handleSelect: (content: any, status: boolean) => void
) => {
  const columns: {
    key?: string
    title?: JSX.Element | string
    render?: (text: any, record: any, index: number) => JSX.Element
    width?: string
    align?: 'center' | 'left' | 'right'
  }[] = [
    {
      title: <span className='columnName'>#</span>,
      render: (_: any, __: any, index: number) => (
        <span className='columnData'>{index + 1}</span>
      ),
      width: '10%'
    },
    {
      title: <span className='columnName'>Title</span>,
      render: ({ name }: { name: string }) => (
        <span className='columnData'>{name}</span>
      ),
      width: '30%'
    },
    {
      title: <span className='columnName'>Slug</span>,
      render: ({ slug }: { slug: string }) => (
        <span className='columnData'>{slug}</span>
      ),
      width: '30%'
    },
    {
      title: <span className='columnName'>Type</span>,
      render: ({ type }: { type: number }) => (
        <span className='columnData'>{type === 1 ? 'Offline' : 'Online'}</span>
      )
    },
    {
      title: <span className='columnName'>Actions</span>,
      render: (content: any) => (
        <div style={{ display: 'flex', gap: 7 }}>
          <FaEdit
            onClick={() => handleEditContent(content)}
            className='editIcon'
          />
          <FaCopy className='copyIcon' onClick={() =>handleCopyContent(content)} />
          <FaTrash
            onClick={() => handleDelContent(content)}
            className='deleteIcon'
          />
        </div>
      ),
      width: '10%'
    }
  ]

  if (multiSelectMode) {
    columns.unshift({
      key: 'select',
      title: <Checkbox
      onChange={e => handleSelect('all', e.target.checked)}
      checked={selectedContents.length === contents.length}
    />,
      render: (content: any) => (
        <Checkbox
        onChange={e => handleSelect(content, e.target.checked)}
        checked={selectedContents.some(
          (selectedContent: any) => selectedContent.id === content.id
        )}
      />
      ),
      width: '10%'
    })
  }

  return columns
}
