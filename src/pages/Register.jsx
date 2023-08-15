import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { registrationStateAtom } from '../components/Atoms';

export const Register = () => {

  const [registrationState, setRegistrationState] = useAtom(registrationStateAtom);

  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const data = {
      username: registrationState.username,
      email: registrationState.email,
      password: registrationState.password
    };
    
    fetch('http://localhost:1337/api/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          const token = data.token;
          const dataUsername = data.user.username;
          Cookies.set('token', token);
          Cookies.set('username', dataUsername)
          navigate('/')
        })
      } else {
        console.error('Registration failed');
      }
    })
  };
  return (
    <div>
      <h1>Registration Form</h1>
      <input type="text"
      placeholder='Username'
      value={registrationState.username}
      autoComplete='off'
      onChange={(e) => setRegistrationState({ ...registrationState, username: e.target.value })}
      />
      <input type="text"
      placeholder='Email'
      value={registrationState.email}
      autoComplete='off'
      onChange={(e) => setRegistrationState({ ...registrationState, email: e.target.value })}
      />
      <input type="text"
      placeholder='Password'
      value={registrationState.password}
      autoComplete='off'
      onChange={(e) => setRegistrationState({ ...registrationState, password: e.target.value })}
      />
      <button onClick={handleRegistration}>Register</button>
    </div>
  )
};