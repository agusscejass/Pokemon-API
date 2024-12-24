const pokemonInput = document.getElementById('pokemon-id');
    const fetchButton = document.getElementById('fetch-pokemon');
    const pokemonContainer = document.getElementById('pokemon-container');

    fetchButton.addEventListener('click', async () => {
      const pokemonId = pokemonInput.value;
      pokemonContainer.innerHTML = '';

      if (!pokemonId || isNaN(pokemonId) || pokemonId <= 0) {
        pokemonContainer.innerHTML = '<p class="error">Por favor, ingrese un número válido.</p>';
        return;
      }

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        if (!response.ok) {
          throw new Error('Pokémon no encontrado.');
        }

        const pokemon = await response.json();

        //Datos de los pokemones
        const name = pokemon.name;
        const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
        const height = pokemon.height / 10;
        const weight = pokemon.weight / 10;
        const image = pokemon.sprites.front_default;

        //Crea la card de los pokemones
        const card = `
          <div class="card">
            <h2>${name}</h2>
            <img src="${image}" alt="${name}">
            <p><strong>Tipo:</strong> ${types}</p>
            <p><strong>Altura:</strong> ${height} m</p>
            <p><strong>Peso:</strong> ${weight} kg</p>
          </div>
        `;

        pokemonContainer.innerHTML = card;
      } catch (error) {
        pokemonContainer.innerHTML = `<p class="error">${error.message}</p>`;
      }
    });