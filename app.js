// using the ESM CDN build
import { StatsigClient } from "https://cdn.jsdelivr.net/npm/statsig-js/+esm";

// IMPORTANT: replace the placeholder with your Statsig *client* key
const STATSIG_CLIENT_KEY = "client-lvyaEX4AsDwO6oFHqUcvKOIUMnAcEAZbyrAZHXEWFbJ";

const client = new StatsigClient(STATSIG_CLIENT_KEY);

async function init() {
  // Initialize Statsig for a sample user id
  await client.initializeAsync("peppa_demo_user");

  // Feature Gate → Vegan Treats Banner
  const showVeganBanner = await client.checkGate("vegan_treats_banner");
  if (showVeganBanner) {
    document.getElementById("banner").innerText = "🌱 Try our NEW Vegan Treats!";
  }

  // Dynamic Config → Prices
  const prices = await client.getConfig("treat_prices");
  document.getElementById("classicPrice").innerText =
    "$" + prices.getValue("classic_price", 5.99);
  document.getElementById("veganPrice").innerText =
    "$" + prices.getValue("vegan_price", 7.99);
}

// Log Event → Add to Cart
window.logAddToCart = function (treat) {
  client.logEvent("add_to_cart", treat, { flavor: treat });
  alert(`Added ${treat} treat to cart! 🐾`);
};

init().catch(err => {
  console.error("Statsig init error:", err);
  document.getElementById("banner").innerText = ""; // degrade gracefully
});
