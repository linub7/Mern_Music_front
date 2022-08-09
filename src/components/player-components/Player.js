import { createRef, useState } from 'react';
import PlayerAudio from './PlayerAudio';
import PlayerInfo from './PlayerInfo';
import PlayerVolume from './PlayerVolume';

const Player = ({
  songTitle,
  artist,
  album,
  year,
  audioSrc,
  isPlaying,
  setIsPlaying,
}) => {
  const audioRef = createRef();
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 p-5 shadow-lg w-full bg-gray-100 border">
      <div className="flex justify-between items-center">
        <PlayerInfo
          songTitle={songTitle}
          artist={artist}
          album={album}
          year={year}
        />
        <PlayerAudio
          shuffleOn={shuffleOn}
          setShuffleOn={setShuffleOn}
          audioSrc={audioSrc}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <PlayerVolume
          volume={volume}
          setVolume={setVolume}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
};

export default Player;
