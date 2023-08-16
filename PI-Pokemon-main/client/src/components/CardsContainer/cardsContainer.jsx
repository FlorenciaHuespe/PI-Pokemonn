import Card from '../Card/card';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import style from './cardsContainer.module.css';
import React from 'react';


const CardsContainer = () => { //guarda los estados de la store
    const dispatch = useDispatch(); 
    const pokemons = useSelector((state) => state.pokemons); 
    const selectedType = useSelector((state) => state.selectedType); 
    const selectedSource = useSelector((state) => state.selectedSource);
    const sortingOrder = useSelector((state) => state.sortingOrder); 
    const attackSortingOrder = useSelector((state) => state.attackSortingOrder); 
    const currentPage = useSelector((state) => state.currentPage);
    const itemsPerPage = 12; // cant de cards por página 
  
    const applyFilters = (pokemons, selectedType, selectedSource) => { // función que aplica los filtros en una variable
      let filteredPokemons = pokemons; 
  
      if (selectedType) { // si hay un tipo seleccionado, filtra los pokemons por ese tipo
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.type.includes(selectedType) // pokemon.type.includes(selectedType) = si el tipo del pokemon incluye el tipo seleccionado
        );
      }
  
      if (selectedSource === 'API') { // filtra x api
        filteredPokemons = filteredPokemons.filter((pokemon) => !pokemon.created);
      } else if (selectedSource === 'BD') { // filtra x bdd
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.created);
      }
  
      return filteredPokemons; 
    };
  
    //ordenar asc - desc
    const applySorting = (pokemons, sortingOrder, attackSortingOrder) => { 
      let sortedPokemons = [...pokemons]; //variable para guardar los datos
  
      if (sortingOrder === 'asc') {
        sortedPokemons.sort((a, b) => a.name.localeCompare(b.name)); 
      } else if (sortingOrder === 'desc') {
        sortedPokemons.sort((a, b) => b.name.localeCompare(a.name)); 
      }
  //ordenar asc - desc x attack
       if (attackSortingOrder === 'asc') { 
         sortedPokemons.sort((a, b) => a.attack - b.attack);
       } else if (attackSortingOrder === 'desc') { 
         sortedPokemons.sort((a, b) => b.attack - a.attack); 
       }
  
      return sortedPokemons;
    };
  
    const filteredPokemons = applyFilters(pokemons, selectedType, selectedSource); //pokemons filtrados
    const sortedPokemons = applySorting(filteredPokemons, sortingOrder, attackSortingOrder); // pokemons ordenados
  
    // Paginación
    const totalItems = sortedPokemons.length;   // total de pokemons
    const totalPages = Math.ceil(totalItems / itemsPerPage); // total de pag
  
    const startIndex = (currentPage - 1) * itemsPerPage; // índice de inicio de la pag
    const endIndex = startIndex + itemsPerPage; // índice de fin de la pag
    const paginatedPokemons = sortedPokemons.slice(startIndex, endIndex); //pag actual
  
    const handlePageChange = (page) => { // cambia de pag
      dispatch(setCurrentPage(page)); // cambia el estado 
    };
  
    const handlePrevPage = () => { // función que va a la pag anterior
      if (currentPage > 1) { // si la pag actual es mayor a 1, va a la página anterior
        dispatch(setCurrentPage(currentPage - 1)); // cambia el estado
      }
    };
  
    const handleNextPage = () => { // pag siguiente
      if (currentPage < totalPages) { // si la pag actual es menor a la cantidad total de pag, va a la página siguiente
        dispatch(setCurrentPage(currentPage + 1)); // cambia el estado
      }
    };
  
    return (
        <div >
        <div className={style.container}>
        {paginatedPokemons.map((pokemon) => (// Mapea los pokemons de la página actual y los muestra en Cards
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
        </div>
        <div className={style.Pagination}> {/* Paginación */}
          <button onClick={handlePrevPage} disabled={currentPage === 1}> &lt; </button>{/* &lt; = < */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => ( // crea un array de la cantidad de páginas y lo mapea, mostrando un botón por cada página, array.from = crea un array a partir de un objeto iterable, en este caso, un objeto con la cantidad de páginas
            <button
              key={page} // key = identificador único
              className={page === currentPage ? style.ActivePage : ''} // si la página actual es igual a la página del botón, le agrega la clase ActivePage
              onClick={() => handlePageChange(page)} // al hacer click en el botón, cambia de página
            >
              {page} 
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}> {/* si la página actual es igual a la cantidad total de páginas, deshabilita el botón */}
          &gt; {/* &gt; = > */}
          </button>
        </div>
      </div>
    );
  };

export default CardsContainer;