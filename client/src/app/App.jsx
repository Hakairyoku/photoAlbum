import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../page/main/Main';
import Navbar from '../page/navbar/Navbar';
import requestAxios from '../services/axios';
import Albums from '../page/albums/Albums';
import AlbumItem from '../page/albums/AlbumItem';
import ErrorPage from '../page/ErrorPage/ErrorPage';
import Registration from '../page/auth/Registration';
import Authorization from '../page/auth/Authorization';
import { setAccessToken } from '../services/axios';

function App() {
  const [albums, setAlbums] = useState([]);
//   const [page, setPage] = useState(false);
  const [user, setUser] = useState('');
  const axiosAlbums = async () => {

    const { data } = await requestAxios.get('/albums');
    // console.log(data);
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

    setAlbums();
    AxiosChekUser();
    axiosUsers();
    // функция очистки наложенных эффектов
    // return ()=> clearTimeout
  }, []);
  // возращает разметку
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <h1 className='rotating-text'>Welcome</h1>
        {/* <button type='button' onClick={() => setPage((prev) => !prev)}>
        count
      </button>  */}
      {/* когда page станет true тогда и отрисуется count */}
       {/* {page && <Count />}  */}
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

          path='/albums/:albumId'
          element={<AlbumItem albums={ albums } />}
        />
        {/* всешда лежит внизу */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
export default App;