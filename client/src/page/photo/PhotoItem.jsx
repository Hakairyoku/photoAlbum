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
    <div>
      {isUpdate ? (<FormUpdatePhoto photo={photo} setIsUpdate={setIsUpdate} setPhotos={setPhotos} />) : (<>
        <p>{photo.title}</p>
        <img src={photo.img} />
        <button type='button' onClick={handleDel}>Delete</button>
        <button type='button' onClick={()=> setIsUpdate((prev)=> !prev)} >Update</button>
      </>)
      }
      </div>
  );
}

export default PhotoItem;