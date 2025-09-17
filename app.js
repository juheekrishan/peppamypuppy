async function init() {
  try {
    // Initialize Statsig for a specific user (required for configs)
    await statsig.initialize({ userID: "peppa-user" });

    // Fetch Dynamic Config
  const prices = await statsig.getConfig("treat_prices");
console.log("Statsig config object:", prices);
console.log("Classic price:", prices.getValue("classic_price", "not found"));


    // Update page prices
    document.getElementById("classicPrice").innerText =
      "$" + prices.getValue("classic_price", 5.99);
    document.getElementById("veganPrice").innerText =
      "$" + prices.getValue("vegan_price", 7.99);
  } catch (err) {
    console.error("Statsig init error:", err);
  }
}

init();

