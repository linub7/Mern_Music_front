import CustomButton from 'components/Common/CustomButton';

const CreateEditPlaylistPageInputAndButton = ({
  value,
  handleChange,
  handleSavePlaylist,
  selectedSongs,
  btnTitle,
}) => {
  return (
    <div className="flex justify-between gap-3 mt-4">
      <input
        className="w-96"
        type="text"
        placeholder="Name..."
        value={value}
        onChange={handleChange}
      />
      <CustomButton
        btnTitle={btnTitle}
        onClick={handleSavePlaylist}
        disabled={value === '' || selectedSongs.length < 1}
      />
    </div>
  );
};

export default CreateEditPlaylistPageInputAndButton;
