import { Button, Layout, Menu } from 'antd'
import Router from '../../routes'
import { useState } from 'react'
import SidebarComponent from './sidebar'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { GrLogout } from 'react-icons/gr'
import './layout.sass'

const { Header, Sider, Content } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {}

  return (
    <Layout>
      <SidebarComponent collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header>
          <Button
            type='text'
            icon={
              collapsed ? (
                <AiOutlineMenuUnfold className='menu-icon' />
              ) : (
                <AiOutlineMenuFold className='menu-icon' />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className='user-profile'>
            <span>Admin</span>
            <GrLogout onClick={handleLogout} className='logout-icon' />
          </div>
        </Header>
        <Content>
          <Router />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
