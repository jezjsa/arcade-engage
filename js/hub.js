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
    id: "winter-walker",
    title: "Winter Walker",
    copy: "Walk the snow. O left, P right. Same Arcade Engage account.",
    href: "https://winterwalker.arcadeengage.com/",
    image: "/winter-walker.jpg",
    countKey: "winterWalker",
  },
];

function paint(counts) {
  const root = document.getElementById("games");
  if (!root) return;
  root.innerHTML = GAMES.map((game) => {
    const n = counts?.[game.countKey] ?? 0;
    return `
      <a class="card" href="${game.href}">
        <img src="${game.image}" alt="" />
        <div class="card-body">
          <h2>${game.title}</h2>
          <p>${game.copy}</p>
          <div class="meta">
            <span>Play</span>
            <span>${n} online</span>
          </div>
        </div>
      </a>
    `;
  }).join("");
}

paint({ fieldRush: 0, noBrakes: 0, winterWalker: 0 });

try {
  const client = new ConvexClient(CONVEX_URL);
  const countByGame = makeFunctionReference("presence:countByGame");
  client.onUpdate(countByGame, {}, paint);
} catch (err) {
  console.error(err);
}
