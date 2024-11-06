fetch("/pokemon") // Make a fetch request to the '/pokemon' route to get the Pokémon data from the server
  .then((response) => response.json()) // Parse the response as JSON once it's received
  .then((data) => {
    // Once the data is available, execute the following code
    const container = document.getElementById("pokemon-container"); // Get the container element to append the Pokémon cards to

    data.forEach((pokemon) => {
      // Loop through each Pokémon data item
      const card = document.createElement("div"); // Create a new div element to represent the Pokémon card
      card.className = "pokemon-card"; // Assign the class 'pokemon-card' for styling

      const img = document.createElement("img"); // Create an image element for the Pokémon's sprite
      img.src = pokemon.image; // Set the image source to the Pokémon's image URL from the fetched data
      img.alt = pokemon.name; // Set the alt text for accessibility, using the Pokémon's name

      const nameElement = document.createElement("p"); // Create a paragraph element for the Pokémon's name
      nameElement.textContent = `${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      }`; // Capitalize the first letter of the Pokémon's name before setting it as text

      card.appendChild(img); // Append the image to the card
      card.appendChild(nameElement); // Append the name of the Pokémon below the image
      container.appendChild(card); // Append the card (containing image and name) to the container element
    });
  })
  .catch((error) => console.error("Error fetching Pokémon data:", error)); // If there’s an error during the fetch, log it to the console
