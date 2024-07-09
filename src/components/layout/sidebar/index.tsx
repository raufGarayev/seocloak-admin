import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { menus } from '../../../utils/sidebarMenuItems'
import { getGameTypes } from '../../../services/gametypes'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

const SidebarComponent = () => {
  const [localMenus, setLocalMenus] = useState(menus)
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState('1')
  const navigate = useNavigate()

  useEffect(() => {
    getGameTypes().then(res => {
      const newMenus = res.map((item: any, index: number) => ({
        label: item.name,
        key: index + 2,
        icon: <FaHome />
      }))
      setLocalMenus([...menus, ...newMenus])
      console.log('res', res)
    })
  }, [])

  useEffect(() => {
    const pathname = location.pathname

    const key = menus.reduce((acc, menu: MenuItem) => {
      //@ts-ignore
      if (menu?.children) {
        //@ts-ignore
        const child = menu?.children.find((child: any) => {
          //@ts-ignore
          const parentDir = slugify(menu.label, {
            replacement: '-',
            lower: true
          })
          const childDir = slugify(child.label, {
            replacement: '-',
            lower: true
          })
          return `${parentDir}/${childDir}` === pathname.replace('/', '')
        })
        if (child) {
          return child
        }
      } else if (
        //@ts-ignore
        slugify(menu?.label, { replacement: '-', lower: true }) ===
        pathname.replace('/', '')
      ) {
        return menu
      }
      return acc
    }, undefined)

    if (key) {
      //@ts-ignore
      setSelectedKey(key.key)
    }
  }, [location.pathname])

  const handleMenuSelect = (item: any) => {
    const dir = item.domEvent.currentTarget.innerText
    const parentDir = item.domEvent.currentTarget.childNodes[1].innerText
    if (item.key !== '1') {
      const path = `/${slugify(dir, { replacement: '-', lower: true })}`
      navigate(path)
    } else {
      navigate('/')
    }
  }

  return (
    <Sider>
      <div className='logo'>{collapsed ? <h2>PD</h2> : <h2>LOGO</h2>}</div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        onSelect={handleMenuSelect}
        items={localMenus}
      />
    </Sider>
  )
}

export default SidebarComponent
