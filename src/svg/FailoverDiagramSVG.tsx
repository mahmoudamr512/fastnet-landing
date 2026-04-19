interface Props {
  mode: 'failover' | 'primary';
  primaryActive: boolean;
  fastnetActive: boolean;
  simulateOutage: boolean;
  switchMs: number;
}

export const FailoverDiagramSVG = ({
  mode,
  primaryActive,
  fastnetActive,
  simulateOutage,
  switchMs,
}: Props) => (
  <svg viewBox="0 0 500 340" className="w-full h-auto block">
    <defs>
      <linearGradient id="flowFiber" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(244,241,236,0)" />
        <stop offset="50%" stopColor="#F4F1EC" />
        <stop offset="100%" stopColor="rgba(244,241,236,0)" />
      </linearGradient>
      <linearGradient id="flow5g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(205,235,90,0)" />
        <stop offset="50%" stopColor="oklch(0.86 0.17 118)" />
        <stop offset="100%" stopColor="rgba(205,235,90,0)" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {mode === 'failover' && (
      <g opacity={primaryActive ? 1 : 0.35}>
        <rect
          x="20" y="56" width="130" height="64" rx="10"
          fill="rgba(255,255,255,0.03)"
          stroke={primaryActive ? 'rgba(244,241,236,0.35)' : 'rgba(244,241,236,0.15)'}
          strokeWidth="1"
        />
        <g transform="translate(34, 76)">
          <rect x="0" y="0" width="18" height="14" rx="2" fill="none"
            stroke={primaryActive ? '#F4F1EC' : '#5A606C'} strokeWidth="1" />
          <line x1="18" y1="7" x2="26" y2="7" stroke={primaryActive ? '#F4F1EC' : '#5A606C'} strokeWidth="1.2" />
          <circle cx="28" cy="7" r="2" fill={primaryActive ? '#F4F1EC' : '#5A606C'} />
        </g>
        <text x="70" y="82" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="1.5"
          fill={primaryActive ? '#F4F1EC' : '#8E939D'}>FIBER · ISP</text>
        <text x="70" y="98" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1"
          fill={primaryActive ? 'oklch(0.76 0.16 155)' : 'oklch(0.78 0.16 80)'}>
          {primaryActive ? '● ONLINE' : '● OFFLINE'}
        </text>
        <text x="70" y="110" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#5A606C">
          {primaryActive ? '12 ms · 940 Mbps' : 'last seen 00:04s'}
        </text>
        <path d="M 150 88 L 290 88 Q 310 88 310 108 L 310 130" fill="none"
          stroke={primaryActive ? 'rgba(244,241,236,0.3)' : 'rgba(244,241,236,0.1)'}
          strokeWidth="1.2" strokeDasharray={primaryActive ? '0' : '3 4'} />
        {primaryActive && [0, 0.5].map((d) => (
          <circle key={d} r="2.5" fill="#F4F1EC" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${d}s`}
              path="M 150 88 L 290 88 Q 310 88 310 108 L 310 130" />
          </circle>
        ))}
      </g>
    )}

    <g opacity={fastnetActive ? 1 : 0.4}>
      <rect
        x="20" y={mode === 'failover' ? 200 : 138} width="130" height="64" rx="10"
        fill={fastnetActive ? 'rgba(205,235,90,0.08)' : 'rgba(255,255,255,0.03)'}
        stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : 'rgba(244,241,236,0.15)'}
        strokeWidth="1"
      />
      <g transform={`translate(34, ${mode === 'failover' ? 215 : 153})`}>
        <line x1="10" y1="0" x2="10" y2="26" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1.2" />
        <line x1="4"  y1="10" x2="16" y2="10" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1" />
        <line x1="0"  y1="0"  x2="10" y2="14" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1" />
        <line x1="20" y1="0"  x2="10" y2="14" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1" />
        {fastnetActive && [6, 10, 14].map((r, i) => (
          <circle key={i} cx="10" cy="-2" r={r} fill="none"
            stroke="oklch(0.86 0.17 118)" strokeWidth="0.8" opacity={0.8 - i * 0.2}>
            <animate attributeName="r" from={r - 4} to={r} dur="1.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
            <animate attributeName="opacity" from="0.8" to="0" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </circle>
        ))}
      </g>
      <text x="70" y={mode === 'failover' ? 224 : 162} fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="1.5"
        fill={fastnetActive ? '#F4F1EC' : '#8E939D'}>FASTNET · 5G</text>
      <text x="70" y={mode === 'failover' ? 240 : 178} fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1"
        fill={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'}>
        ● {fastnetActive ? (mode === 'primary' ? 'PRIMARY' : 'CARRYING') : 'STANDBY'}
      </text>
      <text x="70" y={mode === 'failover' ? 252 : 190} fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#5A606C">
        {fastnetActive ? 'n41 · n77 · -68dBm' : 'armed · 0% traffic'}
      </text>
      <path
        d={`M 150 ${mode === 'failover' ? 232 : 170} L 290 ${mode === 'failover' ? 232 : 170} Q 310 ${mode === 'failover' ? 232 : 170} 310 ${mode === 'failover' ? 212 : 190} L 310 ${mode === 'failover' ? 190 : 170}`}
        fill="none"
        stroke={fastnetActive ? 'oklch(0.86 0.17 118 / 0.6)' : 'rgba(205,235,90,0.15)'}
        strokeWidth="1.2"
        strokeDasharray={fastnetActive ? '0' : '3 4'}
      />
      {fastnetActive && [0, 0.5].map((d) => (
        <circle key={d} r="2.5" fill="oklch(0.86 0.17 118)" filter="url(#glow)">
          <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${d}s`}
            path={`M 150 ${mode === 'failover' ? 232 : 170} L 290 ${mode === 'failover' ? 232 : 170} Q 310 ${mode === 'failover' ? 232 : 170} 310 ${mode === 'failover' ? 212 : 190} L 310 ${mode === 'failover' ? 190 : 170}`} />
        </circle>
      ))}
    </g>

    <g>
      <ellipse cx="310" cy="170" rx="44" ry="28" fill="oklch(0.86 0.17 118 / 0.12)" filter="url(#glow)" />
      <rect x="270" y="140" width="80" height="72" rx="10" fill="#1C1F25" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <rect x="278" y="148" width="64" height="18" rx="2" fill="#050607" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={282 + i * 4} y={152 + (i % 2) * 2} width="2" height={10 - (i % 2) * 2}
          fill="oklch(0.86 0.17 118)" opacity={0.5 + i * 0.1} />
      ))}
      <text x="310" y="162" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" letterSpacing="1" fill="#F4F1EC">NR</text>
      <circle cx="284" cy="180" r="2.2" fill={primaryActive && mode === 'failover' ? '#F4F1EC' : '#2A2E36'} />
      <circle cx="294" cy="180" r="2.2" fill={fastnetActive ? 'oklch(0.86 0.17 118)' : '#2A2E36'} />
      <circle cx="304" cy="180" r="2.2" fill="oklch(0.76 0.16 155)" />
      <circle cx="314" cy="180" r="2.2" fill="#2A2E36" />
      <text x="310" y="199" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="2" fill="#F4F1EC" fontWeight="500">BEACON · G2</text>
      <text x="310" y="230" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1"
        fill={simulateOutage && mode === 'failover' ? 'oklch(0.86 0.17 118)' : '#8E939D'}>
        {simulateOutage && mode === 'failover' ? `↻ switched in ${switchMs}ms` : 'all paths healthy'}
      </text>
    </g>

    <g>
      <path d="M 350 170 L 430 170" stroke="rgba(244,241,236,0.5)" strokeWidth="1.2" />
      <g transform="translate(430, 132)">
        <rect x="0" y="24" width="48" height="40" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(244,241,236,0.4)" strokeWidth="1" />
        <path d="M -4 26 L 24 4 L 52 26" fill="none" stroke="rgba(244,241,236,0.4)" strokeWidth="1" strokeLinejoin="round" />
        <rect x="20" y="44" width="8" height="20" fill="rgba(244,241,236,0.15)" />
        <rect x="6"  y="36" width="8" height="8" fill="rgba(244,241,236,0.1)" />
        <rect x="34" y="36" width="8" height="8" fill="rgba(244,241,236,0.1)" />
      </g>
      <text x="454" y="210" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="2" fill="#8E939D">CLIENT · LAN</text>
      <text x="454" y="222" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#5A606C">42 devices</text>
    </g>

    <g transform="translate(0, 290)">
      <line x1="20" y1="0" x2="480" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="20" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">LATENCY</text>
      <text x="20" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">
        {simulateOutage && mode === 'failover' ? '22 ms' : '14 ms'}
      </text>
      <text x="140" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">THROUGHPUT</text>
      <text x="140" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">
        {simulateOutage && mode === 'failover' ? '742 Mbps' : '940 Mbps'}
      </text>
      <text x="280" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">PACKETS LOST</text>
      <text x="280" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">0.00%</text>
      <text x="400" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">UPTIME</text>
      <text x="400" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="oklch(0.76 0.16 155)">99.997%</text>
    </g>
  </svg>
);
