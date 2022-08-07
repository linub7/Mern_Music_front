import { FileUploader } from 'react-drag-drop-files';

const SongUploader = ({ handleFileChange, name, fileTypes }) => {
  return (
    <FileUploader
      handleChange={handleFileChange}
      name={name}
      types={fileTypes}
    />
  );
};

export default SongUploader;
