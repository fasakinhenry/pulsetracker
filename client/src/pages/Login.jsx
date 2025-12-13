import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/auth/register', {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/auth/login', {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400'>
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt='Logo'
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'
      />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full max-w-md sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold mb-3 text-white text-center'>
          {state === 'Sign Up' ? 'Create Account' : 'Login Account'}
        </h2>
        <p className='text-sm mb-6 text-center'>
          {state === 'Sign Up'
            ? 'Please fill in the form to create an account.'
            : 'Please enter your credentials to login.'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} alt='Person Icon' />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='bg-transparent border-none outline-none text-white placeholder-gray-400'
                type='text'
                placeholder='Full Name'
                required
              />
            </div>
          )}
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt='Mail Icon' />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='bg-transparent border-none outline-none text-white placeholder-gray-400'
              type='email'
              placeholder='Email'
              required
            />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt='Lock Icon' />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='bg-transparent border-none outline-none text-white placeholder-gray-400'
              type='password'
              placeholder='Password'
              required
            />
          </div>
          <p
            onClick={() => navigate('/reset-password')}
            className='mb-4 text-indigo-500 cursor-pointer'
          >
            Forgot Password?
          </p>
          <button className='w-full py-2.5 rounded-full bg-linear-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer hover:opacity-90 transition-all'>
            {state}
          </button>
          {state === 'Sign Up' ? (
            <p className='text-gray-400 text-center text-xs mt-4'>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className='text-blue-400 cursor-pointer underline'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-gray-400 text-center text-xs mt-4'>
              Don't have an account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className='text-blue-400 cursor-pointer underline'
              >
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
