import React, { useContext, useEffect } from 'react';

import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';
import VideoCard from './VideoCard';

const Feed = () => {

  const { loading, searchResults } = useContext(Context);

useEffect(() => {
  document.getElementById("root").classList.remove("custom-h");
}, [])


  return (
    <div className='flex flex-row'>
      <LeftNav />
      <div className='grow w-[calc(100%-240px)] h-[400vh] overflow-y-auto bg-[#0f0f0f]'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-6'>
          {!loading && 
          searchResults.map((item) => {
            if(item?.type !== "video") return false;
            return (
              <VideoCard
                key={item?.video?.videoId}
                video={item?.video}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Feed
