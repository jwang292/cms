import React from 'react'
import { Button, Form, Input, message, Upload } from 'antd'
import './less/means.less'
import { GetUserApi, ChangeUserApi } from '../request/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

export default function Means() {
  const [username1, setUsername1] = useState('')
  const [password1, setPassword1] = useState('')
  useEffect(() => {
    GetUserApi().then((res) => {
      if (res.errCode === 0) {
        message.success(res.message)
        //不生效，是因为异步。
        setUsername1(res.data.username)
        setPassword1(res.data.password)
        sessionStorage.setItem('username', res.data.username)
      }
    })
  }, [])

  const onFinish = (values) => {
    if (
      values.username &&
      values.username !== sessionStorage.getItem('username') &&
      values.password.trim() !== ''
    ) {
      //可以提交
      ChangeUserApi({
        username: values.username,
        password: values.password,
      }).then((res) => {
        message.success(res.message)
      })
    }
  }
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 / 1024 < 200
    if (!isLt2M) {
      message.error('Image must smaller than 2kB!')
    }
    return isJpgOrPng && isLt2M
  }

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
        //存储图片路径
        localStorage.setItem('avatar', info.file.response.data.filePath)
      })
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  return (
    <div className="means">
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 10,
        }}
        initialValues={{ username: username1, password: password1 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Old Username">{username1}</Form.Item>
        <Form.Item
          label="Modify Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your new username!',
            },
          ]}
        >
          <Input placeholder={username1} />
        </Form.Item>

        <Form.Item label="Old Password">{password1}</Form.Item>

        <Form.Item
          label="Modify Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input.Password placeholder="Please input your new password!" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 13,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>Upload your avatar</p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        headers={{ 'cms-token': localStorage.getItem('cms-token') }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
