import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlaylist } from 'redux/reducers/playlistSlice';
import { setSelectedMusic } from 'redux/reducers/songsSlice';
import SongItem from './SongItem';

const SongsList = ({ songs, setIsPlaying }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultSongs, setSearchResultSongs] = useState([]);

  const dispatch = useDispatch();
  const { selectedMusic } = useSelector((state) => state.songs);
  const { selectedPlaylist } = useSelector((state) => state.playlist);

  useEffect(() => {
    if (
      selectedPlaylist &&
      selectedPlaylist?.name === 'All Songs' &&
      searchTerm !== ''
    ) {
      const tempSongs = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.album.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResultSongs(tempSongs);
    } else {
      setSearchResultSongs(selectedPlaylist?.songs);
    }
  }, [selectedPlaylist, searchTerm, songs]);

  const handleClickSongItem = (song) => {
    setIsPlaying(false);
    dispatch(setSelectedMusic(song));
  };
  return (
    <div className="flex flex-col gap-6">
      <input
        type="text"
        placeholder="Search songs, artist, album ..."
        className="rounded w-full bg-slate-200 text-purple-500"
        onFocus={() =>
          dispatch(setSelectedPlaylist({ name: 'All Songs', songs }))
        }
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-hidden w-full overflow-y-auto h-80 scrollbar">
        {searchResultSongs?.map((song, index) => {
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
    </div>
  );
};

export default SongsList;
