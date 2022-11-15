import React from 'react'
import './assets/base.less'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import logo from './assets/logo.png'
const { Sider, Content } = Layout
export default function App() {
  return (
    <div>
      <Layout id="main">
        <header>
          <img src={logo} alt="" />
        </header>
        <Layout>
          <Sider>sider</Sider>
          <Content>
            <div>
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
        <footer>
          Author Jinfeng Wang | Copyright &copy; 2022 react-redux project
        </footer>
      </Layout>
    </div>
  )
}
