// app.js

const STATSIG_CLIENT_KEY = "client-lvyaEX4AsDwO6oFHqUcvKOIUMnAcEAZbyrAZHXEWFbJ"; // replace with your real client key

async function init() {
  try {
    // Initialize Statsig with a simple user
    await statsig.initialize(STATSIG_CLIENT_KEY, { userID: "peppa-user" });

    // Fetch the treat_prices config
    const prices = await statsig.getConfig("treat_prices");
    console.log("Loaded config:", prices);

    // Update the page with values from Statsig (with fallbacks)
    document.getElementById("classicPrice").innerText =
      "$" + prices.getValue("classic_price", 5.99);
    document.getElementById("veganPrice").innerText =
      "$" + prices.getValue("vegan_price", 7.99);
  } catch (err) {
    console.error("Error initializing Statsig:", err);
  }
}

init();
