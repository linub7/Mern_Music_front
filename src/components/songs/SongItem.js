import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMusic } from 'redux/reducers/songsSlice';

const SongItem = ({ song, setIsPlaying }) => {
  const dispatch = useDispatch();
  const { selectedMusic } = useSelector((state) => state.songs);
  const isActive = selectedMusic._id === song._id;
  return (
    <div
      className={`flex items-center justify-between cursor-pointer hover:-mx-3 ${
        isActive ? 'bg-purple-200 px-1 rounded' : ''
      } hover:bg-purple-300 hover:rounded hover:px-1 transition-all`}
      onClick={() => {
        setIsPlaying(false);
        dispatch(setSelectedMusic(song));
      }}
    >
      <div>
        <h1 className="text-xl font-semibold text-slate-700">{song?.title}</h1>
        <p className="text-sm text-slate-500 ">
          {song?.artist} {song?.album} {song?.year}{' '}
        </p>
      </div>
      <div className="text-pink-400 font-semibold">{song?.duration}</div>
    </div>
  );
};

export default SongItem;
