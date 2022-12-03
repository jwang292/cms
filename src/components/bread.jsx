import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
export default function Bread() {
  const { pathname } = useLocation()
  const [breadName, setBreadName] = useState('')
  useEffect(() => {
    switch (pathname) {
      case '/list':
        setBreadName('Aticle List')
        break
      case '/edit':
        setBreadName('Aticle Edit')
        break
      case '/means':
        setBreadName('Aticle Means')
        break
      default:
        break
    }
  }, [pathname])
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href={pathname}>{breadName}</Breadcrumb.Item>
    </Breadcrumb>
  )
}
