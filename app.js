// Global Add to Cart function
function logAddToCart(flavor) {
  statsig.logEvent("add_to_cart", { flavor: flavor });
  alert(`Added ${flavor} treat to cart! 🐾`);
}

// Initialize Statsig and load prices
async function init() {
  try {
    await statsig.initialize({ userID: "peppa-user" });

    const prices = await statsig.getConfig("treat_prices");
    console.log("Statsig config object:", prices);

    // Update page with prices (fallbacks included)
    document.getElementById("classicPrice").innerText =
      "$" + prices.getValue("classic_price", 5.99);
    document.getElementById("veganPrice").innerText =
      "$" + prices.getValue("vegan_price", 7.99);

  } catch (err) {
    console.error("Statsig init error:", err);
  }
}

// Run the initialization
init();
