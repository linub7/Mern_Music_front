import CommonLayout from 'components/Common/layout';
import EditAndDeleteActions from 'components/Common/EditAndDeleteActions';
import { useSelector } from 'react-redux';
import './index.css';

import { useNavigate } from 'react-router-dom';
import PageHeader from 'components/Common/PageHeader';
import AllSongsTable from 'components/admin/AllSongsTable';
import CustomSpinner from 'components/Common/CustomSpinner';

const AdminAllSongs = () => {
  const { songs } = useSelector((state) => state.songs);
  const { loading } = useSelector((state) => state.alerts);
  const navigate = useNavigate();

  const handleClickDeleteIcon = (song) => {
    console.log('delete', song);
  };
  const handleClickEditIcon = (song) => {
    navigate(`/admin/songs/edit/${song._id}`, { state: { song } });
  };

  if (loading) return <CustomSpinner />;
  return (
    <CommonLayout>
      <PageHeader
        header={'All Songs'}
        onClick={() => navigate('/admin/add-song')}
        btnTitle={'Add Song'}
      />
      <hr />
      <div className="overflow-x-hidden w-full overflow-y-auto h-96 scrollbar">
        <AllSongsTable
          songs={songs}
          handleClickDeleteIcon={handleClickDeleteIcon}
          handleClickEditIcon={handleClickEditIcon}
        />
      </div>
    </CommonLayout>
  );
};

export default AdminAllSongs;
