import { useEffect, useState } from 'react';
import requestAxios from '../../services/axios';
import AlbumItem from './AlbumItem';

function Albums({ user }) {
  const [albums, setAlbums] = useState([]);

  const axiosAlbums = async () => {
    const { data } = await requestAxios.get('/albums');
    console.log('album', data);
    if (data.message === 'success') {
      setAlbums(data.albums); 
    }
  };

  useEffect(() => {
    axiosAlbums();
  }, []);

  return (
    <div>
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
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {albums && albums.map((album) => (
          <AlbumItem
            album={album}
            key={album.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Albums;



