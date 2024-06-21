import React from'react';
function PhotoItem({ photo }) {
  return (
      <div>
        <p>{photo.title}</p>
        <img src={photo.img}/>
      </div>
  );
}

export default PhotoItem;