import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import NotFound from './components/NotFound';
import UserList from './components/UsersList';
import LoansList from './components/LoansList';
function App() {

  return (
    <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/home" element={<Home/>} />
              <Route path="/user/list" element={<UserList/>} />
              <Route path="/loans/list" element={<LoansList/>} />
              <Route path="*" element={<NotFound/>} />
              </Routes>
          </div>
      </Router>
  )
}

export default App
