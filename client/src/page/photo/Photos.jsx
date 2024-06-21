import React, { useEffect, useState } from'react';
import requestAxios from '../../services/axios';
import PhotoItem from './PhotoItem';
import { useParams } from 'react-router-dom';
function Photos({ albums }) {
    const { albumId } = useParams()
    const [photos, setPhotos] = useState([])
    const axiosPhotos = async () => {
        const { data } = await requestAxios.get(`/photos/${albumId}`)
        setPhotos(data.photo);
        console.log(data);
    } 
    
    useEffect(() => {
        axiosPhotos()
    }, []);
  return (
      <div>
        <h1>Photos</h1>

        {photos && photos.map((photo) => (
            <PhotoItem key={ photo.id } photo = { photo }/>
        ))}

        </div>
  );
}

export default Photos;