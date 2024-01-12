import React from 'react';

const VideoDate = ({ publishedDate }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) {
      return ''; 
    }

    const dateObj = new Date(dateStr);
    const jour = dateObj.getDate();
    const moisIndex = dateObj.getMonth();
    const annee = dateObj.getFullYear();

    const nomsMois = [
      'janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin',
      'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'
    ];

    const nomMois = nomsMois[moisIndex];

    return `${jour} ${nomMois} ${annee}`;
  };

  const formattedDate = formatDate(publishedDate);

  return (
    <div className='ml-3'>
    {formattedDate}
    </div>
  );
};

export default VideoDate;