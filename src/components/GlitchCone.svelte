<!-- Fallback art for applicant cards whose platform embed fails to render:
     a glitch-style ice cream cone. Pure inline SVG — no network, no binary
     asset, always available when the third-party scripts blank out. -->
<svg viewBox="0 0 120 140" role="img" aria-label="Ice cream cone" class="glitch-cone">
  <defs>
    <clipPath id="gc-band-top"><rect x="0" y="16" width="120" height="11" /></clipPath>
    <clipPath id="gc-band-mid"><rect x="0" y="50" width="120" height="9" /></clipPath>
    <pattern id="gc-scan" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="1.1" y="0" fill="rgba(0, 0, 0, 0.4)" />
    </pattern>
  </defs>

  <!-- cone -->
  <polygon points="38,78 82,78 60,132" fill="#c98f4e" />
  <g stroke="#8a5a24" stroke-width="1.4" opacity="0.85">
    <line x1="45" y1="90" x2="70" y2="124" />
    <line x1="75" y1="90" x2="50" y2="124" />
    <line x1="43" y1="101" x2="61" y2="128" />
    <line x1="77" y1="101" x2="59" y2="128" />
  </g>

  <!-- scoops -->
  <g>
    <circle cx="60" cy="52" r="24" fill="#f2b234" />
    <circle cx="44" cy="33" r="15" fill="#f7e8c9" />
    <circle cx="76" cy="33" r="15" fill="#e88ca0" />
    <circle cx="53" cy="45" r="4" fill="#fff" opacity="0.35" />
  </g>

  <!-- glitch slices: RGB-split copies of the scoops, clipped to thin bands -->
  <g class="gc-flick-a">
    <g clip-path="url(#gc-band-top)" opacity="0.8">
      <g transform="translate(-5,0)" fill="#22d3ee" opacity="0.6">
        <circle cx="60" cy="52" r="24" /><circle cx="44" cy="33" r="15" /><circle cx="76" cy="33" r="15" />
      </g>
      <g transform="translate(5,0)" fill="#f471b5" opacity="0.6">
        <circle cx="60" cy="52" r="24" /><circle cx="44" cy="33" r="15" /><circle cx="76" cy="33" r="15" />
      </g>
    </g>
  </g>
  <g class="gc-flick-b">
    <g clip-path="url(#gc-band-mid)" opacity="0.8">
      <g transform="translate(4,0)" fill="#22d3ee" opacity="0.6">
        <circle cx="60" cy="52" r="24" /><circle cx="44" cy="33" r="15" /><circle cx="76" cy="33" r="15" />
      </g>
      <g transform="translate(-4,0)" fill="#f471b5" opacity="0.6">
        <circle cx="60" cy="52" r="24" /><circle cx="44" cy="33" r="15" /><circle cx="76" cy="33" r="15" />
      </g>
    </g>
  </g>

  <!-- scanlines -->
  <rect x="0" y="0" width="120" height="140" fill="url(#gc-scan)" opacity="0.45" />
</svg>

<style>
  .glitch-cone {
    width: 76px;
    height: auto;
    display: block;
  }

  .gc-flick-a {
    animation: gc-jitter-a 2.8s steps(2, jump-none) infinite;
  }

  .gc-flick-b {
    animation: gc-jitter-b 3.7s steps(2, jump-none) infinite;
  }

  @keyframes gc-jitter-a {
    0%, 88% { transform: translateX(0); opacity: 0.8; }
    92% { transform: translateX(-3px); opacity: 1; }
    96% { transform: translateX(2px); opacity: 0.4; }
    100% { transform: translateX(0); opacity: 0.8; }
  }

  @keyframes gc-jitter-b {
    0%, 80% { transform: translateX(0); opacity: 0.8; }
    84% { transform: translateX(3px); opacity: 1; }
    90% { transform: translateX(-2px); opacity: 0.5; }
    100% { transform: translateX(0); opacity: 0.8; }
  }

  @media (prefers-reduced-motion: reduce) {
    .gc-flick-a,
    .gc-flick-b {
      animation: none;
    }
  }
</style>
