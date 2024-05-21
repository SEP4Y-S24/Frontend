import axios from "axios";

export const fetchPokemon = async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
        const { results } = response.data;
        const pokemonData: Pokemon[] = await Promise.all(
            results.map(async (pokemon: any) => {
                const pokemonResponse = await axios.get(pokemon.url);
                return {
                    id: pokemonResponse.data.id,
                    imageUrl: pokemonResponse.data.sprites.front_default,
                };
            })
        );

        return pokemonData;
    } catch (error) {
        throw error; // Re-throw the error to handle it outside if needed
    }
};
export interface Pokemon {
    id: number;
    imageUrl: string;
}
export const getPokemonPicById = async (id: number): Promise<string | null> => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return response.data.sprites.front_default;
    } catch (error) {
        console.error(`Error fetching Pokemon picture for ID ${id}:`, error);
        return null;
    }
};
