import { ConvexClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

const CONVEX_URL =
  import.meta.env.VITE_CONVEX_URL
  || "https://pastel-wildcat-835.eu-west-1.convex.cloud";

const GAMES = [
  {
    id: "field-rush",
    title: "Field Rush",
    copy: "Hold the line. Place guns, stop the rush, survive 200 waves on Ridge, Mars, or the Citadel.",
    href: "https://field-rush.vercel.app/",
    image: "/field-rush.jpg",
    countKey: "fieldRush",
  },
  {
    id: "no-brakes",
    title: "No Brakes",
    copy: "The throttle is stuck. Steer the night highway and post your distance.",
    href: "https://no-brakes.vercel.app/",
    image: "/no-brakes.jpg",
    countKey: "noBrakes",
  },
  {
    id: "hold-the-hex",
    title: "Hold the Hex",
    copy: "Defend the brass. Place shapes, stop the dots, survive 200 waves.",
    href: "https://hold-the-hex.vercel.app/",
    image: "/hold-the-hex.jpg",
    countKey: "formHold",
  },
  {
    id: "winter-walker",
    title: "Winter Walker",
    copy: "Walk the snow. Same Arcade Engage account. Not open yet.",
    href: null,
    image: "/winter-walker.jpg",
    countKey: "winterWalker",
    soon: true,
  },
  {
    id: "scrap-runner",
    title: "Scrap Runner",
    copy: "Scavenge the yard. Collect the energy cells, then race the extraction hatch.",
    href: "https://scrap-runner.vercel.app/",
    image: "/scrap-runner.jpg",
    countKey: "scrapRunner",
  },
];

function paint(counts) {
  const root = document.getElementById("games");
  if (!root) return;
  root.innerHTML = GAMES.map((game) => {
    const n = counts?.[game.countKey] ?? 0;
    const body = `
      <img src="${game.image}" alt="" />
      <div class="card-body">
        <h2>${game.title}</h2>
        <p>${game.copy}</p>
        <div class="meta">
          <span>${game.soon ? "Coming soon" : "Play"}</span>
          <span>${game.soon ? "" : `${n} online`}</span>
        </div>
      </div>
    `;
    if (game.soon || !game.href) {
      return `<div class="card soon">${body}</div>`;
    }
    return `<a class="card" href="${game.href}">${body}</a>`;
  }).join("");
}

paint({ fieldRush: 0, noBrakes: 0, winterWalker: 0, formHold: 0, scrapRunner: 0 });

try {
  const client = new ConvexClient(CONVEX_URL);
  const countByGame = makeFunctionReference("presence:countByGame");
  client.onUpdate(countByGame, {}, paint);
} catch (err) {
  console.error(err);
}
