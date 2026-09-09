<script>
  import TabNav from "./components/TabNav.svelte";
  import MarketPanel from "./components/MarketPanel.svelte";
  import PitchPanel from "./components/PitchPanel.svelte";
  import JobPanel from "./components/JobPanel.svelte";
  import ApplicantsPanel from "./components/ApplicantsPanel.svelte";
  import logo from "./assets/logo.svg";
  import brandoIcon from "./assets/brand/captain-brando.png";
  import dogsIcon from "./assets/brand/dogs.svg";
  import { SOURCE_COUNT } from "./data/index.js";
  import { BUILD_TAG } from "./data/imagery.js";

  const TABS = [
    { id: "job", label: "The Job", short: "Job", component: JobPanel },
    { id: "market", label: "The Market", short: "Market", component: MarketPanel },
    { id: "field", label: "The Field", short: "Field", component: ApplicantsPanel },
    { id: "pitch", label: "The Pitch", short: "Pitch", component: PitchPanel },
  ];

  // Retired tab ids keep working as deep links after the 6 → 4 tab merge.
  const TAB_ALIASES = { campaign: "job", flavors: "job", players: "market" };
  const SWIPE_MIN_PX = 60;
  const TITLE = "The Scoop";
  const SUBTITLE = "Global ice cream market, fully cited";

  const fromHash = () => {
    const raw = location.hash.replace("#", "");
    if (TABS.some((t) => t.id === raw)) return raw;
    if (TAB_ALIASES[raw]) return TAB_ALIASES[raw];
    return TABS[0].id;
  };
  let active = $state(fromHash());
  const Panel = $derived(TABS.find((t) => t.id === active)?.component);

  /** @param {string} id */
  function select(id) {
    active = id;
    history.replaceState(null, "", `#${id}`);
  }

  // Horizontal swipe flips tabs on touch devices; vertical drags scroll as normal.
  let touchX = 0;
  let touchY = 0;
  function onTouchStart(e) {
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
  }
  function onTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const idx = TABS.findIndex((t) => t.id === active);
    const next = TABS[(idx + (dx < 0 ? 1 : TABS.length - 1)) % TABS.length];
    select(next.id);
  }
</script>

<svelte:window onhashchange={() => select(fromHash() || TABS[0].id)} />

<div
  class="app grain h-dvh w-full grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 xl:px-8 2xl:px-12"
  data-build={BUILD_TAG}
>
  <header
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 py-2 md:py-3 xl:py-4 border-b border-line min-w-0"
  >
    <div class="flex items-center gap-2.5 min-w-0">
      <img src={logo} alt="" class="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9" />
      <div class="min-w-0 leading-tight">
        <h1
          class="m-0 text-base sm:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-tight truncate gold-text"
        >
          {TITLE}
        </h1>
        <p class="m-0 hidden md:block text-[0.65rem] xl:text-xs text-muted">
          {SUBTITLE}
        </p>
      </div>
      <!-- the founder's own sites: permanent, visible on launch, every tab. -->
      <nav class="brand-links" aria-label="the founder's sites">
        <a
          href="https://captainbrando.com"
          target="_blank"
          rel="noopener noreferrer"
          title="the founder — the founder's music career"
        >
          <img src={brandoIcon} alt="the founder logo" />
          <span>the founder</span>
        </a>
        <a
          href="https://wearedogs.net"
          target="_blank"
          rel="noopener noreferrer"
          title="DOGS — the founder's tech company"
        >
          <img src={dogsIcon} alt="DOGS logo" />
          <span>DOGS</span>
        </a>
      </nav>
    </div>
    <div class="w-full sm:w-auto min-w-0"><TabNav tabs={TABS} {active} onSelect={select} /></div>
  </header>

  <main
    class="min-h-0 min-w-0 py-2 md:py-3 xl:py-4"
    ontouchstart={onTouchStart}
    ontouchend={onTouchEnd}
  >
    {#key active}
      <div class="panel h-full min-h-0">
        <Panel />
      </div>
    {/key}
  </main>

  <footer
    class="flex items-center justify-between gap-3 py-1.5 xl:py-2 border-t border-line text-[0.6rem] xl:text-[0.68rem] text-muted"
  >
    <span class="truncate"
      >{SOURCE_COUNT} cited sources · every figure links to its document</span
    >
    <span class="hidden sm:inline">← swipe or arrow keys →</span>
  </footer>
</div>

<style lang="scss">
  .app {
    background: var(--bg-app);
    color: var(--ink);
    position: relative;

    // Ambient gold ambience: a soft crown glow up top, faint warmth low.
    // pointer-events none, fades to transparent — never touches layout.
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background:
        radial-gradient(
          640px 230px at 50% -70px,
          rgba(var(--accent-rgb), 0.13),
          transparent 70%
        ),
        radial-gradient(
          900px 480px at 88% 112%,
          rgba(var(--accent-rgb), 0.05),
          transparent 70%
        );
    }
  }

  header {
    position: relative;

    // Gold hairline under the header — the one accent, drawn thin.
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(var(--accent-rgb), 0.55),
        transparent
      );
      pointer-events: none;
    }
  }

  .brand-links {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-left: auto;
    flex: 0 0 auto;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.28rem 0.6rem;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--ink-2);
      font-size: 0.64rem;
      font-weight: 600;
      text-decoration: none;
      white-space: nowrap;
      transition: border-color 0.2s ease, color 0.2s ease;

      &:hover {
        color: var(--ink);
        border-color: var(--accent);
      }

      img {
        width: 15px;
        height: 15px;
        border-radius: 4px;
        display: block;
      }
    }

    @media (max-width: 380px) {
      a span {
        display: none;
      }
      a {
        padding: 0.28rem 0.45rem;
      }
    }
  }

  .panel {
    animation: rise 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
</style>
