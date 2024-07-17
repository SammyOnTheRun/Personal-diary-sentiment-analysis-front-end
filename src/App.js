// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateEntry from './components/CreateEntry';
import Entries from './components/Entries';
import Navigation from './components/Navigation';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/entries" element={<MainLayout><Entries /></MainLayout>} />
        <Route path="/create" element={<MainLayout><CreateEntryWrapper /></MainLayout>} />
      </Routes>
    </Router>
  );
}

function MainLayout({ children }) {
  return (
    <div>
      <Navigation />
      <div className="container">
        {children}
      </div>
    </div>
  );
}

function CreateEntryWrapper() {
  const [entries, setEntries] = React.useState([]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/entries');
      setEntries(response.data);
    } catch (error) {
      console.error('There was an error fetching the entries!', error);
    }
  };

  React.useEffect(() => {
    fetchEntries();
  }, []);

  return <CreateEntry fetchEntries={fetchEntries} />;
}

export default App;
