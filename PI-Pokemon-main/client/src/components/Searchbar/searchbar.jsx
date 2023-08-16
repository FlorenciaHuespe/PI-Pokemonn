import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName, setCurrentPage } from "../../redux/actions";
import styles from "./searchbar.module.css";


const Searchbar = () => {

    const dispatch = useDispatch(); // se asigna la funcion usedispatch para ejecutar acciones de forma posterior
    const allPokemons = useSelector((state) => state.pokemons); // se obtiene el estado de los pokemones
    const [search, setSearch] = useState(""); // Searchbar del estado de búsqueda
    const [notFound, setNotFound] = useState(false); // Inicializando estado de pokemon de no encontrado

    const handleChange = (e) => {
        setSearch(e.target.value); // Actualizando el estado de búsqueda según la entrada del usuario
        setNotFound(false); // Restableciendo el estado de no encontrado cuando cambia la entrada de búsqueda

    };

    const handleSubmit = (e) => { // Manejador de envío de formulario
    e.preventDefault();
    dispatch(getPokemonByName(search)); // Dispatch de la acción para obtener un Pokémon por nombre
    setSearch(""); // Limpiando la entrada de búsqueda después de enviar el formulario
    dispatch(setCurrentPage(1)); // Reiniciar la página al buscar un Pokémon
    };

    useEffect(() => {
        if (allPokemons.length === 0) {
          setNotFound(true); // Establecer el estado de error si no se encuentra ningún Pokémon
        } else {
          setNotFound(false); // Restablecer el estado de error si se encuentra algún Pokémon
        }
      }, [allPokemons]);


    return (
        <div>
            <div className={styles.SearchContainer}>
                { /* Searchbar para buscar Pokémon por nombre */}
                <form className={styles.SearchForm} onSubmit={handleSubmit}>
                <input
                    className={styles.SearchInput}
                    type="search"
                    placeholder=""
                    value={search}
                    onChange={handleChange}
                />
                <button className={styles.SearchButton} type="submit">
                    Search 
                </button>
                </form>
            </div>
                { /* Mensaje de error si no se encuentra ningún Pokémon */}
            {notFound && <p className={styles.NotFoundMessage}>Pokémon not found!</p>}
        </div>
    
)}

export default Searchbar;