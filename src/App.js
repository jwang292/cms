import React from 'react'
import { Button } from 'antd'
import './assets/base.css'
import { Outlet } from 'react-router-dom'
export default function App() {
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <Outlet></Outlet>
    </div>
  )
}
