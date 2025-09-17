// Global Add to Cart function
function logAddToCart(flavor) {
  if (!window.statsig) {
    alert("Statsig not loaded yet!");
    return;
  }
  statsig.logEvent("add_to_cart", { flavor });
  alert(`Added ${flavor} treat to cart! 🐾`);
}

// This function is called when the Statsig SDK finishes loading
async function initStatsig() {
  if (!window.statsig) {
    console.error("Statsig SDK not loaded!");
    return;
  }

  try {
    await statsig.initialize({ userID: "peppa-user" });

    const prices = await statsig.getConfig("treat_prices");

    if (!prices) {
      console.error("Dynamic Config 'treat_prices' not found or not published!");
      document.getElementById("classicPrice").innerText = "Config Error";
      document.getElementById("veganPrice").innerText = "Config Error";
      return;
    }

    // Update page with prices
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
