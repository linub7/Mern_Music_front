import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMusic } from 'redux/reducers/songsSlice';
import SongItem from './SongItem';

const SongsList = ({ songs, setIsPlaying }) => {
  const dispatch = useDispatch();
  const { selectedMusic } = useSelector((state) => state.songs);
  const { selectedPlaylist } = useSelector((state) => state.playlist);

  const handleClickSongItem = (song) => {
    setIsPlaying(false);
    dispatch(setSelectedMusic(song));
  };
  return (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        placeholder="Search songs, artist, album ..."
        className="rounded w-full bg-slate-200 text-purple-500 "
      />
      {selectedPlaylist?.songs?.map((song, index) => {
        const isActive = selectedMusic._id === song._id;
        return (
          <SongItem
            key={index}
            song={song}
            onClick={() => handleClickSongItem(song)}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
};

export default SongsList;
