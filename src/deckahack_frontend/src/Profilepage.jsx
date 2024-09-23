import React from 'react';
import { FaUser, FaShieldAlt, FaWallet, FaLock, FaDollarSign, FaGlobe, FaQuestionCircle, FaHome, FaBriefcase, FaChartBar, FaUserCircle, FaChevronRight } from 'react-icons/fa';

export default function Component() {
  const profileItems = [
    { icon: <FaUser size={18} />, title: 'Account Profile', subtitle: 'Your account profile' },
    { icon: <FaShieldAlt size={18} />, title: 'Account Verification', subtitle: 'Not Verified', alert: true },
    { icon: <FaWallet size={18} />, title: 'Wallet', subtitle: 'Your crypto wallet' },
    { icon: <FaLock size={18} />, title: 'Security', subtitle: 'Accounts security' },
    { icon: <FaDollarSign size={18} />, title: 'Default Currency', subtitle: 'Choose your currency', extra: 'USD' },
    { icon: <FaGlobe size={18} />, title: 'Language', subtitle: 'Choose Language', extra: 'ENG' },
    { icon: <FaQuestionCircle size={18} />, title: 'Help & Support', subtitle: 'Get support' },
  ];

  const navItems = [
    { icon: <FaHome size={20} />, label: 'Home' },
    { icon: <FaBriefcase size={20} />, label: 'Portfolio' },
    { icon: 'add', label: '' },
    { icon: <FaChartBar size={20} />, label: 'Markets' },
    { icon: <FaUserCircle size={20} />, label: 'Profile' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ flexGrow: 1, backgroundColor: 'white', borderRadius: '8px', margin: '16px', padding: '16px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <header style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Profile</h1>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/placeholder.svg?height=64&width=64" alt="John Doe" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'semibold' }}>John Doe</h2>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>@johndoe</p>
            </div>
            <span style={{ backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '9999px', fontSize: '12px' }}>Verified</span>
          </div>
          
          <div style={{ backgroundColor: '#1f2937', color: 'white', padding: '12px', borderRadius: '6px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px' }}>Invite your friends. Earn Crypto Together!</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {profileItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon}
                  <div>
                    <p style={{ fontWeight: '500' }}>{item.title}</p>
                    <p style={{ fontSize: '12px', color: item.alert ? '#ef4444' : '#6b7280' }}>{item.subtitle}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.extra && <span style={{ fontSize: '14px', color: '#6b7280' }}>{item.extra}</span>}
                  <FaChevronRight size={18} style={{ color: '#9ca3af' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
          <button style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Out</button>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Version 1.0</p>
        </footer>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderTop: '1px solid #e5e7eb' }}>
        {navItems.map((item, index) => (
          <button key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
            {item.icon === 'add' ? (
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                {'+'}
              </div>
            ) : (
              <>{item.icon}</>
            )}
            <span style={{ fontSize: '12px', marginTop: '4px' }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}