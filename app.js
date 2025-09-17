// Global Add to Cart function
function logAddToCart(flavor) {
  if (!window.statsig) {
    alert("Statsig not loaded yet!");
    return;
  }
  statsig.logEvent("add_to_cart", { flavor });
  alert(`Added ${flavor} treat to cart! 🐾`);
}

// Initialize Statsig and load Dynamic Config
async function initStatsig() {
  if (!window.statsig) {
    console.error("Statsig SDK not loaded!");
    return;
  }

  try {
    await statsig.initialize({ userID: "peppa-user" });

    // Fetch Dynamic Config
    const prices = await statsig.getConfig("treat_prices");

    // Check if config is published
    if (!prices) {
      console.error("Dynamic Config 'treat_prices' not found or not published!");
      document.getElementById("classicPrice").innerText = "Config Error";
      document.getElementById("veganPrice").innerText = "Config Error";
      return;
    }

    // Update page prices
    document.getElementById("classicPrice").innerText =
      "$" + prices.getValue("classic_price", "N/A");
    document.getElementById("veganPrice").innerText =
      "$" + prices.getValue("vegan_price", "N/A");

    console.log("Statsig config object:", prices);

  } catch (err) {
    console.error("Statsig init error:", err);
    document.getElementById("classicPrice").innerText = "Error";
    document.getElementById("veganPrice").innerText = "Error";
  }
}

// Run init after page fully loads
window.addEventListener("load", initStatsig);
