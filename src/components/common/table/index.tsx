import { Table } from 'antd'

interface CustomTableProps {
    columns: any[];
    data: any[];
}

const CustomTable = (props: CustomTableProps) => {
  return (
    <Table
        columns={props.columns}
        dataSource={props.data}
    />
  )
}

export default CustomTable