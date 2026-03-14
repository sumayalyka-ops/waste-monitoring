import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'DASHBOARD', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )},
  { id: 'analytics', label: 'ANALYTICS', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )},
  { id: 'report', label: 'REPORT', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  )},
  { id: 'system', label: 'SYSTEM STATUS', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )},
];

function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  return (
    <div style={{
      width: isOpen ? '220px' : '80px',
      minWidth: isOpen ? '220px' : '80px',
      background: 'linear-gradient(180deg, #0f2610 0%, #1a3a1a 60%, #0d2010 100%)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'relative',
      overflow: 'visible',
      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',      borderRadius: '0 20px 20px 0',
    }}>

      {/* Logo Area */}
      <div style={{
        padding: '60px 20px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid rgba(106,191,94,0.15)',
        marginBottom: '8px',
        position: 'relative',
        background: 'linear-gradient(90deg, #1a3a1a 0%, #2d5a27 100%)',
        borderRadius: '0 20px 0 0',
      }}>
        {/* Hamburger at top-left */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#ffffff',
            display: 'flex',
            padding: '4px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <svg 
          width={isOpen ? "100" : "40"} 
          height={isOpen ? "90" : "40"} 
          viewBox="0 0 100 90" 
          fill="none"
        >
            <rect x="10" y="20" width="80" height="50" rx="5" fill="#2d5a27" />
            <rect x="14" y="24" width="72" height="42" rx="3" fill="#0d1f0d" />
            <circle cx="38" cy="45" r="9" fill="none" stroke="#6abf5e" strokeWidth="2.5" />
            <circle cx="38" cy="45" r="4" fill="#6abf5e" />
            <rect x="35" y="33" width="6" height="4" rx="1" fill="#6abf5e" />
            <rect x="35" y="53" width="6" height="4" rx="1" fill="#6abf5e" />
            <rect x="26" y="42" width="4" height="6" rx="1" fill="#6abf5e" />
            <rect x="46" y="42" width="4" height="6" rx="1" fill="#6abf5e" />
            <circle cx="62" cy="45" r="9" fill="none" stroke="#4a8c3f" strokeWidth="2.5" />
            <circle cx="62" cy="45" r="4" fill="#4a8c3f" />
            <rect x="59" y="33" width="6" height="4" rx="1" fill="#4a8c3f" />
            <rect x="59" y="53" width="6" height="4" rx="1" fill="#4a8c3f" />
            <rect x="50" y="42" width="4" height="6" rx="1" fill="#4a8c3f" />
            <rect x="70" y="42" width="4" height="6" rx="1" fill="#4a8c3f" />
            <rect x="6" y="70" width="88" height="8" rx="3" fill="#1a3a1a" />
            <line x1="50" y1="20" x2="50" y2="5" stroke="#4a8c3f" strokeWidth="2.5" />
            <ellipse cx="50" cy="3" rx="8" ry="10" fill="#6abf5e" transform="rotate(-15 50 3)" />
            <ellipse cx="60" cy="10" rx="7" ry="9" fill="#4a8c3f" transform="rotate(25 60 10)" />
            <ellipse cx="40" cy="10" rx="6" ry="8" fill="#7ed56f" transform="rotate(-25 40 10)" />
          </svg>
      </div>

      {/* Navigation */}
      <nav style={{
        padding: '8px 0px 8px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        zIndex: 2,
        marginTop: '8px',
        overflow: 'visible',
        position: 'relative',
      }}>
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            title={!isOpen ? label : ''}
            style={{
              padding: '11px 16px',
              borderRadius: activePage === id ? '20px 0 0 20px' : '10px',
              border: 'none',
              background: activePage === id ? '#e8e8e0' : 'transparent',
              color: activePage === id ? '#1a3a1a' : 'rgba(180,220,170,0.65)',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: activePage === id ? '12px' : '11px',
              fontWeight: activePage === id ? '800' : '700',
              letterSpacing: '0.8px',
              fontFamily: 'sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isOpen ? 'flex-start' : 'center',
              gap: '10px',
              width: activePage === id ? 'calc(100% + 13px)' : '100%',
              marginRight: '0px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              boxShadow: 'none',
            }}
          >
            {/* Top curve */}
            {activePage === id && (
              <span style={{
                position: 'absolute',
                top: '-20px',
                right: '-1px',
                width: '20px',
                height: '20px',
                background: 'transparent',
                borderRadius: '0 0 12px 0',
                boxShadow: '8px 8px 0 8px #e8e8e0',
                pointerEvents: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            )}

            {/* Icon */}
            <span style={{
              flexShrink: 0,
              transform: activePage === id ? 'scale(1.3)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {icon}
            </span>

            {/* Label */}
            {isOpen && (
              <span style={{
                opacity: 1,
                transition: 'opacity 0.2s ease',
              }}>
                {label}
              </span>
            )}

            {/* Bottom curve */}
            {activePage === id && (
              <span style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-1px',
                width: '20px',
                height: '20px',
                background: 'transparent',
                borderRadius: '0 12px 0 0',
                boxShadow: '8px -8px 0 8px #e8e8e0',
                pointerEvents: 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            )}
          </button>
        ))}
      </nav>

      {/* Wave decoration */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        borderRadius: '0 0 12px 0',
      }}>
        <svg viewBox="0 0 220 380" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((i) => {
            const yStart = 380 - i * 12;
            const yEnd = 200 - i * 12;
            const amplitude = 50;
            return (
              <path
                key={i}
                d={`M -10, ${yStart} C 30, ${yStart - amplitude}, 70, ${yStart + amplitude}, 110, ${yStart - 90} C 150, ${yStart - 90 - amplitude}, 190, ${yStart - 90 + amplitude}, 230, ${yEnd}`}
                stroke={`rgba(106,191,94,${0.08 + i * 0.04})`}
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>
      </div>

    </div>
  );
}

export default Sidebar;