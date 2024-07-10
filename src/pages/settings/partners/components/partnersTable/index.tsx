import React, { useEffect, useState } from 'react'
import CustomCard from '../../../../../components/common/card'
import CustomTable from '../../../../../components/common/table'
import { partnersColumns } from '../../../../../utils/tableColumns/partnersColumns'
import { getPartners } from '../../../../../services/partners'
import { Input } from 'antd'
import './partnersTable.sass'

const PartnersTable = () => {

  const [partners, setPartners] = useState()
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if(searchValue) {
      const delayDebounce = setTimeout(() => {
        getPartners({ search: searchValue }).then((data) => {
          setPartners(data);
        });
      }, 700);
  
      return () => clearTimeout(delayDebounce);
    } else {
      getPartners().then((data) => {
        setPartners(data)
      })
    }
  }, [searchValue]);

  const handleEditPartner = () => {}

  const handleDeletePartner = () => {}

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { current } = pagination
    console.log("current", current)
    getPartners({page: current, limit: 10}).then((data) => {
      setPartners(data)
    })
  }

  const handlePartnerSearch = (e: any) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <CustomCard>
      <div className='searchContainer'>
        <Input placeholder='Search partner' value={searchValue} onChange={handlePartnerSearch} allowClear className='searchInput' />
      </div>
      <CustomTable
        columns={partnersColumns(handleEditPartner, handleDeletePartner)}
        data={partners?.data || []}
        paginationOptions={{
          total: partners?.count,
          current: partners?.currentPage,
          showSizeChanger: false,
        }}
        handleTableChange={handleTableChange}
      />
    </CustomCard>
  )
}

export default PartnersTable
