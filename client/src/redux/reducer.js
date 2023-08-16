import { 
    GET_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_TYPES,
    SET_SELECTED_TYPE,
    SET_SELECTED_SOURCE,
    SET_FILTERED_POKEMONS_BY_SOURCE,
    SET_SORTING_ORDER,
    SET_ATTACK_SORTING_ORDER,
    SET_CURRENT_PAGE,
 } from "./actions";

//estados iniciales
const initialState = {
    pokemons: [],
    pokemonDetails: [],
    types: []
};

const rootReducer = (state = initialState, action)=>{ // actualiza el estado
    switch (action.type){
case GET_POKEMONS: // Obtiene los pokemons
    return {
    ...state, 
    pokemons: action.payload};
case GET_POKEMON_BY_ID: //  por id
    return {
    ...state,
    pokemonDetails: action.payload,
          };
case GET_POKEMON_BY_NAME: // por nombre
    return {
    ...state,
    pokemons: action.payload,
          }; 
case GET_TYPES: //  los types
    return {
    ...state,
    types: action.payload,
          };
case SET_SELECTED_TYPE: // guardo el tipo seleccionado
    return {
    ...state,
    selectedType: action.payload,
          };
case SET_SELECTED_SOURCE: // guardo x api o bd 
    return {
    ...state,
    selectedSource: action.payload,
          };
case SET_FILTERED_POKEMONS_BY_SOURCE: // guardo los filtrados por source
    return {
    ...state,
    filteredPokemons: action.payload,
          };
case SET_SORTING_ORDER: // guardo el orden x nombre
    return {
    ...state,
    sortingOrder: action.payload,
          };
case SET_ATTACK_SORTING_ORDER: // guardo el orden x ataque
    return {
    ...state,
    attackSortingOrder: action.payload,
          };
case SET_CURRENT_PAGE: // guardo la pagina actual
    return {
    ...state,
    currentPage: action.payload,
          };          
default:
    return{...state}; // retorna la copia del estado
    }
};

export default rootReducer;