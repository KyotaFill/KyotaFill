import { mkdir, writeFile } from "node:fs/promises";

const OUTPUT = new URL("../assets/metrics-dashboard.svg", import.meta.url);

const profile = {
  login: "KyotaFill",
  name: "Trần Trung Kiên",
  avatar: "https://avatars.githubusercontent.com/u/239052540?v=4",
  joined: "Joined GitHub in 2025",
  followers: 3,
  repositories: 86,
  contributions: 592,
  longestStreak: 104,
  highestDay: 61,
  averagePerDay: 1.62,
};

const recentContributions = [
  3, 1, 4, 1, 4, 2, 5,
  2, 7, 2, 1, 2, 1, 3,
  1, 3, 1, 3, 1, 4, 4,
  1, 4, 2, 5, 2, 8, 2,
  5, 1, 28, 2, 2, 14, 1,
];

const starred = [
  {
    name: "ghostty-org/ghostty",
    description: "Fast, feature-rich, cross-platform terminal emulator",
    language: "Zig",
    stars: "59.6k",
    forks: "3.2k",
  },
  {
    name: "KyotaFill/esp32-gpio-viewer-study",
    description: "ESP32 GPIO viewer study copy with upstream credit",
    language: "C++",
    stars: "1",
    forks: "0",
  },
  {
    name: "KyotaFill/made-with-ml-study",
    description: "Production machine-learning study repository",
    language: "Jupyter Notebook",
    stars: "1",
    forks: "0",
  },
];

const anime = [
  ["Detective Conan", "Shinichi Kudo / Conan Edogawa", "detective-conan", "https://media.kitsu.app/anime/poster_images/210/small.jpg"],
  ["Death Note", "Light Yagami", "death-note", "https://media.kitsu.app/anime/poster_images/1376/small.jpg"],
  ["Attack on Titan", "Eren Yeager", "attack-on-titan", "https://media.kitsu.app/anime/poster_images/7442/small.jpg"],
  ["Naruto: Shippuden", "Naruto Uzumaki", "naruto-shippuden", "https://media.kitsu.app/anime/poster_images/1555/small.jpg"],
  ["One Piece", "Monkey D. Luffy", "one-piece", "https://media.kitsu.app/anime/poster_images/12/small.jpg"],
  ["Dragon Ball Z", "Son Goku", "dragon-ball-z", "https://media.kitsu.app/anime/720/poster_image/small-c68f67afe0e3cf8a7c1c3996788dcc03.jpeg"],
  ["BLEACH", "Ichigo Kurosaki", "bleach", "https://media.kitsu.app/anime/poster_images/244/small.jpg"],
  ["Demon Slayer", "Tanjiro Kamado", "kimetsu-no-yaiba", "https://media.kitsu.app/anime/poster_images/41370/small.jpg"],
  ["Jujutsu Kaisen", "Yuji Itadori", "jujutsu-kaisen", "https://media.kitsu.app/anime/42765/poster_image/small-08cb06fd4250de4d435041861d026a8c.jpeg"],
  ["My Hero Academia", "Izuku Midoriya", "boku-no-hero-academia", "https://media.kitsu.app/anime/poster_images/11469/small.jpg"],
  ["Fullmetal Alchemist: Brotherhood", "Edward Elric", "fullmetal-alchemist-brotherhood", "https://media.kitsu.app/anime/poster_images/3936/small.jpg"],
  ["Hunter x Hunter", "Gon Freecss", "hunter-x-hunter-2011", "https://media.kitsu.app/anime/poster_images/6448/small.jpg"],
  ["Sword Art Online", "Kirito", "sword-art-online", "https://media.kitsu.app/anime/poster_images/6589/small.jpg"],
  ["Tokyo Ghoul", "Ken Kaneki", "tokyo-ghoul", "https://media.kitsu.app/anime/poster_images/8271/small.jpg"],
  ["Steins;Gate", "Rintarou Okabe", "steins-gate", "https://media.kitsu.app/anime/poster_images/5646/small.jpg"],
  ["Code Geass", "Lelouch Lamperouge", "code-geass-lelouch-of-the-rebellion", "https://media.kitsu.app/anime/poster_images/1415/small.jpg"],
  ["Solo Leveling", "Sung Jin-Woo", "solo-leveling", "https://media.kitsu.app/anime/46231/poster_image/small-8850292e573c458ea5f2442a4299924d.jpeg"],
  ["One Punch Man", "Saitama", "one-punch-man", "https://media.kitsu.app/anime/poster_images/10740/small.jpg"],
  ["Mob Psycho 100", "Shigeo Kageyama", "mob-psycho-100", "https://media.kitsu.app/anime/11578/poster_image/small-286944fe8e3610c8a8a68e70a5a8ec61.jpeg"],
  ["Blue Lock", "Yoichi Isagi", "blue-lock", "https://media.kitsu.app/anime/44973/poster_image/small-66cfb7db9f51b469edd6acdb9a7fdbc2.jpeg"],
  ["Chainsaw Man", "Denji", "chainsaw-man", "https://media.kitsu.app/anime/43806/poster_image/small-a4fe7b02e127ba7f8041b1b35d6c4858.jpeg"],
  ["SPY×FAMILY", "Loid Forger", "spy-x-family", "https://media.kitsu.app/anime/45398/poster_image/small-d2d2ddd1b7f5a9c20bbb69b2b476a0d6.jpeg"],
  ["Frieren", "Frieren", "sousou-no-frieren", "https://media.kitsu.app/anime/46474/poster_image/small-2dc1165f5acd773939c7befb0949d258.jpeg"],
  ["Re:Zero", "Subaru Natsuki", "re-zero-kara-hajimeru-isekai-seikatsu", "https://media.kitsu.app/anime/poster_images/11209/small.jpg"],
  ["The Eminence in Shadow", "Cid Kagenou", "kage-no-jitsuryokusha-ni-naritakute", "https://media.kitsu.app/anime/44107/poster_image/small-6d3f03849e79a3caa7398360eb174b16.jpeg"],
  ["Classroom of the Elite", "Kiyotaka Ayanokouji", "youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e-tv", "https://media.kitsu.app/anime/poster_images/13503/small.jpg"],
  ["Vinland Saga", "Thorfinn", "vinland-saga", "https://media.kitsu.app/anime/poster_images/41084/small.jpg"],
  ["Black Clover", "Asta", "black-clover-tv", "https://media.kitsu.app/anime/poster_images/13209/small.jpg"],
  ["Dr. Stone", "Senku Ishigami", "dr-stone", "https://media.kitsu.app/anime/poster_images/42080/small.jpg"],
  ["Haikyuu!!", "Shoyo Hinata", "haikyuu", "https://media.kitsu.app/anime/poster_images/8133/small.jpg"],
];

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

