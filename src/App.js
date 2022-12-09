import React, { useState } from 'react'
import './assets/base.less'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/header'
import Aside from './components/aside'
import Bread from './components/bread'
export default function App() {
  return (
    <div>
      <Layout id="main">
        <Header></Header>
        <div className="container">
          <Aside></Aside>
          <div className="container_box">
            <Bread></Bread>
            <div className="container_content">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
        <footer>
          Author Jinfeng Wang | Copyright &copy; 2022 react-redux project
        </footer>
      </Layout>
    </div>
  )
}
