import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMusic } from 'redux/reducers/songsSlice';
import PlayerAudioControls from './PlayerAudioControls';

const PlayerAudio = ({ audioSrc, audioRef, setIsPlaying, isPlaying }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const { songs, selectedMusic } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleNextSong = () => {
    const index = songs.findIndex((song) => song._id === selectedMusic._id);
    const nextSong = songs[index + 1];
    if (nextSong) {
      setIsPlaying(false);
      dispatch(setSelectedMusic(nextSong));
    }
  };

  const handlePreviousSong = () => {
    const index = songs.findIndex((song) => song._id === selectedMusic._id);
    console.log(index);
    const previousSong = songs[index - 1];
    console.log(previousSong);
    if (previousSong) {
      setIsPlaying(false);
      dispatch(setSelectedMusic(previousSong));
    }
  };
  return (
    <div className="space-y-3 lg:w-96 md:w-72 sm:w-44">
      <PlayerAudioControls
        handleNextSong={handleNextSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
        handlePreviousSong={handlePreviousSong}
        isPlaying={isPlaying}
      />
      <audio
        src={audioSrc}
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      ></audio>

      <div className="flex gap-3 items-center">
        <h1>
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
        </h1>
        <input
          type="range"
          id="audio-range"
          className="p-0 cursor-pointer w-full from-purple-400 to-pink-600"
          min={0}
          max={Number(selectedMusic?.duration) * 60}
          value={currentTime}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
            setCurrentTime(e.target.value);
          }}
        />
        <h1>{selectedMusic?.duration}</h1>
      </div>
    </div>
  );
};

export default PlayerAudio;
