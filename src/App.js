import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import Home from 'pages/home';
import NotFound from 'pages/not-found';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomSpinner from 'components/Common/CustomSpinner';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import OnlyAdminRoutes from 'routes/OnlyAdminRoutes';
import CreateEditPlaylist from 'pages/create-edit-playlist';
import EditSinglePlaylist from 'pages/create-edit-playlist/[playlistName]';
import AdminAllSongs from 'pages/admin/all-songs';
import AdminAddSong from 'pages/admin/add-song';
import AdminEditSingleSong from 'pages/admin/songs/edit/[songId]';

function App() {
  const [forceRenderPage, setForceRenderPage] = useState(false);
  const { loading } = useSelector((state) => state.alerts);

  useEffect(() => {}, [forceRenderPage]);

  return (
    <>
      {loading && <CustomSpinner />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={<Home forceRenderPage={forceRenderPage} />}
          />
          <Route
            path="/create-edit-playlist/:playlistId"
            element={
              <EditSinglePlaylist setForceRenderPage={setForceRenderPage} />
            }
          />
          <Route
            path="/create-edit-playlist"
            element={<CreateEditPlaylist />}
          />
        </Route>
        <Route element={<OnlyAdminRoutes />}>
          <Route path="/admin/all-songs" element={<AdminAllSongs />} />
          <Route path="/admin/add-song" element={<AdminAddSong />} />
          <Route
            path="/admin/songs/edit/:songId"
            element={
              <AdminEditSingleSong setForceRenderPage={setForceRenderPage} />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
