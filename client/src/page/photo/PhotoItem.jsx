import React from'react';
import requestAxios from '../../services/axios';
function PhotoItem({ photo, setPhotos }) {
  const handleDel = async () => {
        const { data } = await requestAxios.delete(`/photos/${photo.id}`)
        if (data.message === 'success') {
            setPhotos((prev) => prev.filter((delPhoto) => delPhoto.id !== photo.id))
        }
        
    };

  return (
      <div>
      <p>{photo.title}</p>
      <img src={photo.img} />
      <button type='button' onClick={handleDel}>Delete</button>
      </div>
  );
}

export default PhotoItem;