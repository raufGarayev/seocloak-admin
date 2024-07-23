import { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { menus } from '../../../utils/sidebarMenuItems'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
import { GiPokerHand } from 'react-icons/gi'
import { fetchGametypesAction } from '../../../store/slices/gametypeSlices/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../store'
import { IGametype } from '../../../types/gametypes'
import Logo from '../../../assets/header_logo_modified.svg'
import JustLogo from '../../../assets/header_logo_just.svg'

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

const SidebarComponent = ({
  collapsed,
}: {
  collapsed: boolean
}) => {
  const [localMenus, setLocalMenus] = useState(menus)
  const [selectedKey, setSelectedKey] = useState('1')
  const { gametypes } = useSelector((state: IRootStore) => state.gametypes)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchGametypesAction())
  }, [])

  useEffect(() => {
    const newMenus = gametypes.map((item: IGametype) => ({
      label: item.name,
      key: item.id,
      icon: <GiPokerHand style={{ fontSize: 20 }} />
    }))
    setLocalMenus([...newMenus, ...menus])
  }, [gametypes])

  useEffect(() => {
    const pathname = location.pathname
    const parts = pathname.split('-')
    const result =
      parts.length === 2
        ? parts[0].replace('/', '')
        : parts.slice(0, 2).join('-').replace('/', '')

    const key = localMenus.reduce((acc, menu: MenuItem) => {
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
        result
      ) {
        return menu
      }
      return acc
    }, undefined)

    if (key) {
      //@ts-ignore
      setSelectedKey(key.key.toString())
    }
  }, [location.pathname])

  const handleMenuSelect = (item: any) => {
    console.log("selecting")
    const dir = item.domEvent.currentTarget.innerText
    // const parentDir = item.domEvent.currentTarget.childNodes[1].innerText
    if (+item.key < 100) {
      const path = `/${slugify(dir, { replacement: '-', lower: true })}-${
        item.key
      }`
      navigate(path)
    } else {
      const path = `/${slugify(dir, { replacement: '-', lower: true })}`
      if(+item.key < 200) {
        navigate('/settings' + path)
      } else {
        navigate(path)
      }
    }
  }

  return (
    <Sider width={240} collapsed={collapsed}>
      <div className='logo' style={collapsed ? {width: 80} : {}}>{collapsed ? <img src={JustLogo} /> : <img src={Logo} alt='logo' />}</div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['1']}
        selectedKeys={[selectedKey]}
        items={localMenus}
        onClick={handleMenuSelect}
      />
    </Sider>
  )
}

export default SidebarComponent