async function dataUri(url) {
  const response = await fetch(url, { headers: { "User-Agent": "KyotaFill-profile-generator" } });
  if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status}`);
  const type = response.headers.get("content-type")?.split(";")[0] || "image/jpeg";
  return `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
}

function text(x, y, content, className = "body", extra = "") {
  return `<text x="${x}" y="${y}" class="${className}" ${extra}>${esc(content)}</text>`;
}

function wrappedText(x, y, lines, className = "muted", lineHeight = 16) {
  return lines.map((line, index) => text(x, y + index * lineHeight, line, className)).join("");
}

function cube(x, y, height, active) {
  const top = active ? "#39d353" : "#21262d";
  const left = active ? "#26a641" : "#161b22";
  const right = active ? "#2ea043" : "#30363d";
  const h = active ? Math.max(4, height) : 1;
  return [
    `<polygon points="${x},${y-h} ${x+10},${y+5-h} ${x},${y+10-h} ${x-10},${y+5-h}" fill="${top}"/>`,
    `<polygon points="${x-10},${y+5-h} ${x},${y+10-h} ${x},${y+10} ${x-10},${y+5}" fill="${left}"/>`,
    `<polygon points="${x},${y+10-h} ${x+10},${y+5-h} ${x+10},${y+5} ${x},${y+10}" fill="${right}"/>`,
  ].join("");
}

function clip(id, x, y, width, height, radius = 5) {
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}"/></clipPath>`;
}

const [avatar, ...posters] = await Promise.all([
  dataUri(profile.avatar),
  ...anime.map((item) => dataUri(item[3])),
]);

const clips = [clip("avatar", 28, 94, 36, 36, 18)];
const images = [];

images.push(`<image href="${avatar}" x="28" y="94" width="36" height="36" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar)"/>`);

const favoriteRows = [
  { index: 0, y: 120, meta: "Mystery · Adventure · 1000+ episodes", description: "A brilliant detective pursues the truth while trapped in a child's body." },
  { index: 1, y: 204, meta: "Psychological · Supernatural · 37 episodes", description: "A battle of intellect begins when Light discovers a lethal notebook." },
  { index: 2, y: 288, meta: "Action · Drama · Fantasy · 87 episodes", description: "Eren fights for freedom in a world surrounded by towering walls." },
];

for (const row of favoriteRows) {
  const id = `favorite-${row.index}`;
  clips.push(clip(id, 500, row.y, 48, 68, 6));
  images.push(`<image href="${posters[row.index]}" x="500" y="${row.y}" width="48" height="68" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/>`);
}

