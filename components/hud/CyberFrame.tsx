export const CyberFrame = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <rect
          x="20"
          y="20"
          width="calc(100% - 40px)"
          height="calc(100% - 40px)"
          fill="none"
          stroke="#00ffcc"
          strokeWidth="1.5"
          strokeDasharray="5 15"
          opacity="0.4"
        />
        <path d="M 0 20 L 20 0" stroke="#00ffcc" strokeWidth="2" fill="none" />
        <path d="M calc(100% - 20px) 0 L 100% 20" stroke="#00ffcc" strokeWidth="2" fill="none" />
        <path d="M 100% calc(100% - 20px) L calc(100% - 20px) 100%" stroke="#00ffcc" strokeWidth="2" fill="none" />
        <path d="M 20 100% L 0 calc(100% - 20px)" stroke="#00ffcc" strokeWidth="2" fill="none" />
        
        <circle cx="20" cy="20" r="3" fill="#00ffcc" />
        <circle cx="calc(100% - 20px)" cy="20" r="3" fill="#00ffcc" />
        <circle cx="20" cy="calc(100% - 20px)" r="3" fill="#00ffcc" />
        <circle cx="calc(100% - 20px)" cy="calc(100% - 20px)" r="3" fill="#00ffcc" />
      </svg>
    </div>
  );
};
