import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Main Container - takes up the rest of the space */}
      <div className="flex-1 flex flex-col">
        {/* Header - fixed at the top */}
        <Header />

        {/* Main Content Area - scrollable */}
        <main className="flex-1 bg-neutral-100 p-8 overflow-y-auto">
          <MainContent />
        </main>
      </div>
    </div>
  );
}

export default App;