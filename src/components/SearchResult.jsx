import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { fetchDataFromApi } from '../utils/api';
import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';
import SearchResultVideoCard from './SearchResultVideoCard';


const SearchResult = () => {

  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading } = useContext(Context);

  const fetchSearchResults = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res)
      setResult(res?.contents);
      setLoading(false);
    });
  }, [searchQuery, setLoading]);

  useEffect(() => {
    document.getElementById("root").classList.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery, fetchSearchResults]);

  return (
    <div className='flex flex-row h-calc[(100%-56px)] h-full'>
      <LeftNav />
      <div className='grow w-[calc(100%-240px)] overflow-y-auto bg-[#0f0f0f]'>
        <div className='grid grid-cols-1 gap-2 p-5'>
          {result?.map((item) => {
            if (item.type !== "video") return false;
            let video = item?.video;
            return (
              <SearchResultVideoCard
                key={video?.videoId}
                video={video}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
