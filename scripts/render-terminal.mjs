// Renders assets/terminal.svg: a terminal session that types itself out once, then idles on a blinking prompt.
// Also writes docs/stats.json for the interactive shell (the stats API has no CORS, so the page can't fetch it).
// Content lives in docs/profile.json, shared with docs/index.html.
// Run by .github/workflows/devops-stats.yml; also works locally: `node scripts/render-terminal.mjs`
import { mkdir, readFile, writeFile } from "node:fs/promises";

const P = JSON.parse(await readFile(new URL("../docs/profile.json", import.meta.url), "utf8"));
const OUT = new URL("../assets/terminal.svg", import.meta.url);
const STATS = new URL("../docs/stats.json", import.meta.url);

const res = await fetch(`https://streak-stats.demolab.com/?user=${P.github}&type=json`);
if (!res.ok) throw new Error(`streak-stats responded ${res.status}`);
const s = await res.json();
if (typeof s.totalContributions !== "number") throw new Error(`unexpected payload: ${JSON.stringify(s)}`);

const cur = s.currentStreak.length;
const best = s.longestStreak.length;
const stats = {
  total: s.totalContributions, current: cur, longest: best,
  currentRange: [s.currentStreak.start, s.currentStreak.end],
  longestRange: [s.longestStreak.start, s.longestStreak.end],
  firstContribution: s.firstContribution, syncedAt: new Date().toISOString(),
};

// palette (GitHub dark)
const C = {
  user: "#3fb950", path: "#58a6ff", fg: "#e6edf3", label: "#d2a8ff",
  ok: "#3fb950", bad: "#f85149", dim: "#8b949e", logo: "#3fb950",
};

// an output line is a list of segments: [text, color, column?]. column pins the segment to a char cell.
// pin every glyph of ASCII art to its own cell, so font width differences can't skew it
const grid = (str, color, from = 0) => [...str].flatMap((ch, i) => (ch === " " ? [] : [[ch, color, from + i]]));
const INFO_COL = 11;

const steps = [
  { cmd: "whoami", out: [[[P.name, C.user], [" · " + P.tagline, C.fg]]] },
  {
    cmd: "neofetch",
    out: [
      [[`${P.user}`, C.user, INFO_COL], ["@", C.fg], [P.host, C.user]],
      ...P.neofetch.map(([k, v]) => [[k, C.label, INFO_COL], [v, C.fg, INFO_COL + 9]]),
    ].map((row, i) => [...grid(P.logo[i] ?? "", C.logo), ...row]),
  },
  {
    cmd: "ls ~/projects",
    out: [(() => {
      let col = 0;
      return P.projects.map((p) => { const seg = [p.name + "/", C.path, col]; col += p.name.length + 3; return seg; });
    })()],
  },
  {
    cmd: "./owasp-audit --self",
    out: [[[`[PASS] ${P.security.audit.pass}`, C.ok, 0], [`[FAIL] ${P.security.audit.fail}`, C.bad, 11], [P.security.audit.note, C.dim, 21]]],
  },
  {
    cmd: "./pipeline status --target=contributions",
    out: [
      [
        ["✔ build ", C.ok, 0], [`${stats.total.toLocaleString("en-US")} contributions`, C.fg],
        ...(cur > 0 ? [["✔ deploy ", C.ok, 26], [`${cur}-day streak`, C.fg]] : [["✖ deploy ", C.bad, 26], ["idle", C.fg]]),
        ["✔ scale ", C.ok, 50], [`${best}-day record`, C.fg],
      ],
      [[`# synced ${stats.syncedAt.slice(0, 10)} by GitHub Actions · since ${stats.firstContribution}`, C.dim]],
    ],
  },
];

const W = 820, PAD = 24, TOP = 64, LH = 20, CW = 8.4;
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cx = (col) => +(PAD + col * CW).toFixed(1);
const ry = (row) => TOP + row * LH;
const at = (t) => `<set attributeName="opacity" to="1" begin="${t.toFixed(2)}s" fill="freeze"/>`;
const PROMPT = [[`${P.user}@${P.host}`, C.user], [":", C.fg], ["~", C.path], ["$ ", C.fg]];
const PROMPT_LEN = PROMPT.reduce((n, [t]) => n + [...t].length, 0);

