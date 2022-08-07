import { getSongsHandler } from 'api/song';
import CommonLayout from 'components/Common/layout';
import Player from 'components/player-components/Player';
import Playlists from 'components/playlist/Playlists';
import SongsList from 'components/songs/SongsList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setSongs } from 'redux/reducers/songsSlice';

const HomePage = ({ forceRenderPage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const { songs, selectedMusic } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetAllSongs();
  }, [auth?.token, forceRenderPage]);

  const handleGetAllSongs = async () => {
    dispatch(showLoading());

    const { err, data } = await getSongsHandler(auth?.token);

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      return;
    }

    dispatch(hideLoading());
    localStorage.setItem('songs', JSON.stringify(data?.songs));
    dispatch(setSongs(data?.songs));
  };
  return (
    <CommonLayout>
      <div className="flex p-2 gap-5">
        <div className="w-1/2 flex flex-col overflow-x-hidden">
          <SongsList songs={songs} setIsPlaying={setIsPlaying} />
        </div>
        <div className="w-1/2">
          <Playlists />
        </div>
      </div>
      {selectedMusic['_id'] !== undefined && (
        <Player
          songTitle={selectedMusic?.title}
          artist={selectedMusic?.artist}
          album={selectedMusic?.album}
          year={selectedMusic?.year}
          audioSrc={selectedMusic?.src?.url}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          selectedMusic={selectedMusic}
        />
      )}
    </CommonLayout>
  );
};

export default HomePage;
