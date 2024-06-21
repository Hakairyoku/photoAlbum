import React, { useState } from'react';
import requestAxios from '../../services/axios';
import { useParams } from 'react-router-dom';
function FormUpdatePhoto({ photo, setPhotos, setIsUpdate }) {
    const { albumId } = useParams();
    const [title, setTitle] = useState(photo.title);
    const [img, setImg] = useState(photo.img);
    const handleUpd = async (event) => {
        event.preventDefault();
        const { data } = await requestAxios.put(`/photos/${photo.id}`, { title, img, albumId });
        if (data.message === 'success') {
            setPhotos((prev) => prev.map((m)=> (m.id === data.photo.id ? data.photo : m)));
            setIsUpdate((prev) => !prev);
        }
    }
  return (
      <div>
          <form onSubmit={handleUpd}>
              <input type="text" value={title} placeholder='title' onChange={(event)=>setTitle(event.target.value)}/>
              <input type="text" value={img} placeholder='img'onChange={(event)=>setImg(event.target.value)}/>
              <button type='submit'>Save changes</button>
          </form>
           <button type='submit' onClick={()=> setIsUpdate((prev)=> !prev)}>Cancel</button>
      </div>
  );
}

export default FormUpdatePhoto;