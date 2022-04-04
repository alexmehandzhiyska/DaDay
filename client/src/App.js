import './App.css';
import { Routes, Route } from 'react-router-dom';

import AllNotes from './components/Notes/AllNotes/AllNotes';
import CreateNote from './components/Notes/CreateNote/CreateNote';
import Layout from './components/layout/Layout';
import Login from './components/Login/Login';
import NoteDetails from './components/Notes/NoteDetails/NoteDetails';
import WeeklyReport from './components/WeeklyReport/WeeklyReport';
import Register from './components/Register/Register';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/share-day" element={<CreateNote />} />
        <Route path="/notes/:userId" element={<AllNotes />}/>
        <Route path="/notes/:userId/:noteId" element={<NoteDetails />}/>
        <Route path="/weekly-report/:userId" element={<WeeklyReport />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;