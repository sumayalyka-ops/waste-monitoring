import React from 'react';

function Dashboard() {
  const [activeTab, setActiveTab] = React.useState('Recyclable');
  const [dashboardData, setDashboardData] = React.useState(null);
  const [compartments, setCompartments] = React.useState([
    { compartment: 'A', is_active: false, last_updated: null },
    { compartment: 'B', is_active: false, last_updated: null },
    { compartment: 'C', is_active: false, last_updated: null },
  ]);

  // Fetch dashboard data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const dashRes = await fetch('http://localhost:5000/api/dashboard');
        const dashData = await dashRes.json();
        setDashboardData(dashData);

        const compRes = await fetch('http://localhost:5000/api/compartments');
        const compData = await compRes.json();
        setCompartments(compData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
    // Refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Format value helper
  const fmt = (val) => val !== null && val !== undefined ? parseFloat(val).toFixed(2) : '--';

  // Format date helper
  const fmtDate = (val) => val ? new Date(val).toLocaleString() : '--';

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: '10px 12px 10px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>

      {/* Banner */}
      <div style={{
        height: '130px',
        width: '100%',
        outline: '4px solid #4a8c3f',
        outlineOffset: '5px',
        background: '#050f05',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 35 800 60" preserveAspectRatio="none">
          <path d="M0,65 C200,-60 400,190 600,65 S800,-60 1000,65" stroke="rgba(60,140,50,0.3)" strokeWidth="1" fill="none"/>
          <path d="M0,65 C200,190 400,-60 600,65 S800,190 1000,65" stroke="rgba(60,140,50,0.3)" strokeWidth="1" fill="none"/>
          <path d="M0,65 C150,-40 350,170 550,65 S750,-40 950,65" stroke="rgba(80,170,65,0.5)" strokeWidth="1.5" fill="none"/>
          <path d="M0,65 C150,170 350,-40 550,65 S750,170 950,65" stroke="rgba(80,170,65,0.5)" strokeWidth="1.5" fill="none"/>
          <path d="M0,65 C100,-20 300,150 500,65 S700,-20 900,65" stroke="rgba(106,191,94,0.7)" strokeWidth="2" fill="none"/>
          <path d="M0,65 C100,150 300,-20 500,65 S700,150 900,65" stroke="rgba(106,191,94,0.7)" strokeWidth="2" fill="none"/>
          <path d="M0,65 C120,0 280,130 400,65 S600,0 800,65" stroke="rgba(150,220,130,0.6)" strokeWidth="1.5" fill="none"/>
          <path d="M0,65 C120,130 280,0 400,65 S600,130 800,65" stroke="rgba(150,220,130,0.6)" strokeWidth="1.5" fill="none"/>
          <ellipse cx="400" cy="65" rx="80" ry="25" fill="rgba(106,191,94,0.1)"/>
          <ellipse cx="0" cy="65" rx="60" ry="18" fill="rgba(106,191,94,0.15)"/>
          <ellipse cx="800" cy="65" rx="60" ry="18" fill="rgba(106,191,94,0.15)"/>
        </svg>
      </div>

      {/* Waste Type Tabs */}
      <div style={{
        display: 'flex',
        gap: '30px',
        borderBottom: '4px solid #4a8c3f',
        paddingBottom: '10px',
        whiteSpace: 'nowrap',
        width: '100%',
      }}>
        {[
          { label: 'Non-Biodegradable', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
              <path d="M3 6h18"/>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          )},
          { label: 'Recyclable', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
              <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
              <path d="m14 16-3 3 3 3"/>
              <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
              <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
              <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
            </svg>
          )},
          { label: 'Hazardous', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
          )},
        ].map((tab, i) => (
          <div key={i}
            onClick={() => setActiveTab(tab.label)}
            style={{
              padding: '15px 0px',
              flex: 1,
              justifyContent: 'center',
              borderRadius: '8px',
              border: `1px solid ${activeTab === tab.label ? '#2d5a27' : '#ccc'}`,
              background: activeTab === tab.label ? '#2d5a27' : '#fff',
              color: activeTab === tab.label ? '#ffffff' : '#2d5a27',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '20px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
            }}>
            {tab.icon}
            <span style={{ color: activeTab === tab.label ? '#ffffff' : '#333' }}>{tab.label}</span>
          </div>
        ))}
      </div>

      {/* Recyclable Content */}
      {activeTab === 'Recyclable' && <>

        {/* Main Metric Cards */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { label: 'Total Waste Collected', value: fmt(dashboardData?.total_waste_kg), unit: 'kg', icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            )},
            { label: 'Recyclable Waste', value: fmt(dashboardData?.recyclable_total_kg), unit: 'kg', icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
                <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
                <path d="m14 16-3 3 3 3"/>
                <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
                <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
                <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
              </svg>
            )},
          ].map((card, i) => (
            <div key={i} style={{
              flex: 1, background: '#fff', borderRadius: '12px', padding: '20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div>
                <div style={{ fontSize: '17px', color: '#666', marginBottom: '8px' }}>{card.label}:</div>
                <div style={{ fontSize: '30px', fontWeight: '800', color: '#1a3a1a' }}>
                  {card.value} <span style={{ fontSize: '15px', fontWeight: '400' }}>{card.unit}</span>
                </div>
              </div>
              <span>{card.icon}</span>
            </div>
          ))}
        </div>

        {/* Small Metric Cards */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { label: 'Paper Waste', value: fmt(dashboardData?.paper_kg) },
            { label: 'Plastic Waste', value: fmt(dashboardData?.plastic_kg) },
            { label: 'Glass Waste', value: fmt(dashboardData?.glass_kg) },
            { label: 'Metal Waste', value: fmt(dashboardData?.metal_kg) },
          ].map((card, i) => (
            <div key={i} style={{
              flex: 1, background: '#fff', borderRadius: '12px', padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '15px', color: '#666', marginBottom: '6px' }}>{card.label}</div>
              <div style={{ fontSize: '25px', fontWeight: '800', color: '#1a3a1a' }}>
                {card.value} <span style={{ fontSize: '13px', fontWeight: '400' }}>kg</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderBottom: '4px solid #4a8c3f' }} />

        {/* Waste Compartment Status */}
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3a1a', marginBottom: '12px' }}>
            Waste Compartment Status
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {compartments.map((comp, i) => (
              <div key={i} style={{
                flex: 1, background: '#fff', borderRadius: '10px', padding: '14px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: `1px solid ${comp.is_active ? '#4CAF50' : '#ffcccc'}`,
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                    Compartment {comp.compartment}
                  </div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                    Last updated: {fmtDate(comp.last_updated)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: comp.is_active ? '#4CAF50' : '#ff4444',
                    boxShadow: comp.is_active ? '0 0 6px #4CAF50' : 'none',
                  }} />
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px',
                    background: comp.is_active ? '#4CAF50' : '#ff4444',
                    color: '#fff', fontSize: '11px', fontWeight: '700',
                  }}>{comp.is_active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </>}

      {/* Non-Biodegradable Content */}
      {activeTab === 'Non-Biodegradable' && <>
        <div style={{
          background: '#fff3cd', border: '1px solid #ffc107',
          borderRadius: '12px', padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#856404" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#856404' }}>
            🔧 Hardware Not Yet Integrated — Data will appear once hardware is connected.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{
            flex: 1, background: '#fff', borderRadius: '12px', padding: '20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div>
              <div style={{ fontSize: '17px', color: '#666', marginBottom: '8px' }}>Total Non-Bio Waste Collected:</div>
              <div style={{ fontSize: '30px', fontWeight: '800', color: '#1a3a1a' }}>
                -- <span style={{ fontSize: '15px', fontWeight: '400' }}>kg</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '4px solid #4a8c3f' }} />
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3a1a', marginBottom: '12px' }}>
            Waste Compartment Status
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {compartments.map((comp, i) => (
              <div key={i} style={{
                flex: 1, background: '#fff', borderRadius: '10px', padding: '14px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #ffcccc',
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Compartment {comp.compartment}</div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Last updated: --</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4444' }} />
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: '#ff4444', color: '#fff', fontSize: '11px', fontWeight: '700' }}>Inactive</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>}

      {/* Hazardous Content */}
      {activeTab === 'Hazardous' && <>
        <div style={{
          background: '#fff3cd', border: '1px solid #ffc107',
          borderRadius: '12px', padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#856404" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#856404' }}>
            🔧 Hardware Not Yet Integrated — Data will appear once hardware is connected.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{
            flex: 1, background: '#fff', borderRadius: '12px', padding: '20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div>
              <div style={{ fontSize: '17px', color: '#666', marginBottom: '8px' }}>Total Hazardous Waste Collected:</div>
              <div style={{ fontSize: '30px', fontWeight: '800', color: '#1a3a1a' }}>
                -- <span style={{ fontSize: '15px', fontWeight: '400' }}>kg</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '4px solid #4a8c3f' }} />
        <div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3a1a', marginBottom: '12px' }}>
            Waste Compartment Status
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {compartments.map((comp, i) => (
              <div key={i} style={{
                flex: 1, background: '#fff', borderRadius: '10px', padding: '14px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #ffcccc',
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Compartment {comp.compartment}</div>
                  <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>Last updated: --</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4444' }} />
                  <span style={{ padding: '4px 12px', borderRadius: '20px', background: '#ff4444', color: '#fff', fontSize: '11px', fontWeight: '700' }}>Inactive</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>}

    </div>
  );
}

export default Dashboard;