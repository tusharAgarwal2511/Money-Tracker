import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/test' element={<ProtectedRoutes><Test /></ProtectedRoutes>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export function ProtectedRoutes(props) {
  if (localStorage.getItem('money-tracker-user')) {
    return props.children
  }
  else {
    return <Navigate to='/login' />
  }
}


export default App;
