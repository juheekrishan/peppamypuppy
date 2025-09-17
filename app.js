// Global Add to Cart function
function logAddToCart(flavor) {
  if (!statsig) {
    alert("Statsig not initialized yet!");
    return;
  }
  statsig.logEvent("add_to_cart", { flavor: flavor });
  alert(`Added ${flavor} treat to cart! 🐾`);
}

// Initialize Statsig and load Dynamic Config
async function init() {
  try {
    await statsig.initialize({ userID: "peppa-user" });

    const prices = await statsig.getConfig("treat_prices");

    // TEST: verify if Dynamic Config is fetched
    if (!prices) {
      console.error("Dynamic Config 'treat_prices' not found or not published!");
      document.getElementById("classicPrice").innerText = "Config Error";
      document.getElementById("veganPrice").innerText = "Config Error";
      return;
    }

    console.log("Statsig config object:", prices);

    // Update page with prices
    document.getElementById("classicPrice").innerText =
      "$" + prices.getValue("classic_price", "N/A");
    document.getElementById("veganPrice").innerText =
      "$" + prices.getValue("vegan_price", "N/A");

  } catch (err) {
    console.error("Statsig init error:", err);
    document.getElementById("classicPrice").innerText = "Error";
    document.getElementById("veganPrice").innerText = "Error";
  }
}

// Run initialization
init();
