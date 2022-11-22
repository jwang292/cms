import React, { useState } from 'react'
import logo from '../assets/logo.png'
import defaultAvatar from '../assets/avatar.png'
import { Dropdown, message } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [username, setUsername] = useState('acc_fishing')
  const navigate = useNavigate()
  useEffect(() => {
    let usernames = localStorage.getItem('username')
    let avatars = localStorage.getItem('avatar')
    if (usernames) {
      setUsername(usernames)
    }
    if (avatars) {
      setAvatar('http://47.93.114.103:6688/' + avatars)
    }
  }, [])

  //logout
  const logout = () => {
    localStorage.clear()
    message.success('success logout, go to login page')
    setTimeout(() => navigate('./login'), 1000)
  }
  const items = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Modify
        </a>
      ),
      key: '0',
    },
    //分割线
    {
      type: 'divider',
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          LogOut
        </a>
      ),
      key: '1',
    },
  ]
  return (
    <header>
      <img src={logo} alt="" />
      <div className="right">
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <img src={avatar} className="avatar" alt="" />
            <span>{username}</span>
            <CaretDownOutlined />
          </a>
        </Dropdown>
      </div>
    </header>
  )
}
