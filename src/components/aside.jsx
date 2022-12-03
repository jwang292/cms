import { Menu } from 'antd'
import React, { useState } from 'react'
import {
  BookOutlined,
  EditOutlined,
  CreditCardOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const items = [
  { label: 'List of articles', key: 'lists', icon: <BookOutlined /> },
  { label: 'Article editor', key: 'edit', icon: <EditOutlined /> },
  {
    label: 'Aadministrator list',
    key: 'means',
    icon: <TeamOutlined />,
  },
]
export default function Aside() {
  const navigate = useNavigate()
  const onClick = (e) => {
    navigate('/' + e.key)
  }
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      className="aside"
    />
  )
}
