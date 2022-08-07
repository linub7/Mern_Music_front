import { addPlaylistHandler } from 'api/song';
import CommonLayout from 'components/Common/layout';
import BackNavigateAndTitlePageHeader from 'components/Common/BackNavigateAndTitlePageHeader';

import CreateEditPlaylistPageInputAndButton from 'components/create-edit-playlist-components/CreateEditPlaylistPageInputAndButton';
import SongItem from 'components/songs/SongItem';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setAuth } from 'redux/reducers/authSlice';
import { setSelectedMusic } from 'redux/reducers/songsSlice';

const CreateEditPlaylist = () => {
  const [name, setName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);

  const { songs } = useSelector((state) => state.songs);
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedMusic({}));
  }, []);

  const handleAddSongIntoPlaylist = (song) => {
    console.log({ song });
    console.log({ selectedSongs });
    if (selectedSongs.includes(song)) {
      setSelectedSongs(selectedSongs.filter((s) => s !== song));
      console.log({ selectedSongs });
    } else {
      setSelectedSongs([...selectedSongs, song]);
      console.log({ selectedSongs });
    }
  };

  const handleSavePlaylist = async () => {
    dispatch(showLoading());
    const selectedSongsIds = selectedSongs.map((s) => s._id);
    const backendPayload = {
      name,
      songs: selectedSongsIds,
    };

    const { err, data } = await addPlaylistHandler(backendPayload, auth?.token);

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      toast.error(err?.error);
      return;
    }
    dispatch(hideLoading());
    toast.success('Playlist created successfully');
    const { success, ...rest } = data;
    console.log('rest: ', data);
    dispatch(setAuth({ ...auth, playlists: rest?.user?.playlists }));
    const cookieAuth = JSON.parse(Cookies.get('auth'));
    cookieAuth.playlists = rest?.user?.playlists;
    Cookies.set('auth', JSON.stringify(cookieAuth));
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <CommonLayout>
      <BackNavigateAndTitlePageHeader
        handleClickBackIcon={() => navigate('/')}
        headerTitle={'Create Playlist'}
      />
      <CreateEditPlaylistPageInputAndButton
        value={name}
        handleChange={(e) => setName(e.target.value)}
        handleSavePlaylist={handleSavePlaylist}
        selectedSongs={selectedSongs}
        btnTitle="Save"
      />
      <h1 className="mt-5 text-xl text-slate-600 font-bold">
        Selected Songs: {selectedSongs.length}
      </h1>
      <hr />

      <div className="grid grid-cols-2 gap-5 mt-4">
        {songs?.map((song) => {
          const isActive = selectedSongs.some(
            (selectedSong) => selectedSong._id === song._id
          );
          return (
            <SongItem
              key={song._id}
              song={song}
              isActive={isActive}
              onClick={() => handleAddSongIntoPlaylist(song)}
            />
          );
        })}
      </div>
    </CommonLayout>
  );
};

export default CreateEditPlaylist;
