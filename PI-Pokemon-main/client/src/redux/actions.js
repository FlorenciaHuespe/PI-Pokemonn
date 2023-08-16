import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TYPES = "GET_TYPES";
export const SET_SELECTED_TYPE = 'SET_SELECTED_TYPE';
export const SET_SELECTED_SOURCE = 'SET_SELECTED_SOURCE';
export const SET_FILTERED_POKEMONS_BY_SOURCE = 'SET_FILTERED_POKEMONS_BY_SOURCE';
export const SET_SORTING_ORDER = 'SET_SORTING_ORDER';
export const SET_ATTACK_SORTING_ORDER = 'SET_ATTACK_SORTING_ORDER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// obtiene los pokemons
export const getPokemons = () => {
    return async function (dispatch) { //no podemos retornar una action, por lo que retornamos una funcion, la cual hace la req
    try {
        const apiData = await axios.get ("http://localhost:3001/pokemons"); 
        const pokemons  = apiData.data;  // guarda en una const
        dispatch({ type:GET_POKEMONS, payload: pokemons }); // actualiza el estado 
} catch (error) {
    alert("Error al obtener datos de Pokemones", error);
}
};
};

export const getPokemonById = (id) => {
    return async function (dispatch) {
        try {
        const apiData = await axios.get(
            `http://localhost:3001/pokemons/${id}`
        );
        const pokemon = apiData.data;
        dispatch({type: GET_POKEMON_BY_ID, payload: pokemon});
    } catch (error) {
        alert("Error al obtener datos de Pokemones");
    }
    };
};

export const getPokemonByName = (name) =>{
    return async function (dispatch) {
        try {
        const apiData = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
        const PokemonByName = apiData.data;
        dispatch({type: GET_POKEMON_BY_NAME, payload: PokemonByName})
    } catch (error) {
        alert("Error al obtener datos de Pokemones");
    }
};
};

export const getTypes = () =>{
    return async function (dispatch){
        try {
            const apiData = await axios.get("http://localhost:3001/pokemons/types");
            const typeData = apiData.data.map((type) =>({
                id: type.id,
                name: type.name,
            }));
            dispatch({type: GET_TYPES, payload: typeData});
        } catch (error) {
            alert("Error al obtener datos de Pokemones");
        }
    }
}
export const setSelectedType = (selectedType) => { // guarda el tipo de pokemon seleccionado
    return {
      type: SET_SELECTED_TYPE, // actualiza el estado de la aplicación 
      payload: selectedType,
    };
  };
  
  export const setSelectedSource = (source) => ({ // guarda la source api o bd 
    type: SET_SELECTED_SOURCE, 
    payload: source,
  });
  
  export const setFilteredPokemonsBySource = (filteredPokemons) => ({ // guarda los pokemons filtrados
    type: SET_FILTERED_POKEMONS_BY_SOURCE, 
    payload: filteredPokemons,
  });
  
  export const setSortingOrder = (sortingOrder) => ({ // guarda el orden x nombre 
    type: SET_SORTING_ORDER, 
    payload: sortingOrder,
  });
  
  export const setAttackSortingOrder = (sortingOrder) => ({ // guarda el orden x ataque 
    type: SET_ATTACK_SORTING_ORDER,  
    payload: sortingOrder,
  });
  
  export const setCurrentPage = (currentPage) => ({ // guarda la pagina 
    type: SET_CURRENT_PAGE, 
    payload: currentPage,
  });

//misma estructura
// return una funcion
// hacen la request --- const apiData = await axios.get....
// sacan la informacion que necesiten --- const pokemonData = apiData.data;
// dispatch con el type correspondiente