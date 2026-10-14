<script>
  import { onMount } from "svelte";

  // Autopilot snake. The AI plays; nobody touches anything.
  // Every pellet = a walrus explosion. Those are the rules.

  const COLS = 22;
  const ROWS = 22;
  const TICK_MS = 85;
  const WALRUS = "🦭"; // closest emoji to a walrus — he performs as one

  let canvas;
  let wrap;
  let ctx;
  let W = 0;
  let H = 0;
  let cell = 0;
  let ox = 0;
  let oy = 0;

  let snake = [];
  let food = null;
  let particles = [];
  let shakeUntil = 0;
  let flashUntil = 0;
  let deadUntil = 0;
  let raf = 0;
  let timer = 0;

  let pellets = $state(0);
  let walruses = $state(0);
  let length = $state(0);
  let status = $state("HUNTING");

  let accent = "#2e7cf6";
  let accentBright = "#5ea3ff";
  let ink = "#ecf3fc";
  let card = "#12161d";
  let line = "rgba(233,242,250,0.08)";

  const key = (x, y) => y * COLS + x;
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < COLS && y < ROWS;

  function bodySet(excludeTail = true) {
    const s = new Set();
    const n = excludeTail ? snake.length - 1 : snake.length;
    for (let i = 0; i < n; i++) s.add(key(snake[i].x, snake[i].y));
    return s;
  }

  // Breadth-first path from (sx,sy) to (tx,ty); blocked = Set of cell keys.
  // Returns the list of steps after the start cell, or null.
  function bfs(sx, sy, tx, ty, blocked) {
    if (sx === tx && sy === ty) return [];
    const prev = new Map();
    const q = [[sx, sy]];
    prev.set(key(sx, sy), null);
    while (q.length) {
      const [cx, cy] = q.shift();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, ny = cy + dy;
        if (!inBounds(nx, ny)) continue;
        const k = key(nx, ny);
        if (prev.has(k)) continue;
        if (blocked.has(k) && !(nx === tx && ny === ty)) continue;
        prev.set(k, [cx, cy]);
        if (nx === tx && ny === ty) {
          const path = [];
          let cur = [nx, ny];
          while (cur && !(cur[0] === sx && cur[1] === sy)) {
            path.unshift({ x: cur[0], y: cur[1] });
            cur = prev.get(key(cur[0], cur[1]));
          }
          return path;
        }
        q.push([nx, ny]);
      }
    }
    return null;
  }

  function floodArea(sx, sy, blocked) {
    const seen = new Set([key(sx, sy)]);
    const q = [[sx, sy]];
    while (q.length) {
      const [cx, cy] = q.shift();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, ny = cy + dy;
        if (!inBounds(nx, ny)) continue;
        const k = key(nx, ny);
        if (seen.has(k) || blocked.has(k)) continue;
        seen.add(k);
        q.push([nx, ny]);
      }
    }
    return seen.size;
  }

  // The brain: shortest path to the pellet, but only if the snake can still
  // reach its own tail after eating. Otherwise chase the tail. Otherwise
  // take the move with the most open space. Dying is a last resort.
  function nextMove() {
    const head = snake[0];
    const blocked = bodySet(true);

    if (food) {
      const path = bfs(head.x, head.y, food.x, food.y, blocked);
      if (path && path.length) {
        // Simulate eating, then demand a route back to the tail.
        const sim = [food, ...path.slice(0, -1).reverse(), ...snake].slice(0, snake.length + 1);
        const simBlocked = new Set(sim.slice(0, -1).map((c) => key(c.x, c.y)));
        const tail = sim[sim.length - 1];
        if (bfs(food.x, food.y, tail.x, tail.y, simBlocked)) return path[0];
      }
    }
    const tail = snake[snake.length - 1];
    const toTail = bfs(head.x, head.y, tail.x, tail.y, blocked);
    if (toTail && toTail.length) return toTail[0];

    let best = null, bestArea = -1;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = head.x + dx, ny = head.y + dy;
      if (!inBounds(nx, ny) || blocked.has(key(nx, ny))) continue;
      const area = floodArea(nx, ny, blocked);
      if (area > bestArea) { bestArea = area; best = { x: nx, y: ny }; }
    }
    return best;
  }

  function placeFood() {
    const taken = new Set(snake.map((c) => key(c.x, c.y)));
    const free = [];
    for (let y = 0; y < ROWS; y++)
      for (let x = 0; x < COLS; x++)
        if (!taken.has(key(x, y))) free.push({ x, y });
    food = free[Math.floor(Math.random() * free.length)] || null;
  }

  function reset() {
    const cx = Math.floor(COLS / 2), cy = Math.floor(ROWS / 2);
    snake = [
      { x: cx, y: cy },
      { x: cx - 1, y: cy },
      { x: cx - 2, y: cy },
    ];
    placeFood();
  }

  function explode(cx, cy) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = reduced ? 6 : 26;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 1.5 + Math.random() * 5.5;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        size: 20 + Math.random() * 52,
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
      });
    }
    walruses += n;
    shakeUntil = performance.now() + 320;
    flashUntil = performance.now() + 220;
  }

  function tick() {
    if (performance.now() < deadUntil) return;
    const move = nextMove();
    if (!move) {
      explode(snake[0].x, snake[0].y);
      deadUntil = performance.now() + 900;
      reset();
      status = "WRECKED — REBOOTING";
      return;
    }
    if (status !== "HUNTING") status = "HUNTING";
    snake.unshift(move);
    if (food && move.x === food.x && move.y === food.y) {
      pellets += 1;
      explode(move.x, move.y);
      placeFood();
    } else {
      snake.pop();
    }
    length = snake.length;
  }

  function draw(now) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);

    let sx = 0, sy = 0;
    if (now < shakeUntil) {
      sx = (Math.random() - 0.5) * 14;
      sy = (Math.random() - 0.5) * 14;
    }
    ctx.save();
    ctx.translate(sx, sy);

    // Board
    ctx.fillStyle = card;
    ctx.fillRect(ox, oy, cell * COLS, cell * ROWS);
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(ox + x * cell, oy); ctx.lineTo(ox + x * cell, oy + cell * ROWS); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(ox, oy + y * cell); ctx.lineTo(ox + cell * COLS, oy + y * cell); ctx.stroke();
    }

    // Pellet
    if (food) {
      const fx = ox + (food.x + 0.5) * cell, fy = oy + (food.y + 0.5) * cell;
      const pulse = 0.32 + 0.08 * Math.sin(now / 180);
      ctx.fillStyle = accentBright;
      ctx.beginPath(); ctx.arc(fx, fy, cell * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ink;
      ctx.beginPath(); ctx.arc(fx, fy, cell * 0.13, 0, Math.PI * 2); ctx.fill();
    }

    // Snake
    for (let i = snake.length - 1; i >= 0; i--) {
      const c = snake[i];
      ctx.fillStyle = i === 0 ? accentBright : accent;
      const pad = i === 0 ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(ox + c.x * cell + pad, oy + c.y * cell + pad, cell - pad * 2, cell - pad * 2, 5);
      ctx.fill();
    }

    // Eat flash
    if (now < flashUntil) {
      ctx.fillStyle = "rgba(94,163,255,0.16)";
      ctx.fillRect(0, 0, W, H);
    }

    // Walruses. So many walruses.
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    particles = particles.filter((p) => p.life > 0);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.16; p.rot += p.vr; p.life -= p.decay;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      ctx.translate(ox + (p.x + 0.5) * cell, oy + (p.y + 0.5) * cell);
      ctx.rotate(p.rot);
      ctx.font = `${p.size}px serif`;
      ctx.fillText(WALRUS, 0, 0);
      ctx.restore();
    }

    ctx.restore();
    raf = requestAnimationFrame(draw);
  }

  function resize() {
    if (!wrap || !canvas) return;
    const r = wrap.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(200, r.width);
    H = Math.max(200, r.height);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const board = Math.min(W, H);
    cell = board / COLS;
    ox = (W - cell * COLS) / 2;
    oy = (H - cell * ROWS) / 2;
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
    const cs = getComputedStyle(document.documentElement);
    accent = cs.getPropertyValue("--accent").trim() || accent;
    accentBright = cs.getPropertyValue("--accent-bright").trim() || accentBright;
    ink = cs.getPropertyValue("--ink").trim() || ink;
    card = cs.getPropertyValue("--bg-card").trim() || card;
    reset();
    length = snake.length;
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    timer = setInterval(tick, TICK_MS);
    raf = requestAnimationFrame(draw);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  });
