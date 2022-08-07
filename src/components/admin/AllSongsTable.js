import EditAndDeleteActions from 'components/Common/EditAndDeleteActions';

const AllSongsTable = ({
  songs,
  handleClickDeleteIcon,
  handleClickEditIcon,
}) => {
  return (
    <table className="w-full mt-3">
      <thead className="w-full">
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th>Year</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {songs?.map((song) => (
          <tr key={song?._id}>
            <td>{song?.title}</td>
            <td>{song?.artist}</td>
            <td>{song?.album}</td>
            <td>{song?.year}</td>
            <td>{song?.duration}</td>
            <td>
              <EditAndDeleteActions
                handleClickDeleteIcon={() => handleClickDeleteIcon(song)}
                handleClickEditIcon={() => handleClickEditIcon(song)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllSongsTable;
