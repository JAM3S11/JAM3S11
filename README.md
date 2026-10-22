<!-- JAM3S11 · profile README · one long terminal session -->
<!-- if you're reading the source: hi, fellow nerd. view-source is a lifestyle. -->

```console
Last login: from github.com on ttys001
james@jam3s11:~$ cat banner.txt

     ██╗ █████╗ ███╗   ███╗███████╗███████╗
     ██║██╔══██╗████╗ ████║██╔════╝██╔════╝
     ██║███████║██╔████╔██║█████╗  ███████╗
██   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║
╚█████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║
 ╚════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝

james@jam3s11:~$ neofetch
james@jam3s11
-------------
OS        : JamesOS 4.0.0-beta (Full Stack Edition)
Host      : Kenya
Kernel    : C (compiled 2022)
Shell     : bash · PowerShell
Runtime   : TypeScript · Node · Python · C#
Packages  : 48 (see package.json below)
Security  : assume breach · never trust user input
Theme     : dark. always dark.
Fuel      : coffee (>= 3 cups/day)
Uptime    : since 2022, zero planned reboots

james@jam3s11:~$ cat /etc/motd
Welcome, visitor. Your session is being logged (by GitHub, not me).
James Daniel is a full stack engineer who boots on C, runs on TypeScript,
and treats every input field like it's actively trying to hurt him.
Tabs > spaces. Small PRs > big PRs. Never trust user input. Ever.
```

```console
james@jam3s11:~$ git log --graph --reverse-chronological ~/life
* v4.0.0-beta (HEAD -> main) · now
|   + security-first: threat model *before* the first `git init`
|   + cloud-native: containers, reproducible builds, no drifting envs
|   + tests that mean something, not green checkmarks for dopamine
|   + open-source contributions and code-review karma
|   ! known issue: side_projects.length grows O(n²), free time stays O(1)
|   ! known issue: will refactor your function if left alone with it
|
* v3.0.0 · 2025
|   + full-stack end to end: APIs → databases → auth → deploy → monitor
|   + bcrypt over plaintext, JWTs that expire, .env never committed
|
* v2.0.0 · 2024 · BREAKING CHANGE
|   ~ migrated from the console to the browser: HTML, CSS, JS → React, Node
|   ~ discovered the DOM is a state machine nobody fully understands
|
* v1.0.0 · 2023
|   + C# in Visual Studio. OOP, SOLID, design patterns finally compiled
|
* v0.1.0 · 2022 · initial commit
    + first lines of C: loops, pointers, a heroic number of segfaults
    - patched SEGV-2022-0001: NULL deref at 2 a.m. lesson learned forever
```

```console
james@jam3s11:~$ ls -l ~/projects
drwxr-xr-x  james  solease/         a unified command center for your entire engineering stack [ts]
drwxr-xr-x  james  entrywave/       graduation view
drwxr-xr-x  james  Quartersortai/   intelligent USB Document Explorer & Financial Quarter Classifier [ts]
drwxr-xr-x  james  GC-ILCMS/        case management prototype for the Government Chemist lab  [ts]
drwxr-xr-x  james  portfolio/       personal site · responsive, fast, permanently at v0.99    [ts]
```

