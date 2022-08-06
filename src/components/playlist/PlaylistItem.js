import PlayListItemAction from './PlayListItemAction';

const PlaylistItem = ({
  handleSetSelectedPlaylist,
  isSelected,
  playlist,
  handleClickEditIcon,
  handleClickDeleteIcon,
}) => {
  return (
    <div
      onClick={handleSetSelectedPlaylist}
      className={`flex flex-col gap-3 shadow border rounded-md p-2 cursor-pointer ${
        isSelected ? 'border-purple-500 bg-slate-200' : ''
      }`}
    >
      <h1 className="font-semibold text-slate-600">{playlist?.name}</h1>
      <h1 className="text-sm text-slate-500">
        {playlist?.songs?.length} Songs
      </h1>
      {playlist?.name !== 'All Songs' && (
        <PlayListItemAction
          handleClickDeleteIcon={handleClickDeleteIcon}
          handleClickEditIcon={handleClickEditIcon}
        />
      )}
    </div>
  );
};

export default PlaylistItem;
