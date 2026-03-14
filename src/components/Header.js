import React, { useState, useEffect } from 'react';

function Header({ title, onMenuClick, onNavigate }) {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toTimeString().slice(0, 5);
  const dateStr = time.toISOString().slice(0, 10);
const searchItems = [
  { label: 'Dashboard', category: 'Pages', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { label: 'Analytics', category: 'Pages', page: 'analytics', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { label: 'Report', category: 'Pages', page: 'report', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { label: 'System Status', category: 'Pages', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg> },
  { label: 'Weight Sensor A', category: 'Sensors', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { label: 'Weight Sensor B', category: 'Sensors', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { label: 'Weight Sensor C', category: 'Sensors', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { label: 'Weight Sensor D', category: 'Sensors', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  { label: 'Camera Module A', category: 'Sensors', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
  { label: 'Camera Module B', category: 'Sensors', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
  { label: 'Recyclable Waste', category: 'Waste Types', page: 'analytics', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg> },
  { label: 'Non-Biodegradable', category: 'Waste Types', page: 'analytics', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/></svg> },
  { label: 'Hazardous', category: 'Waste Types', page: 'analytics', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { label: 'Paper Waste', category: 'Waste Types', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { label: 'Plastic Waste', category: 'Waste Types', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M10 2h4l1 4H9l1-4z"/><path d="M9 6l-2 16h10L15 6"/></svg> },
  { label: 'Glass Waste', category: 'Waste Types', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M8 2h8l2 10H6L8 2z"/><path d="M6 12v8a2 2 0 002 2h8a2 2 0 002-2v-8"/></svg> },
  { label: 'Metal Waste', category: 'Waste Types', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
  { label: 'System Logs', category: 'System', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { label: 'Hardware Connection', category: 'System', page: 'system', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { label: 'Compartment A', category: 'Compartments', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
  { label: 'Compartment B', category: 'Compartments', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
  { label: 'Compartment C', category: 'Compartments', page: 'dashboard', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
];

  const filteredResults = searchQuery.length > 0
    ? searchItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleSearchSelect = (item) => {
    if (onNavigate) onNavigate(item.page);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <div style={{
      height: '65px',
      background: 'linear-gradient(180deg, #0f2610 0%, #1a3a1a 40%, #0d2010 100%)',
      borderRadius: '12px 0 0 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: '2px solid #4a9a5a',
      flexShrink: 0,
      position: 'relative',
      zIndex: 100,
    }}>

      {/* Left Side - Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#ffffff', fontFamily: 'sans-serif' }}>
          {title}
        </h1>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
            }} />
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', fontFamily: 'monospace' }}>
          {timeStr} | {dateStr}
        </span>

        {/* Search Box */}
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.12)',
            border: `1px solid ${showSearchResults ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
            borderRadius: showSearchResults ? '12px 12px 0 0' : '20px',
            padding: '5px 14px',
            transition: 'all 0.2s ease',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21 21-4.34-4.34"/>
                <circle cx="11" cy="11" r="8"/>
              </svg>
            </span>
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: '#fff', fontSize: '13px', width: '140px',
              }}
            />
            {searchQuery.length > 0 && (
              <button
                onClick={() => { setSearchQuery(''); setShowSearchResults(false); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: '14px', padding: '0' }}>
                ✕
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && filteredResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '280px',
              background: '#fff',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxHeight: '320px',
              overflow: 'auto',
            }}>
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category}>
                  <div style={{
                    padding: '6px 14px',
                    fontSize: '10px',
                    fontWeight: '800',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    background: '#f9f9f9',
                  }}>
                    {category}
                  </div>
                  {items.map((item, i) => (
                    <div key={i}
                      onMouseDown={() => handleSearchSelect(item)}
                      style={{
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f0f7f0'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >
                      <span style={{ fontSize: '16px' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1a3a1a' }}>{item.label}</div>
                        <div style={{ fontSize: '10px', color: '#999' }}>Go to {item.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {showSearchResults && filteredResults.length === 0 && searchQuery.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '280px',
              background: '#fff',
              borderRadius: '0 0 12px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              zIndex: 1000,
              padding: '20px',
              textAlign: 'center',
              color: '#999',
              fontSize: '13px',
            }}>
              No results for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Bell Icon */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#ffffff', display: 'flex', alignItems: 'center',
              padding: '4px', position: 'relative',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute', top: '2px', right: '2px',
                width: '8px', height: '8px',
                background: '#ff4444', borderRadius: '50%',
              }} />
            )}
          </button>

          {showNotifications && (
            <div style={{
              position: 'fixed', top: '60px', right: '10px',
              width: '300px', background: '#ffffff',
              borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              zIndex: 1000, overflow: 'hidden',
            }}>
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(90deg, #1a3a1a 0%, #2d5a27 100%)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Notifications</span>
                <button onClick={() => setShowNotifications(false)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>
                  ✕
                </button>
              </div>
              {notifications.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔔</div>
                  No notifications yet
                </div>
              ) : (
                notifications.map((notif, i) => (
                  <div key={i} style={{
                    padding: '14px 20px', borderBottom: '1px solid #f0f0f0',
                    display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer',
                  }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: notif.color, marginTop: '4px', flexShrink: 0,
                    }} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '13px', color: '#1a3a1a' }}>{notif.title}</div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{notif.desc}</div>
                      <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>{notif.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;