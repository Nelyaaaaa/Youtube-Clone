import React from 'react';
import { abbreviateNumber } from 'js-abbreviation-number';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';

import VideoLength from '../shared/videoLength';

const VideoCard = ({ video }) => {

  return (

    <Link to={`/video/${video?.videoId}`}>
      <div className='flex flex-col mb-8'>
        <div className='relative h-48 md:h-44 rounded-xl overflow-hidden m-2'>
          <img 
          className='h-full w-full object-cover' 
          src={video?.thumbnails?.[0]?.url} 
          alt={`Aperçu de la vidéo : ${video?.title}`}
          />
          {video.lengthSeconds && (
            <VideoLength time={video?.lengthSeconds} />
          )}
        </div>

        <div className="flex text-white mt-3">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img
                src={video?.author?.avatar[0]?.url}
                className='h-full w-full object-cover' 
                alt={`Avatar de ${video?.author?.title}`}
                />
            </div>
          </div>

          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-base font-semibold line-clamp-2 pr-6">
              {video?.title}
            </span>

            <span className="text-[14px] mt-1 text-white/[0.7] flex items-center">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1' />
              )}
            </span>

            <div className="flex text-[14px] text-white/[0.7] truncate overflow-hidden">
              <span>
                {`${abbreviateNumber(video?.stats?.views, 2)} vues`}
              </span>
              <span className='flex text-[25px] leading-none text-white/[0.7] relative top-[-10px] mx-1'>
                .
              </span>
              <span className="truncate">
                {video?.publishedTimeText}
              </span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default VideoCard
