import { Table } from 'antd'

interface CustomTableProps {
    columns: any[];
    data: any[];
    paginationOptions?: any;
    handleTableChange?: any;
}

const CustomTable = (props: CustomTableProps) => {
  return (
    <Table
        columns={props.columns}
        dataSource={props.data}
        pagination={props.paginationOptions}
        onChange={props.handleTableChange}

    />
  )
}

export default CustomTable