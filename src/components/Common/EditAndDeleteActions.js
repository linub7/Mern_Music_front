import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

const EditAndDeleteActions = ({
  handleClickEditIcon,
  handleClickDeleteIcon,
}) => {
  return (
    <div className="flex justify-between items-center">
      <RiEdit2Line
        onClick={handleClickEditIcon}
        className="text-xl text-purple-400 hover:text-purple-600 transition cursor-pointer"
      />
      <RiDeleteBinLine
        onClick={handleClickDeleteIcon}
        className="text-xl text-pink-400 hover:text-pink-600 transition cursor-pointer"
      />
    </div>
  );
};

export default EditAndDeleteActions;
