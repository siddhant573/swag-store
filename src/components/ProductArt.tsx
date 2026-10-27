// Flat product illustrations, drawn in SVG so the store has no image files or external requests.
// view: "front" (default), "back" or "detail" for the product gallery.

type View = "front" | "back" | "detail";

const P: Record<string, { bg: string; main: string; accent: string }> = {
  "octocat-tee": { bg: "#f1ecff", main: "#2b2350", accent: "#c3a6ff" },
  "sticker-pack": { bg: "#fff0f5", main: "#e0457b", accent: "#ffd166" },
  "mona-hoodie": { bg: "#e9f1ff", main: "#3d5a99", accent: "#ffffff" },
  "universe-mug": { bg: "#fff6e5", main: "#ffffff", accent: "#7c4dff" },
  "copilot-cap": { bg: "#e8f7ee", main: "#1f6f43", accent: "#ffffff" },
  "pixel-socks": { bg: "#fdecec", main: "#ffffff", accent: "#d83a3a" },
  "dependabot-plush": { bg: "#e7f3ff", main: "#2f81f7", accent: "#ffffff" },
  "laptop-sleeve": { bg: "#f1f2f4", main: "#4a505a", accent: "#a6aeba" },
  "holo-stickers": { bg: "#f3efff", main: "#8a63d2", accent: "#56d4c7" },
};

function Mark({ x, y, s = 1, color }: { x: number; y: number; s?: number; color: string }) {
  // The store's own "U26" mark: a ring with a star.
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="16" fill="none" stroke={color} strokeWidth="3.5" />
      <path d="M0 -8 L2.4 -2.4 L8 -2 L3.6 1.6 L5 7.5 L0 4.2 L-5 7.5 L-3.6 1.6 L-8 -2 L-2.4 -2.4 Z" fill={color} />
    </g>
  );
}

