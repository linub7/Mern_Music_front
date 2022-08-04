import React from 'react';
import {
  RiPauseLine,
  RiPlayLine,
  RiSkipBackLine,
  RiSkipForwardLine,
} from 'react-icons/ri';

const PlayerAudioControls = ({
  handlePreviousSong,
  isPlaying,
  handlePause,
  handlePlay,
  handleNextSong,
}) => {
  return (
    <div className="flex justify-between items-center">
      <RiSkipBackLine
        className="cursor-pointer text-3xl hover:text-pink-400 transition-all"
        onClick={handlePreviousSong}
      />
      {isPlaying ? (
        <RiPauseLine
          className="cursor-pointer text-3xl text-pink-500 hover:text-orange-500 transition-all"
          onClick={handlePause}
        />
      ) : (
        <RiPlayLine
          className="cursor-pointer text-3xl text-pink-500 hover:text-green-400 transition-all"
          onClick={handlePlay}
        />
      )}

      <RiSkipForwardLine
        size={25}
        className="cursor-pointer text-3xl hover:text-pink-500 transition-all"
        onClick={handleNextSong}
      />
    </div>
  );
};

export default PlayerAudioControls;
