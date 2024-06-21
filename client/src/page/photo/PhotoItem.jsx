import React, { useState } from'react';
import requestAxios from '../../services/axios';
import FormUpdatePhoto from './FormUpdatePhoto';

function PhotoItem({ photo, setPhotos }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleDel = async () => {
        const { data } = await requestAxios.delete(`/photos/${photo.id}`)
        if (data.message === 'success') {
            setPhotos((prev) => prev.filter((delPhoto) => delPhoto.id !== photo.id))
        }
        
    };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // border: '1px solid #ccc',
      borderRadius: '8px',
      // padding: '20px',
      width: '200px',
      textAlign: 'center',
    }}>
      {isUpdate ? (<><FormUpdatePhoto photo={photo} setIsUpdate={setIsUpdate} setPhotos={setPhotos} /></>) : (<>
        <p style={{color: 'yellow'}}>{photo.title}</p>
        <img style={{ width: '200%', height: '300px', objectFit: 'cover', borderRadius: '8px' }} src={photo.img} />
        <button type='button' onClick={handleDel}>Delete</button>
        <button type='button' onClick={()=> setIsUpdate((prev)=> !prev)} >Update</button>
      </>)
      }
</div>
  )
}

export default PhotoItem;