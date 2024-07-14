import { Table } from 'antd'

interface CustomTableProps {
    columns: any[];
    data: any[];
    loading?: boolean;
    paginationOptions?: any;
    handleTableChange?: any;
    rowKey?: any;
    components?: any;
}

const CustomTable = (props: CustomTableProps) => {
  return (
    <Table
        columns={props.columns}
        dataSource={props.data}
        pagination={props.paginationOptions}
        onChange={props.handleTableChange}
        loading={props.loading}
        rowKey={props.rowKey}
        components={props.components}
    />
  )
}

export default CustomTable