import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Edit from '../pages/Edit'
import Lists from '../pages/Lists'
import Means from '../pages/Means'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const BaseRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/lists" element={<Lists />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/means" element={<Means />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </Router>
)

export default BaseRouter
