import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";
import { fetchDataFromApi } from "../utils/api";

import ReactPlayer from "react-player/youtube";
import { abbreviateNumber } from "js-abbreviation-number";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

import VideoDate from "../shared/videoDate";
import SuggestionVideoCard from "./SuggestionVideoCard";


const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const [videoComments, setVideoComments] = useState([]);
  const { id } = useParams();
  const { setLoading } = useContext(Context);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const fetchVideoDetails = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
    });
  }, [id, setLoading]);

  const fetchRelatedVideos = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res);
      setLoading(false);
    });
  }, [id, setLoading]);

  const fetchVideoComments = useCallback(() => {
    setLoading(true);
    fetchDataFromApi(`video/comments/?id=${id}`).then((res) => {
      setVideoComments(res);
      setLoading(false);
    });
  }, [id, setLoading]);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    fetchVideoComments();
  }, [id, fetchVideoDetails, fetchRelatedVideos, fetchVideoComments]);

  var desc = video?.description;

  if (desc !== undefined) {
    var descLinks = desc.replace(/(http[s]?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    document.getElementById('descContainer').innerHTML = descLinks;
  }

  return (
    <div className="flex justify-center flex-row bg-[#0f0f0f]">
      <div className="w-full max-w-[1700px] flex flex-col lg:flex-row">

        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[450px] xl:h-[650px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
              className='player'
            />
          </div>

          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>

          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">

              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt={`Avatar de ${video?.author?.title}`}
                  />
                </div>
              </div>

              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type ===
                    "VERIFIED_CHANNEL" && (
                      <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>

              </div>
            </div>

            <div className="flex text-white font-semibold mt-4 md:mt-0">
              <div className="flex items-center justify-center h-9 px-5 rounded-3xl bg-white/[0.15] hover:bg-white/[0.18] cursor-pointer">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.likes, 2)}`}
                <hr className="w-1 h-7 border-0 border-l-[1px] border-white/[0.2] ml-4" />
                <AiOutlineDislike className="text-xl text-white ml-4" />
              </div>

              <div className="flex items-center justify-center h-9 px-5 rounded-3xl bg-white/[0.15] ml-4 hover:bg-white/[0.18] cursor-pointer">
                {`${abbreviateNumber(video?.stats?.views, 2)} vues`}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-white/[0.12] p-3 text-white text-sm whitespace-pre-wrap hover:bg-white/[0.18] cursor-pointer" onClick={toggleDescription}>
            <div className="flex mb-1 font-semibold">
              {video?.stats?.views !== undefined ? video?.stats?.views.toLocaleString() : 'Indisponible'} vues
              <VideoDate publishedDate={video?.publishedDate} />
            </div>
            <p className={showFullDescription ? 'full-description' : 'truncated-description'} id="descContainer"></p>
            <button className="font-semibold">{showFullDescription ? 'Afficher moins' : 'Afficher plus'}</button>
          </div>

          <div className="text-white flex flex-col mt-5">
            {videoComments?.totalCommentsCount && (
              <span className="font-semibold text-xl ml-1">{videoComments.totalCommentsCount} commentaires</span>
            )}

            {videoComments?.comments?.map((comment, index) => (

              <React.Fragment
                key={index}
              >
                <div className="flex items-start mt-7">
                  <div className="flex h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img
                      className="w-full h-full object-cover"
                      src={comment?.author?.avatar[0]?.url}
                      alt={`Avatar de ${comment?.author?.title}`}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center">
                      <span className="text-[13px] font-semibold mr-2"> {comment?.author?.title}</span>
                      <span className="text-xs text-white/60"> {comment?.publishedTimeText}</span>
                    </div>                   
                    <span className="text-[14px] max-w-[95%]"> {comment?.content}</span>                   
                    <div className="flex mt-2">
                      <AiOutlineLike
                        className="mr-1 h-5 w-5"
                      />
                      <span className="text-xs text-white/60">
                        {`${abbreviateNumber(comment?.stats?.votes, 1)}`}
                      </span>
                      <AiOutlineDislike
                        className="h-5 w-5 ml-5"
                      />
                    </div>

                    <div className="flex items-start mt-2">
                      {comment?.stats?.replies > 0 && (
                        <span className="font-semibold text-sm text-[#3ea6ff] flex items-center">
                          <IoMdArrowDropdown className="mr-2" />
                          {comment?.stats?.replies} {" "}
                          {comment?.stats?.replies === 1 ? "réponse" : "réponses"}
                        </span>
                      )}
                    </div>

                  </div>
                </div>

              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col py-6 px-2 lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents.map((item, index) => {
            if (item.type !== "video") return false;
            return (
              <SuggestionVideoCard
                key={index}
                video={item?.video}
              />
            )
          })}
        </div>

      </div>
    </div>
  );
};

export default VideoDetails;