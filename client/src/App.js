import './App.css';
import { Routes, Route } from 'react-router-dom';

import AllNotes from './components/Notes/AllNotes/AllNotes';
import CreateNote from './components/Notes/CreateNote/CreateNote';
import Layout from './components/layout/Layout';
import Login from './components/Login/Login';
import NoteDetails from './components/Notes/NoteDetails/NoteDetails';
import Register from './components/Register/Register';
import WeeklyReport from './components/WeeklyReport/WeeklyReport';
import { UserRoute, GuestRoute } from './components/common/GuardRoute';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />}/>

        <Route element={<UserRoute />}>
          <Route path="/share-day" element={<CreateNote />} />
          <Route path="/notes/:userId" element={<AllNotes />}/>
          <Route path="/notes/:userId/:noteId" element={<NoteDetails />}/>
          <Route path="/weekly-report/:userId" element={<WeeklyReport />} />
        </Route>
        
        <Route element={<GuestRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;