function Shape({ id, view, c }: { id: string; view: View; c: { main: string; accent: string } }) {
  switch (id) {
    case "octocat-tee":
      return (
        <g>
          <path d="M70 52 L100 40 Q120 52 140 40 L170 52 L190 86 L166 98 L160 88 L160 170 L80 170 L80 88 L74 98 L50 86 Z" fill={c.main} />
          <path d="M100 40 Q120 56 140 40" fill="none" stroke="#00000033" strokeWidth="3" />
          {view === "front" ? <Mark x={120} y={100} s={1.2} color={c.accent} /> : null}
          {view === "back" ? <text x="120" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill={c.accent} fontFamily="system-ui">UNIVERSE 26</text> : null}
        </g>
      );
    case "mona-hoodie":
      return (
        <g>
          <path d="M84 50 Q120 18 156 50 L188 70 L200 150 L178 156 L170 100 L170 176 L70 176 L70 100 L62 156 L40 150 L52 70 Z" fill={c.main} />
          <path d="M96 52 Q120 34 144 52 Q132 76 120 78 Q108 76 96 52 Z" fill="#00000026" />
          <rect x="92" y="130" width="56" height="26" rx="6" fill="#00000022" />
          {view !== "back" ? <Mark x={120} y={104} s={0.9} color={c.accent} /> : null}
          {view === "front" ? <g stroke={c.accent} strokeWidth="2"><line x1="114" y1="60" x2="112" y2="88" /><line x1="126" y1="60" x2="128" y2="88" /></g> : null}
        </g>
      );
    case "universe-mug":
      return (
        <g>
          <path d="M150 84 Q188 84 186 112 Q184 140 150 138" fill="none" stroke="#d9d4ea" strokeWidth="12" />
          <rect x="66" y="64" width="90" height="104" rx="10" fill={c.main} stroke="#d9d4ea" strokeWidth="3" />
          <ellipse cx="111" cy="66" rx="45" ry="7" fill="#efeaf9" />
          {view !== "back" ? <Mark x={111} y={116} s={1.1} color={c.accent} /> : <text x="111" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill={c.accent} fontFamily="system-ui">SHIP IT</text>}
        </g>
      );
    case "copilot-cap":
      return (
        <g>
          <path d="M60 128 Q62 62 120 58 Q178 62 180 128 Z" fill={c.main} />
          <path d="M150 124 Q200 120 210 140 Q170 146 120 140 Z" fill="#164f30" />
          <circle cx="120" cy="60" r="5" fill="#164f30" />
          {view !== "back" ? <Mark x={110} y={100} s={0.9} color={c.accent} /> : <rect x="100" y="110" width="40" height="10" rx="5" fill="#164f30" />}
        </g>
      );
    case "pixel-socks":
      return (
        <g>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i * 56} ${i * 8})`}>
              <path d="M70 40 L110 40 L110 128 Q110 160 80 164 L54 164 Q40 150 56 140 L70 132 Z" fill={c.main} stroke="#e7d2d2" strokeWidth="2" />
              <rect x="70" y="40" width="40" height="14" fill={i ? "#2b2350" : c.accent} />
              {view !== "back" ? <g fill={i ? "#2b2350" : c.accent}><rect x="80" y="76" width="8" height="8" /><rect x="92" y="76" width="8" height="8" /><rect x="86" y="88" width="8" height="8" /></g> : null}
            </g>
          ))}
        </g>
      );
    case "dependabot-plush":
      return (
        <g>
          <line x1="120" y1="40" x2="120" y2="58" stroke={c.main} strokeWidth="5" />
          <circle cx="120" cy="38" r="7" fill="#ffb000" />
          <rect x="72" y="58" width="96" height="76" rx="30" fill={c.main} />
          <rect x="86" y="132" width="68" height="40" rx="16" fill="#2468c9" />
          {view !== "back" ? (
            <g>
              <rect x="86" y="80" width="68" height="30" rx="15" fill="#0c2d5e" />
              <circle cx="104" cy="95" r="6" fill="#7ee0ff" />
              <circle cx="136" cy="95" r="6" fill="#7ee0ff" />
            </g>
          ) : null}
        </g>
      );
    case "laptop-sleeve":
      return (
        <g>
          <rect x="44" y="60" width="152" height="104" rx="14" fill={c.main} />
          <rect x="44" y="60" width="152" height="12" rx="6" fill="#3a3f47" />
          {view !== "back" ? <rect x="120" y="92" width="58" height="52" rx="8" fill="#ffffff22" stroke={c.accent} strokeDasharray="4 3" /> : null}
          {view !== "back" ? <Mark x={149} y={118} s={0.8} color={c.accent} /> : null}
        </g>
      );
    case "sticker-pack":
    case "holo-stickers": {
      const holo = id === "holo-stickers";
      return (
        <g>
          <defs>
            <linearGradient id={`holo-${view}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff9bd2" /><stop offset=".5" stopColor="#9be7ff" /><stop offset="1" stopColor="#d2b4ff" />
            </linearGradient>
          </defs>
          <rect x="58" y="40" width="124" height="136" rx="10" fill="#ffffff" stroke="#e5dfef" strokeWidth="2" />
          <circle cx="94" cy="78" r="22" fill={holo ? `url(#holo-${view})` : c.main} />
          <path d="M148 56 L168 68 L168 92 L148 104 L128 92 L128 68 Z" fill={holo ? `url(#holo-${view})` : c.accent} />
          <rect x="76" y="114" width="40" height="40" rx="10" fill={holo ? `url(#holo-${view})` : "#2b2350"} />
          <circle cx="148" cy="134" r="18" fill={holo ? `url(#holo-${view})` : "#7c4dff"} />
          {view !== "back" ? <Mark x={94} y={78} s={0.75} color="#ffffff" /> : null}
        </g>
      );
    }
    default:
      return <rect x="70" y="60" width="100" height="100" rx="12" fill={c.main} />;
  }
}

export function ProductArt({ id, view = "front", className }: { id: string; view?: View; className?: string }) {
  const c = P[id] ?? { bg: "#f2f2f2", main: "#888", accent: "#fff" };
  return (
    <svg viewBox="0 0 240 210" className={className} role="img" aria-hidden="true" style={{ background: c.bg }}>
      {view === "detail" ? (
        <g transform="translate(-120 -100) scale(2)">
          <Shape id={id} view="front" c={c} />
        </g>
      ) : (
        <Shape id={id} view={view} c={c} />
      )}
    </svg>
  );
}
