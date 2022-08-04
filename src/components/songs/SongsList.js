import SongItem from './SongItem';

const SongsList = ({ songs, setIsPlaying }) => {
  return (
    <div className="flex flex-col gap-5">
      <input
        type="text"
        placeholder="Search songs, artist, album ..."
        className="rounded w-full bg-slate-200 text-purple-500 "
      />
      {songs?.map((song) => (
        <SongItem key={song._id} song={song} setIsPlaying={setIsPlaying} />
      ))}
    </div>
  );
};

export default SongsList;
