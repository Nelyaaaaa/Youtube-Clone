import React from 'react';
import moment from 'moment';

const VideoLength = ({ time }) => {

    const duration = moment.duration(time, 'seconds');

    let formattedDuration = "";

    if (duration.asSeconds() < 3600) {
        formattedDuration = moment.utc(duration.asMilliseconds()).format("mm:ss");
    } else {
        formattedDuration = moment.utc(duration.asMilliseconds()).format("H:mm:ss");
    }

    return (
        <div className='absolute bottom-1 right-1 bg-[#0f0f0f]/[0.8] py-[1px] px-1 text-white font-semibold text-xs rounded'>
            {formattedDuration}
        </div>
    );
}

export default VideoLength;