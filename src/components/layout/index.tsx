import { Layout, Menu } from 'antd'
import Router from '../../routes'
import './layout.sass'
import { useState } from 'react'
import { menus } from '../../utils/sidebarMenuItems'
import SidebarComponent from './sidebar'

const { Header, Sider, Content } = Layout

const MainLayout = () => {

    const [collapsed, setCollapsed] = useState(false)
    const [selectedKey, setSelectedKey] = useState('1')

    const handleMenuSelect = ({ key }: { key: string }) => {
        setSelectedKey(key)
    }

  return (
    <Layout>
      <SidebarComponent />
      <Layout>
        <Header>Header</Header>
        <Content>
          <Router />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
