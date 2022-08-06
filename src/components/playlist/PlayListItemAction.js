import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

const PlayListItemAction = ({ handleClickEditIcon, handleClickDeleteIcon }) => {
  return (
    <div className="flex justify-between items-center">
      <RiEdit2Line
        onClick={handleClickEditIcon}
        className="text-xl text-purple-400 hover:text-purple-600 transition"
      />
      <RiDeleteBinLine
        onClick={handleClickDeleteIcon}
        className="text-xl text-pink-400 hover:text-pink-600 transition"
      />
    </div>
  );
};

export default PlayListItemAction;
