import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestAxios, { setAccessToken } from '../../services/axios';

function Authorization({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function validation(email, password ) {
    if (email.trim() === '' || password.trim() === '') {
      setError("Заполните поле");
      return false;
    }
    return true;
  }

  const navigate = useNavigate();

  const onHadleSubmit = async (e) => {
    e.preventDefault();

    if (!validation(email, password)) {
      return;
    } 
try {
    const { data } = await requestAxios.post('/auth/authorization', {
      email,
      password,
    });
    if (data.message === 'success') {
      setUser(data.user);
      setAccessToken(data.accessToken);
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
      <h1  style={{color: '#ccffcc'}}>Authorization Page</h1>
      <form className='auth' onSubmit={onHadleSubmit}>
        <label htmlFor='email'>
          <input
            type='email'
            placeholder='kat@mail.ru'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <span style={{color: '#ccffcc'}}>{error && <p>{error}</p>}</span>
        <button style={styles.button} className='button-3d' type='submit'>Войти</button>
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

export default Authorization;