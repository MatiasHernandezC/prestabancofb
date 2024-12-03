import './App.css'
import {HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from "./components/Login";
import UserList from './components/UsersList';
import AddEditUser from './components/AddEditUser';
import LoansList from './components/LoansList';
import UserLoansList from './components/UserLoansList';
import UserLoansListAdmin from './components/UserLoansListAdmin';
import UserLoan from './components/UserLoan';
import Register from './components/Register';
import UploadDocument from './components/UploadDocument';
import { useState } from 'react'
import InitialReview from './components/InitialReview';
import DocumentReview from './components/documentReview';
function App() {
  const [user, setUser] = useState(null)
  const login = (userData) => {
    setUser(userData);  // Guardar usuario tras login exitoso
  };

  const logout = () => {
    setUser(null);  // Borrar usuario al hacer logout
  };
  return (
    <Router>
          <div className="container">
          <Navbar user={user} logout={logout} />
            <Routes>
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/user/list" element={<PrivateRoute user={user}><UserList /></PrivateRoute>} />
              <Route path="/loans/list" element={<PrivateRoute user={user}><LoansList user={user}/></PrivateRoute>} />
              <Route path="/user/add" element={<PrivateRoute user={user}><AddEditUser /></PrivateRoute>} />
              <Route path="/user/edit/:id" element={<PrivateRoute user={user}><AddEditUser user={user}/></PrivateRoute>} />
              <Route path="/userLoan/request" element={<PrivateRoute user={user}><UserLoan user={user}/></PrivateRoute>} />
              <Route path="/userLoan/view" element={<PrivateRoute user={user}><UserLoansList user={user}/></PrivateRoute>} />
              <Route path="/userLoan/listAll" element={<PrivateRoute user={user}><UserLoansListAdmin user={user}/></PrivateRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/uploadDocument" element={<PrivateRoute user={user}><UploadDocument user={user}/></PrivateRoute>} />
              <Route path="/review/initial/:userLoanId" element={<PrivateRoute user={user}><InitialReview user={user}/></PrivateRoute>} />
              <Route path="/review/documentation/:userLoanId" element={<PrivateRoute user={user}><DocumentReview user={user}/></PrivateRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
      </Router>
  )
}
function PrivateRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

export default App
