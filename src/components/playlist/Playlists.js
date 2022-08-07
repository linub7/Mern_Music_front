import { deletePlaylistHandler } from 'api/song';
import PageHeader from 'components/Common/PageHeader';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setAuth } from 'redux/reducers/authSlice';
import { setSelectedPlaylist } from 'redux/reducers/playlistSlice';
import PlaylistItem from './PlaylistItem';

const Playlists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { songs } = useSelector((state) => state.songs);
  const { selectedPlaylist } = useSelector((state) => state.playlist);

  const allPlaylists = [
    {
      name: 'All Songs',
      songs,
    },
    ...auth?.playlists,
  ];

  useEffect(() => {
    if (!selectedPlaylist && songs.length > 0) {
      dispatch(setSelectedPlaylist(allPlaylists[0]));
    }
  }, [selectedPlaylist, songs]);

  const handleSetSelectedPlaylist = (playlist) => {
    dispatch(setSelectedPlaylist(playlist));
  };

  const handleClickDeleteIcon = async (playlist) => {
    const isConfirm = window.confirm(
      `Are you sure you want to delete ${playlist.name} playlist?`
    );

    if (isConfirm) {
      dispatch(showLoading());
      const { err, data } = await deletePlaylistHandler(
        playlist._id,
        auth?.token
      );

      if (err) {
        console.log(err);
        dispatch(hideLoading());
        toast.error(err?.error);
        return;
      }
      dispatch(hideLoading());
      toast.success('Playlist deleted successfully');
      const { success, ...rest } = data;
      console.log('rest: ', data);
      dispatch(setAuth({ ...auth, playlists: rest?.user?.playlists }));
      const cookieAuth = JSON.parse(Cookies.get('auth'));
      cookieAuth.playlists = rest?.user?.playlists;
      Cookies.set('auth', JSON.stringify(cookieAuth));
    }
  };

  return (
    <div>
      <PageHeader
        header={'Your Playlists'}
        onClick={() => navigate('/create-edit-playlist')}
        btnTitle={'Create Playlist'}
      />
      <div className="grid grid-cols-2 gap-3 mt-5">
        {allPlaylists?.map((playlist, index) => {
          const isSelected = playlist.name === selectedPlaylist?.name;
          return (
            <PlaylistItem
              key={index}
              handleSetSelectedPlaylist={() =>
                handleSetSelectedPlaylist(playlist)
              }
              handleClickEditIcon={() =>
                navigate(`/create-edit-playlist/${playlist?._id}`, {
                  state: playlist,
                })
              }
              handleClickDeleteIcon={() => handleClickDeleteIcon(playlist)}
              isSelected={isSelected}
              playlist={playlist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
