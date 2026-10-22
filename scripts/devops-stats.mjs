// Regenerates the DevOps contributions panel in README.md.
// Run by .github/workflows/devops-stats.yml; also works locally: `node scripts/devops-stats.mjs`
import { readFile, writeFile } from "node:fs/promises";

const USER = "JAM3S11";
const README = new URL("../README.md", import.meta.url);
const START = "<!-- DEVOPS:START -->";
const END = "<!-- DEVOPS:END -->";

const res = await fetch(`https://streak-stats.demolab.com/?user=${USER}&type=json`);
if (!res.ok) throw new Error(`streak-stats responded ${res.status}`);
const s = await res.json();
if (typeof s.totalContributions !== "number") throw new Error(`unexpected payload: ${JSON.stringify(s)}`);

const today = new Date();
const days = (a, b) => Math.round((new Date(b) - new Date(a)) / 86_400_000);
const age = days(s.firstContribution, today);
const cur = s.currentStreak.length;
const best = s.longestStreak.length;
const pct = best ? Math.round((cur / best) * 100) : 0;
const bar = (n, w = 20) => "█".repeat(Math.round((n / 100) * w)).padEnd(w, "░");
const row = (ok, stage, metric, value, window) =>
  `${ok ? "✔" : "✖"} ${stage.padEnd(9)} ${metric.padEnd(22)} ${value.padEnd(10)} ${window}`;

const block = `\`\`\`console
james@jam3s11:~$ kubectl get deploy/${USER.toLowerCase()} -n github -o wide
NAME      READY   UP-TO-DATE   AVAILABLE   AGE     STRATEGY
${USER.toLowerCase().padEnd(9)} 1/1     1            1           ${(age + "d").padEnd(7)} RollingUpdate (daily)

james@jam3s11:~$ ./pipeline status --target=contributions
STAGE       METRIC                 VALUE      WINDOW
──────────────────────────────────────────────────────────────────────
${row(true, "build", "total contributions", s.totalContributions.toLocaleString("en-US"), `${s.firstContribution} → present`)}
${cur > 0
  ? row(true, "deploy", "current streak", `${cur} days`, `${s.currentStreak.start} → ${s.currentStreak.end}`)
  : row(false, "deploy", "current streak", "0 days", "pipeline idle · next commit restarts it")}
${row(true, "scale", "longest streak", `${best} days`, `${s.longestStreak.start} → ${s.longestStreak.end}`)}

[ SLO ]  throughput ${(s.totalContributions / Math.max(age, 1)).toFixed(2)} contributions/day since first deploy
[ SLO ]  streak vs record  ${bar(Math.min(pct, 100))} ${pct}%
[ CRON ] auto-synced daily by GitHub Actions · last run ${today.toISOString().slice(0, 16).replace("T", " ")} UTC
\`\`\``;

const md = await readFile(README, "utf8");
const i = md.indexOf(START);
const j = md.indexOf(END);
if (i < 0 || j < 0) throw new Error("DEVOPS markers not found in README.md");
await writeFile(README, md.slice(0, i + START.length) + "\n\n" + block + "\n\n" + md.slice(j));
console.log(`updated: total=${s.totalContributions} current=${cur} longest=${best}`);
