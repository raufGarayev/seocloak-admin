import React from 'react'
import CustomCard from '../../../../components/common/card'
import CustomTable from '../../../../components/common/table'
import { onlinePartnersColumns } from '../../../../utils/tableColumns/onlinePartnersColumns'

const fake = [
  {
    partnerName: 'Example Partner',
    partnerLogo: 'https://example.com/logo.png',
    partnerUrl: 'https://example.com',
    bonusText: 'Get 100% bonus on your first deposit',
    stars: 5,
    rating: 4.5,
    order: 1,
    gametype: {
      id: 1,
      name: 'Poker',
      description: 'Poker is a family of comparing card games.'
    },
    review: 'This is an excellent partner with great offers.',
    isMobile: true,
    status: true,
    highlights: [
      {
        id: 1,
        name: 'Fast Withdrawals',
        description: 'Withdraw your winnings in under 24 hours.'
      },
      {
        id: 2,
        name: 'Wide Game Selection',
        description: 'Choose from over 500 games.'
      }
    ]
  },
  {
    partnerName: 'Example Partner',
    partnerLogo: 'https://example.com/logo.png',
    partnerUrl: 'https://example.com',
    bonusText: 'Get 100% bonus on your first deposit',
    stars: 5,
    rating: 4.5,
    order: 1,
    gametype: {
      id: 1,
      name: 'Poker',
      description: 'Poker is a family of comparing card games.'
    },
    review: 'This is an excellent partner with great offers.',
    isMobile: true,
    status: true,
    highlights: [
      {
        id: 1,
        name: 'Fast Withdrawals',
        description: 'Withdraw your winnings in under 24 hours.'
      },
      {
        id: 2,
        name: 'Wide Game Selection',
        description: 'Choose from over 500 games.'
      }
    ]
  }
]

const OnlinePartnersTable = () => {
  const handleEditOnPartner = (partner: any) => {}

  const handleDelOnPartner = (partner: any) => {}

  return (
    <CustomCard >
      <CustomTable
        columns={onlinePartnersColumns(handleEditOnPartner, handleDelOnPartner)}
        data={fake}
      />
    </CustomCard>
  )
}

export default OnlinePartnersTable