→ `cd` into one: [solease](https://github.com/JAM3S11/solease) · [entrywave](https://github.com/JAM3S11/entrywave) · [Quartersortai](https://github.com/JAM3S11/Quartersortai) · [GC-ILCMS](https://github.com/JAM3S11/GC-ILCMS) · [portfolio](https://github.com/JAM3S11/portfolio)

```console
james@jam3s11:~$ sudo nmap -sV --script=skills jam3s11.local
Starting Nmap ( https://nmap.org )
Nmap scan report for jam3s11.local
Host is up (0.0004s latency). Coffee levels nominal.

PORT      STATE    SERVICE      VERSION
22/tcp    open     c            since 2022 · pointers, memory, segfaults
80/tcp    open     http         HTML · CSS · JavaScript · TypeScript
443/tcp   open     https        TLS everywhere, HSTS on, mixed content off
1433/tcp  open     csharp       .NET · OOP · SOLID
3000/tcp  open     react        React · Next.js · Redux · Tailwind
5000/tcp  open     python       Django · Flask · FastAPI · PyTorch
5432/tcp  open     postgresql   PostgreSQL · MySQL · SQLite · Supabase
8080/tcp  open     node         Node · Express · Socket.io · JWT
27017/tcp open     mongodb      MongoDB · Firebase
2375/tcp  filtered docker       exposed only to people I trust
23/tcp    closed   telnet       it's not 1995

Service detection performed. 1 human scanned in 0.42 seconds.
```

```console
james@jam3s11:~$ cat SECURITY.md
# "Security is not a feature you add. It's a property you keep."

[auth]          hashed + salted passwords (bcrypt/argon2), short-lived JWTs, refresh rotation
[input]         validate on the server, always. the client is a suggestion
[injection]     parameterised queries only. string-concatenated SQL is a confession
[sessions]      HttpOnly · Secure · SameSite cookies, CSRF tokens on state changes
[headers]       CSP, HSTS, X-Content-Type-Options, and CORS that isn't just "*"
[secrets]       .env in .gitignore, keys in a vault, rotated when in doubt
[access]        least privilege for users, services and database roles alike
[supply-chain]  npm audit, Dependabot, committed lockfiles, pinned versions

james@jam3s11:~$ ./owasp-audit --top10 --self
[ PASS ] A01 broken access control     authorisation checked server-side, per route
[ PASS ] A02 cryptographic failures    TLS in transit, nothing sensitive in plaintext
[ PASS ] A03 injection                 parameterised everything, output encoded
[ PASS ] A05 security misconfiguration no default creds, no stack traces in prod
[ PASS ] A07 auth failures             rate limiting and lockouts on login
[ FAIL ] A99 social engineering        still vulnerable to "can you look at my code?"

5 passed · 1 failed · 0 critical

james@jam3s11:~$ cat /etc/security/disclosure
Found a vulnerability in one of my repos? Don't open a public issue.
Message me privately (see `ssh` below). I'll patch it, credit you, and owe you a coffee.
```

```console
james@jam3s11:~$ cat package.json
```

```jsonc
{
  "name": "james-daniel",
  "version": "4.0.0-beta",
  "engines": { "caffeine": ">=3 cups", "sleep": "^optional" },
  "dependencies": {
    "languages":  ["C", "C#", "Java", "Python", "JavaScript", "TypeScript", "PowerShell"],
    "frontend":   ["React", "Next.js", "Redux", "Tailwind", "Material UI", "Chakra UI", "DaisyUI"],
    "backend":    ["Node", "Express", "Django", "Flask", "FastAPI", "Socket.io", "JWT"],
    "data":       ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Supabase", "Firebase"],
    "ml":         ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", "NumPy"],
    "security":   ["OWASP Top 10", "bcrypt", "Helmet", "rate limiting", "CSP"]
  },
  "devDependencies": {
    "ship":       ["Docker", "AWS", "Vercel", "Netlify", "Render"],
    "tooling":    ["Git", "Linux", "Bash", "Postman", "Figma", "Notion"]
  },
  "peerDependencies": {
    "rubber-duck": "latest"
  }
}
```

![stack](https://skillicons.dev/icons?i=c,cs,py,ts,react,nextjs,tailwind,nodejs,django,postgres,mongodb,docker,aws,linux,bash&perline=15)

```console
james@jam3s11:~$ gh issue list --repo JAM3S11/life --state all
#4  OPEN    write more on Medium about what I build                  docs
#3  OPEN    land more meaningful open-source PRs                     community
#2  OPEN    play more CTFs: break things (legally) to defend them    security
#1  OPEN    cloud security deep-dive: IAM, VPCs, zero trust          infra
#0  CLOSED  printf("Hello, World\n");  · closed 2022, works as intended
```

→ read the docs: [medium.com/@jdndirangu2020](https://medium.com/@jdndirangu2020)

```console
james@jam3s11:~$ tail -f /var/log/soc/jam3s11.log
┌──[ SIEM :: jam3s11 ]────────────────────────────────────────────────┐
│  sensor     : github.com/JAM3S11            status : ● ONLINE       │
│  mode       : passive monitoring            alerts : 0 critical     │
│  signal     : commit traffic, 12-month window                       │
└─────────────────────────────────────────────────────────────────────┘
```

![SOC feed](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=15&pause=900&color=00FF41&background=0D111700&center=true&vCenter=true&width=720&lines=%5BSOC%5D+monitoring+github.com%2FJAM3S11+...;%5BOK%5D+no+intrusions+detected+%C2%B7+firewall+holding;%5BINFO%5D+inbound+commits+detected+on+main;%5BWARN%5D+caffeine+reserves+below+threshold;%5BOK%5D+all+systems+nominal+%C2%B7+keep+shipping)

`[ HEATMAP ]` packet density per day · brighter cell = heavier commit traffic

![commit traffic heatmap](https://ghchart.rshah.org/00FF41/JAM3S11)

<!-- PAYLOAD ANALYSIS · static, real numbers from public repos (Oct 2026). refresh occasionally. -->

```console
james@jam3s11:~$ ./sandbox --analyze jam3s11.payload --deep

[*] target    : github.com/JAM3S11 (public repos, forks excluded)
[*] sha256    : 9f2c7a1d…e41a
[*] behaviour : writes code, ships features, refactors without warning
[*] verdict   : HIGHLY PRODUCTIVE

SIGNATURE     SHARE   ACTIVITY               THREAT LEVEL
──────────────────────────────────────────────────────────
TypeScript    62.5%   ████████████▌░░░░░░░   ■■■■ CRITICAL
JavaScript    23.2%   ████▋░░░░░░░░░░░░░░░   ■■■□ HIGH
HTML           7.8%   █▌░░░░░░░░░░░░░░░░░░   ■■□□ MEDIUM
PHP            3.3%   ▋░░░░░░░░░░░░░░░░░░░   ■□□□ LOW
CSS            2.6%   ▌░░░░░░░░░░░░░░░░░░░   ■□□□ LOW
Python         0.1%   ░░░░░░░░░░░░░░░░░░░░   □□□□ DORMANT

[!] 6 signatures matched · 0 false positives
[!] recommendation: do NOT quarantine. hire instead.
```

![activity summary](https://github-readme-stats.vercel.app/api?username=JAM3S11&show_icons=true&include_all_commits=true&count_private=true&bg_color=0D1117&title_color=00FF41&text_color=39FF14&icon_color=FF0033&border_color=00FF41&ring_color=00FF41&custom_title=%5B%20INTRUSION%20LOG%20%5D%20activity%20summary)

<!-- DEVOPS:START -->

```console
james@jam3s11:~$ kubectl get deploy/jam3s11 -n github -o wide
NAME      READY   UP-TO-DATE   AVAILABLE   AGE     STRATEGY
jam3s11   1/1     1            1           1266d   RollingUpdate (daily)

james@jam3s11:~$ ./pipeline status --target=contributions
STAGE       METRIC                 VALUE      WINDOW
──────────────────────────────────────────────────────────────────────
✔ build     total contributions    710        2023-05-06 → present
✔ deploy    current streak         5 days     2026-10-18 → 2026-10-22
✔ scale     longest streak         93 days    2026-01-01 → 2026-04-03

[ SLO ]  throughput 0.56 contributions/day since first deploy
[ SLO ]  streak vs record  █░░░░░░░░░░░░░░░░░░░ 5%
[ CRON ] auto-synced daily by GitHub Actions · last run 2026-10-22 15:16 UTC
```

<!-- DEVOPS:END -->

```console
james@jam3s11:~$ ssh visitor@jam3s11 --connect
[+] handshake complete · cipher: friendliness-256-gcm
[+] available endpoints:
    linkedin       james-daniel-jr
    medium         @jdndirangu2020
    stackoverflow  user/27977762
    reddit         u/Artistic_Toe5484
    pinterest      jdndirangu
    mail           YOUR_EMAIL_HERE
```

→ connect: [LinkedIn](https://linkedin.com/in/james-daniel-jr) · [Medium](https://medium.com/@jdndirangu2020) · [Stack Overflow](https://stackoverflow.com/users/27977762) · [Reddit](https://reddit.com/user/Artistic_Toe5484) · [Pinterest](https://pinterest.com/jdndirangu) · [Email](mailto:jdndirangu2020@gmail.com) · [Portfolio](https://james-daniel.vercel.app)

```console
james@jam3s11:~$ git log --oneline -1
a1b2c3d (HEAD -> main) ship it, learn from it, patch it, ship it better

james@jam3s11:~$ exit
logout
Connection to jam3s11 closed by remote host. Thanks for scanning. 👾
james@jam3s11:~$ █
```
