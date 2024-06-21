import { useState } from 'react';
import requestAxios from '../../services/axios';
function Friends() {
  const [email, setEmail] = useState('');
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const fetchFriendAlbums = async () => {
    try {
      const { data } = await requestAxios.get(`/friends/${email}`);
      if (data.message === 'success') {
        setAlbums(data.albums);
        setError(null);
      } else {
        setError(data.message || 'Unexpected error occurred');
      }
    } catch (err) {
      setError('Error fetching albums for this email.');
      setAlbums([]);
      console.error(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFriendAlbums();
  };
  return (
    <div>
      <h1 style={{ color: '#CCFFCC' }}>Friends Page</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="email"
          placeholder="Введите email пользователя"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Добавить</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {albums.map((album) => (
          <div key={album.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            width: '200px',
            textAlign: 'center'
          }}>
            <img src={album.img} alt={album.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3>{album.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Friends;