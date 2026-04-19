export const BeaconG2 = () => (
  <svg viewBox="0 0 460 440" className="w-[56%] h-auto relative z-[2]"
    style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.7))' }}>
    <defs>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3A3F49" />
        <stop offset="45%" stopColor="#22252C" />
        <stop offset="100%" stopColor="#0E1014" />
      </linearGradient>
      <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A5058" />
        <stop offset="100%" stopColor="#2A2E36" />
      </linearGradient>
      <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1C1F25" />
        <stop offset="100%" stopColor="#0A0B0D" />
      </linearGradient>
      <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
        <stop offset="15%" stopColor="rgba(255,255,255,0.04)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <radialGradient id="ledGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="oklch(0.86 0.17 118)" stopOpacity="1" />
        <stop offset="40%" stopColor="oklch(0.86 0.17 118)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="oklch(0.86 0.17 118)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="ledGreen" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="oklch(0.76 0.16 155)" stopOpacity="1" />
        <stop offset="40%" stopColor="oklch(0.76 0.16 155)" stopOpacity="0.4" />
        <stop offset="100%" stopColor="oklch(0.76 0.16 155)" stopOpacity="0" />
      </radialGradient>
      <pattern id="micro" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="3" height="3" fill="transparent" />
        <circle cx="1.5" cy="1.5" r="0.35" fill="rgba(255,255,255,0.06)" />
      </pattern>
    </defs>
    <ellipse cx="230" cy="420" rx="180" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
    <g>
      <rect x="120" y="28" width="4" height="60" rx="2" fill="#2A2E36" />
      <rect x="336" y="28" width="4" height="60" rx="2" fill="#2A2E36" />
      <circle cx="122" cy="26" r="6" fill="#14161A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <circle cx="338" cy="26" r="6" fill="#14161A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <circle cx="122" cy="26" r="2" fill="oklch(0.86 0.17 118)" />
      <circle cx="338" cy="26" r="2" fill="oklch(0.86 0.17 118)" />
    </g>
    <g>
      <path d="M 70 100 L 390 100 L 400 110 L 400 390 L 60 390 L 60 110 Z" fill="url(#sideGrad)" />
      <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#bodyGrad)" />
      <rect x="60" y="100" width="340" height="14" rx="8" fill="url(#topGrad)" />
      <rect x="60" y="100" width="340" height="200" rx="18" fill="url(#sheen)" />
      <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#micro)" opacity="0.6" />
    </g>
    <g>
      <rect x="82" y="132" width="296" height="56" rx="6" fill="#050607" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <g opacity="0.95">
        <rect x="96"  y="158" width="3" height="20" fill="oklch(0.86 0.17 118)" opacity="0.9" />
        <rect x="102" y="152" width="3" height="26" fill="oklch(0.86 0.17 118)" opacity="0.9" />
        <rect x="108" y="160" width="3" height="18" fill="oklch(0.86 0.17 118)" opacity="0.7" />
        <rect x="114" y="146" width="3" height="32" fill="oklch(0.86 0.17 118)" />
        <rect x="120" y="155" width="3" height="23" fill="oklch(0.86 0.17 118)" opacity="0.8" />
        <rect x="126" y="150" width="3" height="28" fill="oklch(0.86 0.17 118)" opacity="0.9" />
        <rect x="132" y="162" width="3" height="16" fill="oklch(0.86 0.17 118)" opacity="0.6" />
        <rect x="138" y="156" width="3" height="22" fill="oklch(0.86 0.17 118)" opacity="0.8" />
      </g>
      <text x="162" y="160" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="oklch(0.86 0.17 118)">NR n77</text>
      <text x="162" y="172" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#8E939D">-68 dBm</text>
      <line x1="248" y1="140" x2="248" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <text x="262" y="152" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#8E939D">DOWN</text>
      <text x="262" y="164" fontFamily="ui-monospace,monospace" fontSize="10" fill="#F4F1EC" fontWeight="500">942</text>
      <text x="290" y="164" fontFamily="ui-monospace,monospace" fontSize="7" fill="#8E939D">Mbps</text>
      <text x="262" y="176" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5A606C">↑ 312 Mbps</text>
    </g>
    <g>
      <text x="82" y="216" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="2" fill="#5A606C">STATUS</text>
      <circle cx="88" cy="230" r="7" fill="url(#ledGlow)" />
      <circle cx="88" cy="230" r="2.5" fill="oklch(0.86 0.17 118)" />
      <circle cx="108" cy="230" r="7" fill="url(#ledGreen)" />
      <circle cx="108" cy="230" r="2.5" fill="oklch(0.76 0.16 155)" />
      <circle cx="128" cy="230" r="2.5" fill="#3A3F49" />
      <circle cx="148" cy="230" r="2.5" fill="#3A3F49" />
      <text x="170" y="233" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#8E939D">LINK · CARRIER A · B · C</text>
    </g>
    <g>
      <rect x="82" y="250" width="296" height="64" rx="4" fill="#050607" opacity="0.6" />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1="88" y1={258 + i * 4} x2="372" y2={258 + i * 4} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
    </g>
    <g>
      <rect x="82" y="332" width="296" height="36" rx="4" fill="#050607" opacity="0.4" />
      <text x="96" y="356" fontFamily="ui-monospace,monospace" fontSize="10" letterSpacing="3" fill="#F4F1EC" fontWeight="500">FASTNET</text>
      <line x1="166" y1="348" x2="166" y2="360" stroke="#3A3F49" strokeWidth="1" />
      <text x="178" y="356" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="2" fill="#8E939D">BEACON · G2</text>
      <text x="300" y="356" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1" fill="#5A606C">BEA-2041-78</text>
    </g>
    <g opacity="0.25" transform="translate(0, 792) scale(1, -1)">
      <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#bodyGrad)" />
    </g>
  </svg>
);
