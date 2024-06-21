import { useState } from 'react';
import requestAxios from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../services/axios';

function Registration({setUser}) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  function validation(name, email, password) {
    if (name.trim() === '' || email.trim() === '' || password.trim() === ''|| cpassword.trim() === '') {
      setError('Заполните поле');
      return false;
    }
    if (password.trim() !== cpassword.trim()) {
      setError('Пароли не совпадают');
      return false;
    }
    return true;
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    if (!validation(name, email, password, cpassword)) {
      return;
    }

    try {
      // сделать проверки на пустые поля
      const { data } = await requestAxios.post('/auth/registration', {
        name,
        email,
        password,
      });
      console.log(data);
        if (data.message === 'success') {
          // положили билетик
          setAccessToken(data.accessToken);
setUser(data.user);
          navigate('/');
          return;
        }
      
    } catch (message) {
      console.log(message.response.data.message);
      setError(message.response.data.message); /// исправить
      console.log(message);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#ccffcc' }}>Registration</h1>
      <form className='auth' onSubmit={onHandleSubmit}>
        <label htmlFor='name'>
          <input
            type='text'
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor='email'>
          <input
            type='email'
            placeholder='alex@mail.ru'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength={5}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            placeholder='password'
            value={password}
            required
            minLength={3}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            placeholder='chek password'
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </label>
        <span style={{color: '#ccffcc'}}>{error && <p>{error}</p>}</span>
        <button style={styles.button} className='button-3d' type='submit'>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

const styles = {
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#2ECC71',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
}

export default Registration;

