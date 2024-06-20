import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../page/main/Main';
import Navbar from '../page/navbar/Navbar';
import requestAxios from '../services/axios';
import Photos from '../page/photos/Photos';
import PhotoPage from '../page/photos/PhotosPage';
import ErrorPage from '../page/ErrorPage/ErrorPage';
import Registration from '../page/auth/Registration';
import Authorization from '../page/auth/Authorization';
import { setAccessToken } from '../services/axios';
function App() {
  const [photos, setPhotos] = useState([]);
//   const [page, setPage] = useState(false);
  const [user, setUser] = useState('');
  const axiosPhotos = async () => {
    const { data } = await requestAxios.get('/photos');
    // console.log(data);
    if (data.message === 'success') {
        setPhotos(data.photos);
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
    axiosPhotos();
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
          path='/photos'
          element={
            <Photos
            axiosPhotos={axiosPhotos}
              user={ user }
              photos={ photos }
              setPhotos={setPhotos}
            />
          }
        />
        <Route path='/registration' element={<Registration setUser={setUser} />} />
        <Route
          path='/authorization'
          element={<Authorization setUser={setUser} />}
        />
        <Route
          path='/photos/:photoId'
          element={<PhotoPage photos={ photos } />}
        />
        {/* всешда лежит внизу */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
export default App;