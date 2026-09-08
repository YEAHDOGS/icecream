<script>
  import TabNav from "./components/TabNav.svelte";
  import MarketPanel from "./components/MarketPanel.svelte";
  import PlayersPanel from "./components/PlayersPanel.svelte";
  import FlavorsPanel from "./components/FlavorsPanel.svelte";
  import PitchPanel from "./components/PitchPanel.svelte";
  import CampaignPanel from "./components/CampaignPanel.svelte";
  import ApplicantsPanel from "./components/ApplicantsPanel.svelte";
  import logo from "./assets/logo.svg";
  import { SOURCE_COUNT } from "./data/index.js";

  const TABS = [
    { id: "market", label: "Market", component: MarketPanel },
    { id: "players", label: "Players", component: PlayersPanel },
    { id: "flavors", label: "Flavors", component: FlavorsPanel },
    { id: "campaign", label: "The Campaign", short: "Campaign", component: CampaignPanel },
    { id: "field", label: "The Field", short: "Field", component: ApplicantsPanel },
    { id: "pitch", label: "The Pitch", short: "Pitch", component: PitchPanel },
  ];
  const SWIPE_MIN_PX = 60;
  const TITLE = "The Scoop";
  const SUBTITLE = "Global ice cream market, fully cited";

  const fromHash = () => location.hash.replace("#", "");
  let active = $state(
    TABS.some((t) => t.id === fromHash()) ? fromHash() : TABS[0].id,
  );
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
  class="app h-dvh w-full grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 xl:px-8 2xl:px-12"
>
  <header
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 py-2 md:py-3 xl:py-4 border-b border-line min-w-0"
  >
    <div class="flex items-center gap-2.5 min-w-0">
      <img src={logo} alt="" class="w-7 h-7 sm:w-8 sm:h-8 xl:w-9 xl:h-9" />
      <div class="min-w-0 leading-tight">
        <h1
          class="m-0 text-base sm:text-lg xl:text-xl 2xl:text-2xl font-semibold tracking-tight truncate"
        >
          {TITLE}
        </h1>
        <p class="m-0 hidden md:block text-[0.65rem] xl:text-xs text-muted">
          {SUBTITLE}
        </p>
      </div>
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