const els = [];
const cursorMoves = [];
let row = 0;
let t = 0.6;

const segsToSpans = (segs) => segs.map(([text, color, col]) =>
  `<tspan${col !== undefined ? ` x="${cx(col)}"` : ""} fill="${color}">${esc(text)}</tspan>`).join("");

const promptAt = (r, time) => {
  let col = 0;
  const glyphs = PROMPT.flatMap(([text, color]) => [...text].map((ch) => [ch, color, col++]));
  els.push(`<text y="${ry(r)}" opacity="0">${segsToSpans(glyphs)}${at(time)}</text>`);
  cursorMoves.push([time, PROMPT_LEN, r]);
};

for (const step of steps) {
  promptAt(row, t);
  // type the command one glyph at a time, with a small fixed jitter so it reads as human
  const chars = [...step.cmd].map((ch, k) => {
    t += 0.05 + ((k * 7) % 5) * 0.012;
    cursorMoves.push([t, PROMPT_LEN + k + 1, row]);
    return `<tspan x="${cx(PROMPT_LEN + k)}" fill="${C.fg}" opacity="0">${esc(ch)}${at(t)}</tspan>`;
  });
  els.push(`<text y="${ry(row)}">${chars.join("")}</text>`);
  t += 0.35;
  row++;
  for (const line of step.out) {
    els.push(`<text x="${PAD}" y="${ry(row)}" opacity="0">${segsToSpans(line)}${at(t)}</text>`);
    t += 0.07;
    row++;
  }
  row++; // blank line between commands
  t += 0.5;
}

els.push(`<text x="${PAD}" y="${ry(row)}" opacity="0"><tspan fill="${C.dim}"># click to open an interactive shell →</tspan>${at(t)}</text>`);
row++;
promptAt(row, t + 0.2);

const [, firstCol, firstRow] = cursorMoves[0];
const cursor = `<rect x="${cx(firstCol)}" y="${ry(firstRow) - 13}" width="${CW}" height="17" fill="${C.fg}">
    <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite"/>
    ${cursorMoves.map(([time, col, r]) =>
      `<set attributeName="x" to="${cx(col)}" begin="${time.toFixed(2)}s" fill="freeze"/><set attributeName="y" to="${ry(r) - 13}" begin="${time.toFixed(2)}s" fill="freeze"/>`).join("\n    ")}
  </rect>`;

const H = ry(row) + 22;
const FONT = `ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', monospace`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(P.name)}'s terminal">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="10" fill="#0d1117" stroke="#30363d"/>
  <path d="M0.5 36 V10.5 A10 10 0 0 1 10.5 0.5 H${W - 10.5} A10 10 0 0 1 ${W - 0.5} 10.5 V36 Z" fill="#161b22"/>
  <line x1="0.5" y1="36" x2="${W - 0.5}" y2="36" stroke="#30363d"/>
  <circle cx="20" cy="18" r="6" fill="#ff5f56"/><circle cx="40" cy="18" r="6" fill="#ffbd2e"/><circle cx="60" cy="18" r="6" fill="#27c93f"/>
  <text x="${W / 2}" y="22" text-anchor="middle" fill="${C.dim}" font-family="${FONT}" font-size="13">${P.user}@${P.host}: ~</text>
  <g font-family="${FONT}" font-size="14" xml:space="preserve" style="white-space:pre">
  ${els.join("\n  ")}
  ${cursor}
  </g>
</svg>
`;

await mkdir(new URL("../assets/", import.meta.url), { recursive: true });
await writeFile(OUT, svg);
await writeFile(STATS, JSON.stringify(stats, null, 2) + "\n");
console.log(`rendered assets/terminal.svg (${t.toFixed(1)}s session) + docs/stats.json: total=${stats.total} current=${cur} longest=${best}`);
