import React from 'react';

function Report() {
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [wasteTypeFilter, setWasteTypeFilter] = React.useState('All');
  const [compartmentFilter, setCompartmentFilter] = React.useState('All');
  const [currentPage, setCurrentPage] = React.useState(1);
  const recordsPerPage = 15;

  const records = [];

  const filteredRecords = records.filter(r => {
    if (wasteTypeFilter !== 'All' && r.wasteType !== wasteTypeFilter) return false;
    if (compartmentFilter !== 'All' && r.compartment !== compartmentFilter) return false;
    if (dateFrom && r.date < dateFrom) return false;
    if (dateTo && r.date > dateTo) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const getWasteTypeColor = (type) => {
    if (type.includes('Recyclable')) return '#2d5a27';
    if (type.includes('Non-Biodegradable')) return '#FF9800';
    if (type.includes('Hazardous')) return '#f44336';
    return '#333';
  };

  const reportId = `RPT-${new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '')}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) return alert('No data to export.');
    const headers = ['Date & Time', 'Waste Type', 'Weight (kg)', 'Compartment ID'];
    const rows = filteredRecords.map(r => [r.datetime, r.wasteType, r.weight, r.compartment]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}.csv`;
    a.click();
  };

  const handlePrint = () => window.print();

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
      <div style={{ display: 'flex', gap: '16px' }}>
        {[
          {
            label: 'Total Waste (Selected Period)',
            value: records.length > 0 ? `${records.reduce((a, b) => a + b.weight, 0).toFixed(1)} kg` : '--',
            sub: records.length > 0 ? '+0% from last week' : 'Waiting for hardware data...',
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            ),
            subColor: '#4CAF50',
          },
          {
            label: 'Highest Waste Type',
            value: records.length > 0 ? 'Recyclable' : '--',
            sub: records.length > 0 ? '0.0 kg collected' : 'Waiting for hardware data...',
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2">
                <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/>
                <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/>
                <path d="m14 16-3 3 3 3"/>
                <path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>
                <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/>
                <path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>
              </svg>
            ),
            subColor: '#2d5a27',
          },
          {
            label: 'Weekly Trend',
            value: records.length > 0 ? 'Rising' : '--',
            sub: records.length > 0 ? 'Increasing activity' : 'Waiting for hardware data...',
            icon: (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d5a27" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            ),
            subColor: '#4CAF50',
          },
        ].map((card, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', borderRadius: '12px', padding: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column', gap: '6px',
          }}>
            <div style={{ fontSize: '12px', color: '#999', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {card.label}
              {card.icon}
            </div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#1a3a1a' }}>{card.value}</div>
            <div style={{ fontSize: '12px', color: card.subColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
              {records.length > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                </svg>
              )}
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#c8d89a', borderRadius: '12px', padding: '16px 20px',
        display: 'flex', alignItems: 'flex-end', gap: '16px', width: '100%',
      }}>

        {/* Waste Type */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Waste Type</label>
          <select value={wasteTypeFilter} onChange={e => { setWasteTypeFilter(e.target.value); setCurrentPage(1); }}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px 12px', fontSize: '14px', color: '#333', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '600' }}>
            <option value="All">All</option>
            <option value="Recyclable">Recyclable</option>
            <option value="Non-Biodegradable">Non-Biodegradable</option>
            <option value="Hazardous">Hazardous</option>
          </select>
        </div>

        {/* Compartment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Compartment</label>
          <select value={compartmentFilter} onChange={e => { setCompartmentFilter(e.target.value); setCurrentPage(1); }}
            style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '7px 12px', fontSize: '14px', color: '#333', background: '#fff', outline: 'none', cursor: 'pointer', fontWeight: '600' }}>
            <option value="All">All</option>
            <option value="Compartment A">Compartment A</option>
            <option value="Compartment B">Compartment B</option>
            <option value="Compartment C">Compartment C</option>
          </select>
        </div>

        {/* Date From */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Date From</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 12px', border: '1px solid #ccc' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setCurrentPage(1); }}
              style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', flex: 1 }}/>
          </div>
        </div>

        {/* Date To */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>Date To</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', borderRadius: '8px', padding: '6px 12px', border: '1px solid #ccc' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setCurrentPage(1); }}
              style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', flex: 1 }}/>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button onClick={() => { setWasteTypeFilter('All'); setCompartmentFilter('All'); setDateFrom(''); setDateTo(''); setCurrentPage(1); }}
            style={{ padding: '8px 18px', background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>
            Reset
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3a1a', marginBottom: '16px' }}>
          Waste Collection Records
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f0' }}>
              {['Date & Time', 'Waste Type', 'Weight (kg)', 'Compartment ID'].map((h, i) => (
                <th key={i} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: '13px', fontWeight: '700', color: '#1a3a1a',
                  borderBottom: '2px solid #e0e0e0',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#999', fontSize: '13px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <div style={{ fontWeight: '700', color: '#ccc' }}>No Records Found</div>
                    <div>📡 Data will appear here once hardware is connected...</div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r, i) => (
                <tr key={i}
                  style={{ borderBottom: '1px solid #f0f0f0' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#333' }}>{r.datetime}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: getWasteTypeColor(r.wasteType) }}>{r.wasteType}</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#333' }}>{r.weight} kg</td>
                  <td style={{ padding: '12px 16px', fontSize: '13px', color: '#333' }}>{r.compartment}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <div style={{ fontSize: '12px', color: '#999' }}>
              Showing {(currentPage - 1) * recordsPerPage + 1} to {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of {filteredRecords.length} records
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ccc', background: currentPage === 1 ? '#f5f5f5' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '600', color: currentPage === 1 ? '#ccc' : '#333' }}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)}
                  style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${currentPage === page ? '#2d5a27' : '#ccc'}`, background: currentPage === page ? '#2d5a27' : '#fff', color: currentPage === page ? '#fff' : '#333', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                  {page}
                </button>
              ))}
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #ccc', background: currentPage === totalPages ? '#f5f5f5' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontSize: '12px', fontWeight: '600', color: currentPage === totalPages ? '#ccc' : '#333' }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report Information */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1a3a1a', marginBottom: '16px' }}>
          Report Information
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { label: 'Report Period', value: filteredRecords.length > 0 ? `${filteredRecords[0].datetime} to ${filteredRecords[filteredRecords.length - 1].datetime}` : dateFrom && dateTo ? `${dateFrom} to ${dateTo}` : 'No data yet' },
{ label: 'Total Entries', value: filteredRecords.length > 0 ? `${filteredRecords.length} Records` : '0 Records' },
{ label: 'Generated on', value: new Date().toLocaleString() },
{ label: 'Report ID', value: filteredRecords.length > 0 ? reportId : 'N/A' },
          ].map((info, i) => (
            <div key={i}>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>{info.label}</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a3a1a' }}>{info.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
        <button onClick={handleExportCSV}
          style={{ padding: '10px 24px', background: '#fff', color: '#2d5a27', border: '2px solid #2d5a27', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export CSV
        </button>
        <button onClick={handlePrint}
          style={{ padding: '10px 24px', background: '#fff', color: '#2d5a27', border: '2px solid #2d5a27', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print
        </button>
        <button
          style={{ padding: '10px 24px', background: '#2d5a27', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Generate Report
        </button>
      </div>

    </div>
  );
}

export default Report;