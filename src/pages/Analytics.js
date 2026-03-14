import React from 'react';

function Analytics() {
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('Recyclable');

  const ComingSoon = ({ type }) => (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '60px 40px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        padding: '8px 20px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700',
        color: '#856404',
      }}>
        🔧 Hardware Not Yet Integrated
      </div>
      <div style={{ fontSize: '14px', color: '#999', textAlign: 'center' }}>
        {type} compartment hardware will be integrated in the future.
      </div>
      <div style={{ fontSize: '12px', color: '#ccc' }}>
        Charts will appear here once hardware is connected.
      </div>
    </div>
  );

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '10px 12px 10px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {(activeTab === 'Recyclable' ? [
          { label: 'Total Recyclable Today', value: '--', unit: 'kg', color: '#2d5a27', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
    <path d="m14 16-3 3 3 3"/>
    <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
    <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
    <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
  </svg>
)},
{ label: 'Total Recyclable This Week', value: '--', unit: 'kg', color: '#4a8c3f', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4a8c3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)},
{ label: 'Total Recyclable This Month', value: '--', unit: 'kg', color: '#6abf5e', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6abf5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)},
{ label: 'Most Collected Type', value: '--', unit: '', color: '#ffc107', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)},
        ] : activeTab === 'Non-Biodegradable' ? [
          { label: 'Total Non-Bio Today', value: '--', unit: 'kg', color: '#795548', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#795548" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
    <path d="M3 6h18"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
)},
{ label: 'Total Non-Bio This Week', value: '--', unit: 'kg', color: '#8d6e63', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8d6e63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)},
{ label: 'Total Non-Bio This Month', value: '--', unit: 'kg', color: '#a1887f', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#a1887f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)},
        ] : [
          { label: 'Total Hazardous Today', value: '--', unit: 'kg', color: '#f44336', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
    <path d="M12 9v4"/>
    <path d="M12 17h.01"/>
  </svg>
)},
{ label: 'Total Hazardous This Week', value: '--', unit: 'kg', color: '#e53935', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)},
{ label: 'Total Hazardous This Month', value: '--', unit: 'kg', color: '#ef5350', icon: (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ef5350" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
)},
        ]).map((card, i) => (
          <div key={i} style={{
            flex: 1,
            background: '#fff',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            borderLeft: `4px solid ${card.color}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#1a3a1a' }}>
                {card.value} <span style={{ fontSize: '12px', fontWeight: '400' }}>{card.unit}</span>
              </div>
            </div>
            <span>{card.icon}</span>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#c8d89a',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '16px',
        width: '100%',
      }}>

        {/* Waste Type Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Waste Type</label>
          <select value={activeTab} onChange={e => setActiveTab(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px 12px', fontSize: '14px', color: '#333', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '600' }}>
            <option value="Non-Biodegradable">Non-Biodegradable</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Hazardous">Hazardous</option>
          </select>
        </div>

        {/* Date From */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Date From</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 12px', border: '1px solid #ccc', width: '100%' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', flex: 1 }}/>
          </div>
        </div>

        {/* Date To */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Date To</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 12px', border: '1px solid #ccc', width: '100%' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', flex: 1 }}/>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button style={{ padding: '8px 18px', background: '#2d5a27', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Apply
          </button>
          <button style={{ padding: '8px 18px', background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            Reset
          </button>
        </div>
      </div>

      {/* Recyclable Content */}
      {activeTab === 'Recyclable' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#f5f5f0',
            borderRadius: '12px',
            padding: '60px 40px',
            textAlign: 'center',
            color: '#999',
            fontSize: '13px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            <div style={{ fontWeight: '700', fontSize: '14px', color: '#ccc' }}>No Data Available</div>
            <div>📡 Charts will appear here once hardware is connected...</div>
          </div>
        </div>
      )}

      {/* Coming Soon for Non-Bio and Hazardous */}
      {activeTab !== 'Recyclable' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ComingSoon type={activeTab} />
        </div>
      )}

    </div>
  );
}

export default Analytics;