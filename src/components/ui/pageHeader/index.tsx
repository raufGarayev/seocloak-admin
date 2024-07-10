import { Button } from 'antd'
import './pageHeader.sass'
import CustomCard from '../../common/card'

interface PageHeaderProps {
  title: string
  btnText?: string
  onBtnClick?: () => void
}

const PageHeader = (props: PageHeaderProps) => {
  return (
    <CustomCard className='pageCard'>
      <div className='pageHeader'>
        <h4>{props.title}</h4>
        {props.btnText && (
          <Button className='pageHeader__btn' onClick={props.onBtnClick}>{props.btnText}</Button>
        )}
      </div>
    </CustomCard>
  )
}

export default PageHeader
