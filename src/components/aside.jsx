import { Menu } from 'antd'
import React, { useState } from 'react'
import { BookOutlined, EditOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

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
  const location = useLocation()
  const [defaultkey, setDefaultKey] = useState('')
  useEffect(() => {
    let path = location.pathname
    let key = path.split('/')[1]
    setDefaultKey(key)
  }, [location.pathname])
  const onClick = (e) => {
    navigate('/' + e.key)
    setDefaultKey(e.key)
  }
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      selectedKeys={[defaultkey]}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
      className="aside"
    />
  )
}
