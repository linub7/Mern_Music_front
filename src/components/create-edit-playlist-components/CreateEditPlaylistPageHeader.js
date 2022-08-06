import { RiArrowLeftLine } from 'react-icons/ri';

const CreateEditPlaylistPageHeader = ({ handleClickBackIcon, headerTitle }) => {
  return (
    <div className="flex items-center gap-2">
      <RiArrowLeftLine
        className="text-2xl cursor-pointer text-slate-800"
        onClick={handleClickBackIcon}
      />
      <h1 className="text-xl font-semibold text-slate-800">{headerTitle}</h1>
    </div>
  );
};

export default CreateEditPlaylistPageHeader;
