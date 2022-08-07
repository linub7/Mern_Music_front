import { updateSongHandler } from 'api/song';
import AddSongForm from 'components/admin/AddSongForm';
import BackNavigateAndTitlePageHeader from 'components/Common/BackNavigateAndTitlePageHeader';
import CommonLayout from 'components/Common/layout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import { setSongs } from 'redux/reducers/songsSlice';
import { setSelectedPlaylist } from 'redux/reducers/playlistSlice';

const fileTypes = ['MP3'];

const AdminEditSingleSong = ({ setForceRenderPage }) => {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    duration: '',
    src: null,
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { songs } = useSelector((state) => state.songs);

  useEffect(() => {
    setSong(state?.song);
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file) => {
    setSong((prev) => ({ ...prev, src: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());

    console.log(song);

    const formData = new FormData();
    Object.keys(song).forEach((key) => {
      formData.append(key, song[key]);
    });

    const { err, data } = await updateSongHandler(
      song?._id,
      formData,
      auth?.token
    );
    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }
    toast.success('Song updated successfully');
    dispatch(hideLoading());
    dispatch(setSongs(data?.songs));
    const allPlaylists = [
      {
        name: 'All Songs',
        songs: data?.songs,
      },
      ...auth?.playlists,
    ];
    dispatch(setSelectedPlaylist(allPlaylists[0]));
    localStorage.removeItem('songs');
    localStorage.setItem('songs', JSON.stringify(data?.songs));
    setForceRenderPage((prev) => !prev);
    navigate('/admin/all-songs');
  };

  return (
    <CommonLayout>
      <BackNavigateAndTitlePageHeader
        handleClickBackIcon={() => navigate('/admin/all-songs')}
        headerTitle={'Edit Song'}
      />
      <hr />
      <AddSongForm
        song={song}
        fileTypes={fileTypes}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
    </CommonLayout>
  );
};

export default AdminEditSingleSong;
