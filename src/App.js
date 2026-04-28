// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  return (
    <div className="dashboard-shell flex min-h-screen w-screen overflow-x-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="w-full flex-1 overflow-y-auto px-8 py-7 xl:px-10 2xl:px-12">
          <MainContent />
        </main>
      </div>
    </div>
  );
}

export default App;