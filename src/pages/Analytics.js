import React from 'react';

function Analytics() {
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('Recyclable');
  const [analyticsData, setAnalyticsData] = React.useState(null);

  const fetchAnalytics = async () => {
    try {
      let url = `http://localhost:5000/api/analytics?type=${activeTab.toLowerCase().replace('-', '')}`;
      if (dateFrom && dateTo) {
        url += `&from=${dateFrom}&to=${dateTo}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    }
  };

  React.useEffect(() => {
    fetchAnalytics();
  }, [activeTab]);

  const fmt = (val) => val !== null && val !== undefined ? parseFloat(val).toFixed(2) : '--';

  const ComingSoon = ({ type }) => (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '12px', padding: '60px 40px',
      background: '#fff', borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        padding: '8px 20px', background: '#fff3cd',
        border: '1px solid #ffc107', borderRadius: '20px',
        fontSize: '12px', fontWeight: '700', color: '#856404',
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
      flex: 1, overflow: 'auto',
      padding: '10px 12px 10px 10px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {(activeTab === 'Recyclable' ? [
          { label: 'Total Recyclable Today', value: fmt(analyticsData?.today_kg), color: '#2d5a27' },
          { label: 'Total Recyclable This Week', value: fmt(analyticsData?.week_kg), color: '#4a8c3f' },
          { label: 'Total Recyclable This Month', value: fmt(analyticsData?.month_kg), color: '#6abf5e' },
          { label: 'Most Collected Type', value: analyticsData?.most_collected || '--', color: '#ffc107' },
        ] : activeTab === 'Non-Biodegradable' ? [
          { label: 'Total Non-Bio Today', value: '--', color: '#795548' },
          { label: 'Total Non-Bio This Week', value: '--', color: '#8d6e63' },
          { label: 'Total Non-Bio This Month', value: '--', color: '#a1887f' },
        ] : [
          { label: 'Total Hazardous Today', value: '--', color: '#f44336' },
          { label: 'Total Hazardous This Week', value: '--', color: '#e53935' },
          { label: 'Total Hazardous This Month', value: '--', color: '#ef5350' },
        ]).map((card, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', borderRadius: '12px',
            padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            borderLeft: `4px solid ${card.color}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#1a3a1a' }}>
                {card.value} <span style={{ fontSize: '12px', fontWeight: '400' }}>
                  {card.label.includes('Type') ? '' : 'kg'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#c8d89a', borderRadius: '12px',
        padding: '16px 20px', display: 'flex',
        alignItems: 'flex-end', gap: '16px', width: '100%',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Waste Type</label>
          <select value={activeTab} onChange={e => setActiveTab(e.target.value)}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px 12px', fontSize: '14px', color: '#333', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '600' }}>
            <option value="Non-Biodegradable">Non-Biodegradable</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Hazardous">Hazardous</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Date From</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 12px', border: '1px solid #ccc' }}>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', flex: 1 }}/>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Date To</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 12px', border: '1px solid #ccc' }}>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', flex: 1 }}/>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button onClick={fetchAnalytics}
            style={{ padding: '8px 18px', background: '#2d5a27', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            Apply
          </button>
          <button onClick={() => { setDateFrom(''); setDateTo(''); }}
            style={{ padding: '8px 18px', background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
            Reset
          </button>
        </div>
      </div>

      {/* Recyclable Charts Area */}
      {activeTab === 'Recyclable' && (
        <div style={{
          background: '#f5f5f0', borderRadius: '12px',
          padding: '60px 40px', textAlign: 'center',
          color: '#999', fontSize: '13px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '12px',
        }}>
          {analyticsData?.chart_data?.length > 0 ? (
            <div style={{ width: '100%' }}>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#2d5a27', marginBottom: '12px' }}>
                Daily Recyclable Waste (kg)
              </div>
              {analyticsData.chart_data.map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '100px', fontSize: '12px', color: '#666' }}>{row.date}</div>
                  <div style={{
                    height: '20px',
                    width: `${Math.min(parseFloat(row.total) * 50, 400)}px`,
                    background: '#4a8c3f',
                    borderRadius: '4px',
                  }} />
                  <div style={{ fontSize: '12px', color: '#333', fontWeight: '600' }}>{parseFloat(row.total).toFixed(2)} kg</div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#ccc' }}>No Data Available</div>
              <div>📡 Charts will appear here once hardware is connected...</div>
            </>
          )}
        </div>
      )}

      {activeTab !== 'Recyclable' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ComingSoon type={activeTab} />
        </div>
      )}

    </div>
  );
}

export default Analytics;