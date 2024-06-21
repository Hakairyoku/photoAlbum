import React from 'react';
import requestAxios from '../../services/axios';
import { Link, useNavigate } from 'react-router-dom';
function AlbumItem({ album, user, onDelete, }) {
  const navigate = useNavigate()
 
  

  const handleDelete = async () => {
    try {
      const { data } = await requestAxios.delete(`/albums/${album.id}`);
      if (data.message === 'success') {
        onDelete(album.id);
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };
  return (
    <>
    {user && user.id === album.userId && (

      <div style={{
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
     <h3 style={{color: 'yellow'}}>{album.title}</h3>
     {user && (
       <button onClick={() => navigate(`/photos/${album.id}`)} style={{ marginTop: '10px', backgroundColor: '#f6ff00', color: 'black', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
         Открыть
       </button>

     )}
     {user && (
       <button onClick={handleDelete} style={{ marginTop: '10px', backgroundColor: '#f6ff00', color: 'black', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
         Удалить
       </button>
     )}


      </div>
    
      
   
    )}
    </>
  );
}
export default AlbumItem;