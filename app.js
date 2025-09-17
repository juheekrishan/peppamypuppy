// Global function for Add to Cart button
function logAddToCart(flavor) {
  statsig.logEvent("add_to_cart", { flavor: flavor });
  alert(`Added ${flavor} treat to cart! 🐾`);
}

// Main initialization
async function init() {
  try {
    // Initialize Statsig with a user ID
    await statsig.initialize({ userID: "peppa-user" });

    // Fetch the Dynamic Config
    const prices = await statsig.getConfig("treat_prices");
    console.log("Statsig config object:", prices);

    // Update HTML with prices (fallbacks included)
    document.getElementById("classicPrice").innerText =
      "$" + prices.getValue("classic_price", 5.99);
    document.getElementById("veganPrice").innerText =
      "$" + prices.getValue("vegan_price", 7.99);

  } catch (err) {
    console.error("Statsig init error:", err);
  }
}

// Run init
init();
