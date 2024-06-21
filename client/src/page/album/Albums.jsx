import { useEffect, useState } from 'react';
import requestAxios from '../../services/axios';
import AlbumItem from './AlbumItem';
function Albums({ user }) {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: '', img: '' });
  const axiosAlbums = async () => {
    const { data } = await requestAxios.get('/albums');
    if (data.message === 'success') {
      setAlbums(data.albums);
    }
  };
  useEffect(() => {
    axiosAlbums();
  }, []);
  const handleAddAlbum = async () => {
    try {
      const { data } = await requestAxios.post('/albums', newAlbum);
      if (data.message === 'success') {
        setAlbums([...albums, data.album]);
        setShowForm(false);
        setNewAlbum({ title: '', img: '' });
      }
    } catch (error) {
      console.error('Error adding album:', error);
    }
  };
  const handleDeleteAlbum = (id) => {
    setAlbums(albums.filter(album => album.id !== id));
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <h1
        style={{
          textShadow: '7px 4px 4px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Arial',
          color: 'black',
          fontSize: '38px',
        }}
      >
        Albums
      </h1>
      {user && (
        <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: '20px' }}>
          {showForm ? 'Отмена' : 'Добавить альбом'}
        </button>
      )}
      {showForm && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Название альбома"
            value={newAlbum.title}
            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            placeholder="URL изображения"
            value={newAlbum.img}
            onChange={(e) => setNewAlbum({ ...newAlbum, img: e.target.value })}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleAddAlbum}>Сохранить</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {albums && albums.map((album) => (
          <AlbumItem
            album={album}
            key={album.id}
            user={user}
            onDelete={handleDeleteAlbum}
          />
        ))}
      </div>
    </div>
  );
}
export default Albums;