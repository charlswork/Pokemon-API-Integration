const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require("axios");

const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "public")); // If your .ejs files are in 'public'

app.get("/", function (req, res) {
  res.render("home");
});
// Route for fetching Pokémon data from the external API
app.get("/pokemon", async (req, res) => {
  try {
    const totalPokemons = 10; // Setting how many Pokémon we want to fetch
    const pokemonPromises = Array.from({ length: totalPokemons }, (_, i) => {
      // Create an array of promises
      const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`; // Pokémon API URL, getting 1 to 10 Pokémon
      return axios
        .get(url) // Make the HTTP request to get data from the API
        .then((response) => ({
          // Process the response data
          name: response.data.name, // Extract the Pokémon name from the API response
          image: response.data.sprites.front_default, // Extract the image of the Pokémon
        }));
    });

    const pokemons = await Promise.all(pokemonPromises); // Wait for all Pokémon data requests to resolve
    res.json(pokemons); // Send the fetched data as a JSON response
  } catch (error) {
    console.error("Error fetching Pokémon data:", error); // Log error if the API request fails
    res.status(500).send("Error retrieving data"); // Send a 500 status with an error message to the client
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

