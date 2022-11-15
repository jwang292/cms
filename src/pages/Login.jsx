import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './less/login.less'
import { LoginApi } from '../request/api'

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    LoginApi({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
        //save data 不存成对象，因为容易获取
        localStorage.setItem('avatar', res.data.avatar)
        localStorage.setItem('cms-token', res.data['cms-token'])
        localStorage.setItem('editable', res.data.editable)
        localStorage.setItem('player', res.data.player)
        localStorage.setItem('username', res.data.username)
        //nav to root
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else {
        message.error(res.message)
      }
    })
  }

  return (
    <div className="login">
      <div className="login_box">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="enter a username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="enter a password"
            />
          </Form.Item>
          <Form.Item>
            <Link to="/register">no account, go to register</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
