import React from 'react';

function AlbumItem({ album }) {
    console.log('AlbumItem', album);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        width: '200px',
        height: '250px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <img
        src={album.img}
        alt={album.title}
        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
      />
      <h3 style={{ color: 'black', fontSize: '16px' }}>{album.title}</h3>
    </div>
  );
}

export default AlbumItem;