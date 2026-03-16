import React from 'react';

function SystemStatus() {
  const [uptime, setUptime] = React.useState(0);
  const [statusData, setStatusData] = React.useState(null);

  React.useEffect(() => {
    const timer = setInterval(() => setUptime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/system-status');
      const data = await res.json();
      setStatusData(data);
    } catch (err) {
      console.error('Error fetching system status:', err);
    }
  };

  React.useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatLastSync = (ts) => {
    if (!ts) return '--:--:--';
    return new Date(ts).toLocaleString();
  };

  // Map compartment status to hardware items
  const getCompartmentStatus = (comp) => {
    if (!statusData?.compartments) return false;
    const found = statusData.compartments.find(c => c.compartment === comp);
    return found?.is_active || false;
  };

  const getLastPing = (comp) => {
    if (!statusData?.compartments) return '--';
    const found = statusData.compartments.find(c => c.compartment === comp);
    return found?.last_updated ? new Date(found.last_updated).toLocaleString() : '--';
  };

  const hardware = [
    { label: 'Weight Sensor A (Recyclable)', connected: getCompartmentStatus('A'), lastPing: getLastPing('A') },
    { label: 'Weight Sensor B', connected: getCompartmentStatus('B'), lastPing: getLastPing('B') },
    { label: 'Weight Sensor C', connected: getCompartmentStatus('C'), lastPing: getLastPing('C') },
    { label: 'Camera Module A', connected: false, lastPing: '--' },
    { label: 'Camera Module B', connected: false, lastPing: '--' },
    { label: 'MQTT Broker', connected: true, lastPing: 'Active' },
  ];

  const allConnected = hardware.every(hw => hw.connected);
  const logs = statusData?.logs || [];

  return (
    <div style={{
      flex: 1, overflow: 'auto',
      padding: '10px 12px 10px 10px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>

      {/* Top Status Banner */}
      <div style={{
        background: allConnected ? '#2d5a27' : '#fff3cd',
        borderRadius: '10px', padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        border: `1px solid ${allConnected ? '#4CAF50' : '#ffc107'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: allConnected ? '#4CAF50' : '#ffc107',
            boxShadow: allConnected ? '0 0 8px #4CAF50' : '0 0 8px #ffc107',
          }}/>
          <span style={{ fontWeight: '700', fontSize: '14px', color: allConnected ? '#fff' : '#856404' }}>
            {allConnected ? '✅ All Systems Operational' : '⚠️ Waiting for Hardware Connection...'}
          </span>
        </div>
        <button onClick={fetchStatus}
          style={{
            background: 'none', border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: '8px', padding: '6px 14px', cursor: 'pointer',
            fontSize: '12px', fontWeight: '600',
            color: allConnected ? '#fff' : '#856404',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
          </svg>
          Refresh
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

        {/* Left - Hardware Connection Status */}
        <div style={{ flex: 2, background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3a1a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            Hardware Connection Status
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hardware.map((hw, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 16px', borderRadius: '8px',
                border: '1px solid #e0e0e0',
                borderLeft: `4px solid ${hw.connected ? '#4CAF50' : '#ff4444'}`,
                transition: 'all 0.2s ease', cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: hw.connected ? '#2d5a27' : '#ccc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {hw.connected ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{hw.label}</div>
                    <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Last ping: {hw.lastPing}</div>
                  </div>
                </div>
                <span style={{
                  padding: '4px 14px', borderRadius: '20px',
                  background: hw.connected ? '#2d5a27' : '#ff4444',
                  color: '#fff', fontSize: '12px', fontWeight: '700',
                }}>
                  {hw.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - 3 boxes */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Uptime */}
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '28px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid #2d5a27',
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1a3a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              System Uptime
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#1a3a1a', fontFamily: 'monospace' }}>
              {formatUptime(uptime)}
            </div>
            <div style={{ marginTop: '10px', background: '#f0f0f0', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min((uptime / 3600) * 100, 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #2d5a27, #6abf5e)',
                borderRadius: '8px', transition: 'width 1s ease',
              }}/>
            </div>
            <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>HH:MM:SS since page loaded</div>
          </div>

          {/* Last Sync Time */}
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '28px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid #ffc107',
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1a3a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
              </svg>
              Last Sync Time
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#1a3a1a' }}>
              {formatLastSync(statusData?.last_sync)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <div style={{ fontSize: '11px', color: statusData?.last_sync ? '#4CAF50' : '#999' }}>
                {statusData?.last_sync ? '✅ Data received from hardware' : '⚠️ Waiting for hardware connection...'}
              </div>
            </div>
          </div>

          {/* System Logs */}
          <div style={{
            background: '#fff', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '4px solid #2196F3',
          }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#1a3a1a', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                System Logs
              </div>
            </div>
            <div style={{
              background: '#fefefe', borderRadius: '8px', padding: '10px',
              height: '140px', overflow: 'auto',
              fontSize: '12px', fontFamily: 'monospace',
            }}>
              {logs.length === 0 ? (
                <div style={{ color: '#4CAF50', textAlign: 'center', marginTop: '50px' }}>
                  &gt; No logs yet...
                </div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} style={{ marginBottom: '4px', color: '#4CAF50' }}>
                    <span style={{ color: '#666' }}>[{log.time}]</span>
                    <span style={{ margin: '0 6px', padding: '1px 6px', borderRadius: '4px', background: '#4CAF5020', fontSize: '10px' }}>
                      INFO
                    </span>
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      <div style={{ borderBottom: '4px solid #4a8c3f' }} />

    </div>
  );
}

export default SystemStatus;