for (let index = 0; index < anime.length; index += 1) {
  const col = index % 10;
  const row = Math.floor(index / 10);
  const x = 500 + col * 40;
  const y = 421 + row * 54;
  const id = `character-${index}`;
  clips.push(clip(id, x, y, 34, 46, 5));
  images.push(`<g><title>${esc(`${anime[index][0]} — ${anime[index][1]}`)}</title><rect x="${x}" y="${y}" width="34" height="46" rx="5" fill="#161b22"/><image href="${posters[index]}" x="${x}" y="${y}" width="34" height="46" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/></g>`);
}

const cubes = recentContributions.map((count, index) => {
  const col = index % 7;
  const row = Math.floor(index / 7);
  const x = 64 + col * 24 - row * 12;
  const y = 298 + col * 12 + row * 7;
  return cube(x, y, Math.min(50, count * 3), count > 0);
}).join("");

const starRows = starred.map((repo, index) => {
  const y = 478 + index * 58;
  return [
    text(34, y, repo.name, "link"),
    text(34, y + 18, repo.description, "small"),
    text(48, y + 38, `${repo.language}   ★ ${repo.stars}   ⑂ ${repo.forks}`, "muted"),
  ].join("");
}).join("");

const animeRows = favoriteRows.map((row) => {
  const item = anime[row.index];
  return [
    text(560, row.y + 14, item[0], "link"),
    text(560, row.y + 34, row.meta, "small"),
    text(560, row.y + 54, row.description, "muted"),
  ].join("");
}).join("");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="920" height="690" viewBox="0 0 920 690" role="img" aria-labelledby="title description">
  <title id="title">KyotaFill GitHub and anime favorites dashboard</title>
  <desc id="description">A two-column dashboard with GitHub activity, starred repositories, favorite anime, and thirty protagonists.</desc>
  <defs>
    ${clips.join("")}
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f81f7"/><stop offset="1" stop-color="#a371f7"/></linearGradient>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
      .heading { fill: #f0f6fc; font-size: 17px; font-weight: 600; }
      .body { fill: #c9d1d9; font-size: 13px; }
      .small { fill: #8b949e; font-size: 11px; }
      .muted { fill: #6e7681; font-size: 10px; }
      .link { fill: #58a6ff; font-size: 13px; font-weight: 500; }
      .metric { fill: #8b949e; font-size: 12px; }
    </style>
  </defs>
  <rect x="1" y="1" width="918" height="688" rx="6" fill="#0d1117" stroke="#30363d"/>
  <rect x="459.5" y="1" width="1" height="688" fill="#30363d"/>
  <rect x="1" y="1" width="918" height="3" rx="2" fill="url(#accent)"/>

  ${images.join("")}

  ${text(76, 110, profile.login, "link")}
  ${text(76, 129, profile.name, "small")}
  ${text(28, 154, `◷  ${profile.joined}`, "metric")}
  ${text(28, 177, `♙  Followed by ${profile.followers} users`, "metric")}
  ${text(238, 154, `▦  ${profile.repositories} public repositories`, "metric")}
  ${text(238, 177, `▣  ${profile.contributions} contributions`, "metric")}
  ${text(28, 210, "Contribution calendar", "link")}

  ${cubes}
  ${text(238, 242, "Commits streaks", "link")}
  ${text(252, 265, `Longest streak ${profile.longestStreak} days`, "metric")}
  ${text(238, 302, "Commits per day", "link")}
  ${text(252, 325, `Highest in a day at ${profile.highestDay}`, "metric")}
  ${text(252, 348, `Average per day at ~${profile.averagePerDay}`, "metric")}

  ${text(28, 395, "Achievements", "link")}
  ${text(28, 418, "Pull Shark · First pull request", "metric")}
  ${text(28, 452, "Recently starred repositories", "link")}
  ${starRows}

  ${text(490, 38, "AniList", "link")}
  ${text(490, 63, "◇  Favorite genres: Mystery, Psychological, Action, Fantasy", "metric")}
  ${text(490, 86, "▣  30 selected anime        ▦  30 protagonists", "metric")}
  ${text(490, 111, "Favorites anime", "link")}
  ${animeRows}
  ${text(490, 401, "Favorite characters", "link")}

  ${text(490, 596, "WakaTime (over last week)", "link")}
  ${text(490, 621, "◷  Coding hours are not connected yet", "metric")}
  ${text(540, 654, "Projects activity", "link")}
  ${text(748, 654, "Language activity", "link")}
  ${text(576, 676, "No activity", "muted")}
  ${text(786, 676, "No activity", "muted")}

  ${text(28, 676, "GitHub data captured 2026-08-16 · Anime artwork and metadata: Kitsu", "muted")}
</svg>`;

await mkdir(new URL("../assets/", import.meta.url), { recursive: true });
await writeFile(OUTPUT, svg, "utf8");
console.log(`Generated ${OUTPUT.pathname}`);
