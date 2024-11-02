import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import NotFound from './components/NotFound';
import UserList from './components/UsersList';
function App() {

  return (
    <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/user/list" element={<UserList/>} />
              <Route path="*" element={<NotFound/>} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
