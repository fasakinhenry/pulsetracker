import { Route, Routes } from 'react-router-dom';
import Home from './pages/landing/Home.jsx';
import Login from './pages/auth/Login.jsx';
import EmailVerify from './pages/auth/EmailVerify.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./pages/landing/Homepage.jsx";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
