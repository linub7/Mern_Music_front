import AuthFormButton from 'components/auth/form/common/AuthFormButton';
import AuthFormInput from 'components/auth/form/common/AuthFormInput';
import React from 'react';
import SongUploader from './SongUploader';

const AddSongForm = ({
  handleSubmit,
  song,
  handleChange,
  handleFileChange,
  fileTypes,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/3 mt-3">
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
    </form>
  );
};

export default AddSongForm;
