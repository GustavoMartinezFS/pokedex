import { defineStore } from 'pinia';
import { getPokemonList, getPokemonDetails } from '@/services/pokemonApi'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [] as Array<{ name: string; isFavorite: boolean }>,
    favorites: [] as Array<{ name: string; isFavorite: boolean }>,
    loading: false,
    currentView: 'all',
    limit: 100,
    offset: 0,
    allLoaded: false,
  }),

  actions: {
    async fetchPokemons() {
      if (this.allLoaded) return;
      this.loading = true;
      try {
        const response = await getPokemonList(this.limit, this.offset);
        if (response.results.length === 0) {
          this.allLoaded = true;
        } else {
          this.pokemons = [...this.pokemons, ...response.results.map((pokemon: { name: string; isFavorite: boolean; }) => ({
            ...pokemon,
            isFavorite: false,
          }))];
          this.offset += this.limit;
        }
      } catch (error) {
        console.error('Error fetching pokemons', error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonDetails(name: string) {
      this.loading = true;
      try{
        const response = await getPokemonDetails(name);
        const types = response.types.map((typeInfo: { type: { name: string; }; }) => (typeInfo.type.name));

        const pokemon = {
          name: response.name,
          height: response.height,
          weight: response.weight,
          types: types.join(', '),
          image: response.sprites.other.dream_world.front_default,
        }
        return pokemon;
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
      } finally {
        this.loading = false;
      }
    },

    addToFavorites(pokemon: {name: string; isFavorite: boolean }) {
      const indexFav = this.favorites.findIndex((fav) => fav.name === pokemon.name)

      const indexPok = this.pokemons.findIndex((fav) => fav.name === pokemon.name)

      if (!this.favorites.includes(pokemon)) {
        this.favorites.push(pokemon);
        this.pokemons[indexPok].isFavorite = true;
      } else {
        this.favorites.splice(indexFav,1);
        this.pokemons[indexPok].isFavorite = false;
      }
    },

    setView(view: string) {
      this.currentView = view;
    },
  }
});
