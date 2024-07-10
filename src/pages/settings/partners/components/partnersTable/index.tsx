import React from 'react'
import CustomCard from '../../../../../components/common/card'
import CustomTable from '../../../../../components/common/table'
import { partnersColumns } from '../../../../../utils/tableColumns/partnersColumns'

const PartnersTable = () => {

    const handleEditPartner = () => {}

    const handleDeletePartner = () => {}

  return (
    <CustomCard>
        <CustomTable columns={partnersColumns(handleEditPartner, handleDeletePartner)} data={[]} />
    </CustomCard>
  )
}

export default PartnersTable