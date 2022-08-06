import { getSinglePlaylistHandler, updatePlaylistHandler } from 'api/song';
import CommonLayout from 'components/Common/layout';
import CreateEditPlaylistPageHeader from 'components/create-edit-playlist-components/CreateEditPlaylistPageHeader';
import CreateEditPlaylistPageInputAndButton from 'components/create-edit-playlist-components/CreateEditPlaylistPageInputAndButton';
import SongItem from 'components/songs/SongItem';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setAuth } from 'redux/reducers/authSlice';

const EditSinglePlaylist = ({ setForceRenderPage }) => {
  const [name, setName] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs } = useSelector((state) => state.songs);
  const { auth } = useSelector((state) => state.auth);

  console.log({ playlist });
  console.log({ selectedSongs });

  useEffect(() => {
    handleGetSinglePlaylist();
  }, [auth?.token]);

  const handleGetSinglePlaylist = async () => {
    dispatch(showLoading());

    const { err, data } = await getSinglePlaylistHandler(
      playlistId,
      auth?.token
    );

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      return;
    }
    dispatch(hideLoading());
    setPlaylist(data?.playlist);
    setName(data?.playlist?.name);
    setSelectedSongs(data?.playlist?.songs);
  };

  const handleAddSongIntoPlaylist = (song) => {
    const existSong = selectedSongs.find((s) => s._id === song._id);
    if (existSong) {
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const handleEditPlaylist = async () => {
    dispatch(showLoading());
    const selectedSongsIds = selectedSongs.map((s) => s._id);

    const backendPayload = {
      name,
      songs: selectedSongsIds,
    };

    if (selectedSongsIds.length === 0) {
      toast.error('Please select at least one song');
      return;
    }

    if (name === '') {
      toast.error('Please enter playlist name');
      return;
    }

    const { err, data } = await updatePlaylistHandler(
      playlistId,
      backendPayload,
      auth?.token
    );

    if (err) {
      console.log(err);
      dispatch(hideLoading());
      toast.error(err?.error);
      return;
    }
    dispatch(hideLoading());
    toast.success('Playlist updated successfully');
    const { success, ...rest } = data;
    console.log('rest: ', data);
    dispatch(setAuth({ ...auth, playlists: rest?.user?.playlists }));
    const cookieAuth = JSON.parse(Cookies.get('auth'));
    cookieAuth.playlists = rest?.user?.playlists;
    Cookies.set('auth', JSON.stringify(cookieAuth));
    setForceRenderPage((prev) => !prev);
    navigate('/');
  };

  return (
    <CommonLayout>
      <CreateEditPlaylistPageHeader
        handleClickBackIcon={() => navigate('/')}
        headerTitle={'Edit Playlist'}
      />
      <CreateEditPlaylistPageInputAndButton
        value={name}
        handleChange={(e) => setName(e.target.value)}
        handleSavePlaylist={handleEditPlaylist}
        selectedSongs={selectedSongs}
        btnTitle={'Update'}
      />
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

export default EditSinglePlaylist;
