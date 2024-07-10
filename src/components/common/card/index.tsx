import { ReactNode } from 'react'
import './card.sass'

const CustomCard = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <div className={`card ${className}`}>{children}</div>
  )
}

export default CustomCard