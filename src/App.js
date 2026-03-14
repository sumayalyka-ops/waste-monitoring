import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import SystemStatus from './pages/SystemStatus';
import Report from './pages/Report';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isResizing, setIsResizing] = useState(false);

  const pageTitles = {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    report: 'Report',
    system: 'System Status',
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div style={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  background: '#e8e8e0',
  gap: '10px',
  marginLeft: '40px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'width',
}}>

       <Header
         title={pageTitles[activePage]}
         onMenuClick={() => {
  setIsResizing(true);
  setSidebarOpen(!sidebarOpen);
  setTimeout(() => setIsResizing(false), 500);
}}
         onNavigate={setActivePage}
        />

        {/* Page Content */}
        <div style={{
           flex: 1,
           overflow: isResizing ? 'hidden' : 'auto',
           padding: '8px',
       }}>
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'system' && <SystemStatus />}
          {activePage === 'report' && <Report />}
          {activePage === 'analytics' && <Analytics isResizing={isResizing} />}
        </div>

      </div>
    </div>
  );
}

export default App;