import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../page/main/Main';
import Navbar from '../page/navbar/Navbar';
import requestAxios from '../services/axios';
import ErrorPage from '../page/ErrorPage/ErrorPage';
import Registration from '../page/auth/Registration';
import Authorization from '../page/auth/Authorization';
import { setAccessToken } from '../services/axios';
import Albums from '../page/album/Albums';
import AlbumItem from '../page/album/AlbumItem';
import Friends from '../page/friend/Friends';
import Photos from '../page/photo/Photos';
import { Loader } from '../ui/Loader/Loader';

function App() {
  const [loading, setLoading] = useState(false)
  const [albums, setAlbums] = useState([]);
//   const [page, setPage] = useState(false);
  const [user, setUser] = useState('');
  const axiosAlbums = async () => {

    const { data } = await requestAxios.get('/albums');
    if (data.message === 'success') {
      setAlbums(data.albums);
    }
  };
  const axiosUsers = async (id) => {
    const { data } = await requestAxios.get(`/users/${id}`);
      if (data.message === 'success') {
      setUser(data.users);
    }
  };
  const AxiosChekUser = async () => {
    const { data } = await requestAxios.get('/tokens/refresh');
    if (data.message === 'success') {
      setUser(data.user);
      setAccessToken(data.accessToken);
    }
  };
  // 90%
  useEffect(() => {

    axiosAlbums();
    AxiosChekUser();
    axiosUsers();
    // функция очистки наложенных эффектов
    // return ()=> clearTimeout
    const id = setTimeout(() => {
      setLoading(true);
    }, 2000);

    return () => clearTimeout(id);

  }, []);
  // возращает разметку
  return (
    <>
      {loading ? (
    <div>
      <Navbar user={user} setUser={setUser} />
      <h1 className='rotating-text'>Welcome</h1>
        
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/albums'
          element={
            <Albums
            axiosAlbums={axiosAlbums}
              user={ user }
              albums={ albums }
              setAlbums={setAlbums}
            />
          }
        />
        <Route path='/registration' element={<Registration setUser={setUser} />} />
        <Route
          path='/authorization'
          element={<Authorization setUser={setUser} />}
        />
        
        <Route

        path='/friends'
        element={<Friends />}
        />
        <Route

        path='/photos/:albumId'
        element={<Photos albums={ albums }/>}
/>
     
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      </div>
    ) : (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      )}
    </>
  )
}

export default App;