import React, { useEffect, useState } from'react';
import requestAxios from '../../services/axios';
import PhotoItem from './PhotoItem';
import { useParams } from 'react-router-dom';
import FormAddPhoto from './FormAddPhoto';
function Photos({ albums }) {
    const { albumId } = useParams()
    const [photos, setPhotos] = useState([])
    const axiosPhotos = async () => {
        const { data } = await requestAxios.get(`/photos/${albumId}`)
        setPhotos(data.photo);
        
    } 
    
    useEffect(() => {
        axiosPhotos()

    }, []);

  return (
      <div>
        <h1>Photos</h1>
          <FormAddPhoto setPhotos={ setPhotos} />
        {photos && photos.map((photo) => (
            <PhotoItem key={photo.id} photo={photo} setPhotos={setPhotos } />
        ))}
        </div>
  );
}

export default Photos;