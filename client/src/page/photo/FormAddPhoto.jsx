import React, { useEffect, useState } from'react';
import requestAxios from '../../services/axios';
import { useParams } from 'react-router-dom';
function FormAddPhoto({ setPhotos }) {
    const { albumId } = useParams();
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    // const [albummId, setAlbummId] = useState( albumId )
    
    const handleAdd = async (event) => {
        event.preventDefault();
        const { data } = await requestAxios.post('/photos', { title, img, albumId });
        if (data.message === 'success') {
            setPhotos((prev) => [...prev, data.photo]);
            setTitle('');
            setImg('');
        }
    }

  return (
      <div>
          <h1>Add new photo</h1>
          <form onSubmit={handleAdd}>
              <input type="text" value={title} placeholder='title' onChange={(event)=>setTitle(event.target.value)}/>
              <input type="text" value={img} placeholder='img'onChange={(event)=>setImg(event.target.value)}/>
         
              <button type='submit'>Post</button>
          </form>
      </div>
  );
}

export default FormAddPhoto;