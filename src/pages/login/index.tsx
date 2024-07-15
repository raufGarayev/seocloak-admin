import { Button, Form, Input } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { loginUser } from '../../services/auth'
import Logo from '../../assets/header_logo.svg'
import './login.sass'

const Login = () => {
  const { setUser } = useContext(AuthContext)
  const [form] = Form.useForm()

  const handleLogin = async (values: any) => {
    const res = await loginUser(values)
    if (res && res.data.token) {
      localStorage.setItem('clToken', res.data.token)
      setUser(res.data.user)
    }
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__logo'>
          <img src={Logo} alt='logo' />
        </div>
        <div className='login__form'>
          <Form form={form} onFinish={handleLogin}>
            <Form.Item name={'username'}>
              <Input type='text' placeholder='Username' />
            </Form.Item>
            <Form.Item name={'password'}>
              <Input type='password' placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit'>Sign In</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
