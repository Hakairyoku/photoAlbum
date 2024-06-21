import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import requestAxios, { setAccessToken } from '../../services/axios';
function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const onHandleLogout = async () => {
    const { data } = await requestAxios.get('/auth/logout');
    console.log(data);
    if (data.message === 'success') {
      setAccessToken(undefined);
      setUser(undefined);
      navigate('/');
    }
  };
  const onHandleFriends = () => {
    navigate('/friends');
  };
  return (
    <nav style={styles.nav}>
      <NavLink style={styles.link} to='/' end>
        Main
      </NavLink>
      {user && (
        <NavLink style={styles.link} to='/albums'>
          Albums
        </NavLink>
      )}
      {user ? (
        <div style={styles.userSection}>
          <p style={styles.welcomeText}>{`Welcome, ${user.name}!`}</p>
          <button style={styles.button} onClick={onHandleFriends}>
            Friends
          </button>
          <button style={styles.button} onClick={onHandleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.authSection}>
          <NavLink style={styles.link} to='/registration'>
            Registration
          </NavLink>
          <NavLink style={styles.link} to='/authorization'>
            Authorization
          </NavLink>
        </div>
      )}
    </nav>
  );
}
const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Arial',
    color: '#34495E', 
    fontSize: '24px',
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  link: {
    textDecoration: 'none',
    color: '#34495E',
    margin: '0 10px',
    transition: 'color 0.3s ease',
    fontWeight: 'bold',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: '18px',
    color: '#aaa',
    marginRight: '10px',
  },
  button: {
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#2ECC71', 
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    marginLeft: '10px',
    transition: 'background-color 0.3s ease',
  },
  authSection: {
    display: 'flex',
  },
};
export default Navbar;