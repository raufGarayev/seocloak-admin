import { ConfigProvider } from 'antd'
import { ReactNode } from 'react'

const AntThemeDesign = ({children}: {children: ReactNode}) => {
  return (
    <ConfigProvider
        theme={{
            components: {
                Layout: {
                    bodyBg: '#F0F1F7',
                    headerBg: '#fff',
                    siderBg: '#111c43',
                    headerHeight: 60,
                },
                Menu: {
                    darkItemBg: '#111c43',
                    darkItemSelectedBg: '#ffffff0d',
                    darkItemColor: '#a3aed1',
                    darkItemSelectedColor: '#fff',
                }
            }
        }}
    >
        {children}
    </ConfigProvider>
  )
}

export default AntThemeDesign