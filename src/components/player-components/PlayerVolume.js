import {
  RiVolumeDownLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';

const PlayerVolume = ({ volume, setVolume, audioRef }) => {
  console.log(volume);
  return (
    <div className="flex items-center gap-2 lg:w-72 md:w-48 sm:w-36">
      {volume < 0.1 ? (
        <RiVolumeMuteLine
          className="cursor-pointer text-4xl hover:text-pink-400 transition-all"
          onClick={() => {
            if (volume < 0.1) {
              setVolume(0);
              audioRef.current.volume = 0;
            } else {
              audioRef.current.volume = volume - 0.1;
              setVolume(volume - 0.1);
            }
          }}
        />
      ) : (
        <RiVolumeDownLine
          className="cursor-pointer text-4xl hover:text-pink-400 transition-all"
          onClick={() => {
            if (volume < 0.1) {
              setVolume(0);
              audioRef.current.volume = 0;
            } else {
              audioRef.current.volume = volume - 0.1;
              setVolume(volume - 0.1);
            }
          }}
        />
      )}

      <input
        id="volume-range"
        className="p-0 cursor-pointer w-full from-purple-400 to-pink-600"
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={volume}
        onChange={(e) => {
          audioRef.current.volume = e.target.value;
          setVolume(e.target.value);
        }}
      />
      <RiVolumeUpLine
        className="cursor-pointer text-4xl hover:text-pink-400 transition-all"
        onClick={() => {
          if (volume > 0.9) {
            setVolume(1);
            audioRef.current.volume = 1;
          } else {
            audioRef.current.volume = volume + 0.1;
            setVolume(volume + 0.1);
          }
        }}
      />
    </div>
  );
};

export default PlayerVolume;
