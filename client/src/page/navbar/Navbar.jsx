import React from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import requestAxios, { setAccessToken } from '../../services/axios';


function Navbar({ user, setUser}) {
  const navigate = useNavigate()

  const onHandleLOgout = async () => {
    const { data } = await requestAxios.get('/auth/logout');
    console.log(data);
    if (data.message === 'success') {
      setAccessToken(undefined);
      setUser(undefined);
      navigate('/')
    }
  };

  return (
  
   <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Arial',
          color: 'black',
          fontSize: '35px',
          textShadow: '7px 7px 5px rgba(0, 0, 0, 0.5)',
          padding: '10px', // Добавить отступы
        }}
      >
        <NavLink
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#aaa' : 'black',
            margin: '0 10px', // Добавить пробелы между ссылками
            transition: 'color 0.3s ease', // Добавить плавный переход
          })}
          to='/'
        >
          Main
        </NavLink>
        
        <NavLink
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#4d504f' : 'black',
            margin: '0 10px',
            transition: 'color 0.3s ease',
          })}
          to='/albums'
        >
          Albums
        </NavLink>
        {user ? (
          <>
          <p style={{ marginTop: '10px', fontSize: '30px', color: '#aaa' }}>{`Welcome! ${user.name}`}</p>
        <button style={{fontSize: '18px', color: 'black',  backgroundColor:'#aaa' }} type='button' onClick={onHandleLOgout}>
          logout
        </button>
        </>
      ) : (
        <>
        {/* {user && <div style={{ marginTop: '10px', fontSize: '20px', color: '#ccffcc' }}>Welcome, {user} */}

        <NavLink
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#aaa' : 'black',
            margin: '0 10px',
            transition: 'color 0.3s ease',
          })}
          to='/registration'
        >
          Registration
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? '#aaa' : 'black',
            margin: '0 10px',
            transition: 'color 0.3s ease',
          })}
          to='/authorization'
        >
          Authorization
        </NavLink>
        </>
      )}
      </nav>
  );
}

export default Navbar;