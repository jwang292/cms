import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './less/login.less'
import { RegisterApi } from '../request/api'

export default function Register() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    RegisterApi({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
        navigate('/login')
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

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  )
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="confirm a password"
            />
          </Form.Item>
          <Form.Item>
            <Link to="/login">go to login</Link>
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
