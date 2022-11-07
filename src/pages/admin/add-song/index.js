import BackNavigateAndTitlePageHeader from 'components/Common/BackNavigateAndTitlePageHeader';
import CommonLayout from 'components/Common/layout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormInput from 'components/auth/form/common/AuthFormInput';
import AuthFormButton from 'components/auth/form/common/AuthFormButton';
import SongUploader from 'components/admin/SongUploader';
import { addSongHandler } from 'api/song';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from 'redux/reducers/alertSlice';
import toast from 'react-hot-toast';
import { setSongs } from 'redux/reducers/songsSlice';
import AddSongForm from 'components/admin/AddSongForm';
import CustomSpinner from 'components/Common/CustomSpinner';

const fileTypes = ['MP3'];

const AdminAddSong = () => {
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    duration: '',
    src: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { songs } = useSelector((state) => state.songs);
  const { loading } = useSelector((state) => state.alerts);

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
    // // formData.append('title', song?.title);
    // // formData.append('artist', song?.artist);
    // // formData.append('album', song?.album);
    // // formData.append('year', song?.year);
    // // formData.append('duration', song?.duration);
    // // formData.append('src', song?.src);
    Object.keys(song).forEach((key) => {
      formData.append(key, song[key]);
    });

    const { err, data } = await addSongHandler(formData, auth?.token);
    if (err) {
      console.log(err);
      toast.error(err?.error);
      dispatch(hideLoading());
      return;
    }
    toast.success('Song Upload successfully');
    dispatch(setSongs([...songs, data?.song]));
    const oldSongs = JSON.parse(localStorage.getItem('songs'));
    oldSongs.push(data?.song);
    localStorage.setItem('songs', JSON.stringify(oldSongs));
    dispatch(hideLoading());
    navigate('/admin/all-songs');
  };

  if (loading) return <CustomSpinner />;

  return (
    <CommonLayout>
      <BackNavigateAndTitlePageHeader
        handleClickBackIcon={() => navigate('/admin/all-songs')}
        headerTitle={'Add Song'}
      />

      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3 mt-3">
        <AuthFormInput
          name={'title'}
          placeholder="Title"
          type={'text'}
          value={song?.title}
          onChange={handleChange}
        />
        <AuthFormInput
          name={'artist'}
          placeholder="Artist"
          type={'text'}
          value={song?.artist}
          onChange={handleChange}
        />
        <AuthFormInput
          name={'album'}
          placeholder="Album"
          type={'text'}
          value={song?.album}
          onChange={handleChange}
        />
        <AuthFormInput
          name={'year'}
          placeholder="Year"
          type={'text'}
          value={song?.year}
          onChange={handleChange}
        />
        <AuthFormInput
          name={'duration'}
          placeholder="Duration"
          type={'text'}
          value={song?.duration}
          onChange={handleChange}
        />

        <SongUploader
          name="src"
          handleFileChange={handleFileChange}
          fileTypes={fileTypes}
        />
        {song?.src && <h1 className="text-gray-500">{song?.src?.name}</h1>}
        <AuthFormButton
          btnTitle={'Save'}
          disabled={
            !song?.title ||
            !song?.album ||
            !song?.artist ||
            !song?.duration ||
            !song?.year ||
            !song?.src
          }
        />
      </form> */}
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

export default AdminAddSong;
