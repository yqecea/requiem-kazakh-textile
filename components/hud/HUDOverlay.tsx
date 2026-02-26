import { CyberFrame } from './CyberFrame';

export const HUDOverlay = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '2rem',
        boxSizing: 'border-box',
        color: '#00ffcc',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        textShadow: '0 0 5px rgba(0, 255, 204, 0.5)',
      }}
    >
      <CyberFrame />
      
      {/* Top HUD Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div>
            SYS.STATUS: <span style={{ color: '#00ff00', animation: 'pulse 2s infinite' }}>ONLINE</span>
          </div>
          <div>MEM.ALLOC: 45.2%</div>
          <div>NET.UPLINK: ACTIVE</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'right' }}>
          <div>[ TGT.LOCK ]</div>
          <div>SCN.RATE: 120Hz</div>
          <div>MODE: DIAGNOSTIC</div>
        </div>
      </div>

      {/* Bottom HUD Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div>LOC: SEC-7G</div>
          <div>LAT: 43.2220 N</div>
          <div>LNG: 76.8512 E</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'right' }}>
          <div>UPLINK: SECURE</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'red',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'blink 1s infinite'
              }}
            />
            REC
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { text-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
          50% { text-shadow: 0 0 15px rgba(0, 255, 0, 1); }
        }
      `}</style>
    </div>
  );
};
