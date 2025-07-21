import React from 'react';

const TestDashboard: React.FC = () => {
  return (
    <div>
      <h1>🏠 IoT Room Dashboard Test</h1>
      <p>Dashboard đang hoạt động!</p>
      <div style={{
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h2>Test Component</h2>
        <p>Nếu bạn thấy text này, React đang hoạt động bình thường.</p>
      </div>
    </div>
  );
};

export default TestDashboard;