</script>

<section class="h-full min-h-0 flex flex-col gap-2">
  <div class="flex items-end justify-between gap-3 flex-wrap">
    <div>
      <p class="eyebrow">Autopilot · No Humans</p>
      <h2 class="m-0 text-lg sm:text-xl font-bold tracking-tight">
        Snake, but the AI drives and every pellet is a walrus explosion
      </h2>
    </div>
    <div class="flex gap-4 text-right">
      <div>
        <p class="stat-num">{pellets}</p>
        <p class="stat-label">Pellets</p>
      </div>
      <div>
        <p class="stat-num">{walruses}</p>
        <p class="stat-label">Walruses</p>
      </div>
      <div>
        <p class="stat-num">{length}</p>
        <p class="stat-label">Length</p>
      </div>
      <div class="hidden sm:block">
        <p class="stat-num text-[0.8rem] pt-1">{status}</p>
        <p class="stat-label">Status</p>
      </div>
    </div>
  </div>

  <div bind:this={wrap} class="relative flex-1 min-h-0">
    <canvas bind:this={canvas} class="absolute inset-0"></canvas>
  </div>
</section>

<style>
  .stat-num {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
    color: var(--accent-bright);
  }
  .stat-label {
    margin: 0.15rem 0 0;
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }
</style>
