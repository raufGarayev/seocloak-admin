import { useEffect, useState } from 'react'
import CustomCard from '../../../../../components/common/card'
import CustomTable from '../../../../../components/common/table'
import { partnersColumns } from '../../../../../utils/tableColumns/partnersColumns'
import { Input } from 'antd'
import './partnersTable.sass'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../../store'
import {
  setFilters,
  setSelectedPartner
} from '../../../../../store/slices/partnersSlices'
import { fetchPartnersAction } from '../../../../../store/slices/partnersSlices/actions'
import { IPartner } from '../../../../../types/partners'
import { toggleModal } from '../../../../../store/slices/modalSlices'

const PartnersTable = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { partners, filters, loading } = useSelector(
    (state: IRootStore) => state.partners
  )
  const [searchValue, setSearchValue] = useState('')
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null)

  useEffect(() => {
    return () => {
      dispatch(setFilters({ ...filters, search: '' }))
    }
  }, [])

  useEffect(() => {
    dispatch(fetchPartnersAction(filters))
  }, [filters])

  const handleEditPartner = (partner: IPartner) => {
    dispatch(setSelectedPartner(partner))
    dispatch(toggleModal({ type: 'edit' }))
  }

  const handleDeletePartner = (partner: IPartner) => {
    dispatch(setSelectedPartner(partner))
    dispatch(toggleModal({ type: 'del' }))
  }

  const handleTableChange = (pagination: any, _: any, __: any) => {
    const { current } = pagination
    dispatch(setFilters({ ...filters, page: current }))
  }

  const handlePartnerSearch = (e: any) => {
    setSearchValue(e.target.value)

    if (debounceTimeout) clearTimeout(debounceTimeout)

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      dispatch(setFilters({ ...filters, search: e.target.value }))
    }, 700)

    // Save the new timeout
    setDebounceTimeout(newTimeout)
  }

  return (
    <CustomCard>
      <div className='searchContainer'>
        <Input
          placeholder='Search partner'
          value={searchValue}
          onChange={handlePartnerSearch}
          allowClear
          className='searchInput'
        />
      </div>
      <CustomTable
        columns={partnersColumns(handleEditPartner, handleDeletePartner)}
        data={partners?.data || []}
        paginationOptions={{
          total: partners?.total,
          current: filters.page,
          showSizeChanger: false
        }}
        handleTableChange={handleTableChange}
        loading={loading}
      />
    </CustomCard>
  )
}

export default PartnersTable
