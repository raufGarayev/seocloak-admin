import React from 'react'
import PageHeader from '../../../components/ui/pageHeader'
import PartnersTable from './components/partnersTable'

const Partners = () => {
  return (
    <>
        <PageHeader title='Partners' btnText='Add' />
        <PartnersTable />
    </>
  )
}

export default Partners