import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonById } from "../../redux/actions";
import style from "./detail.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Detail = () => {
  const { id } = useParams(); // se obtiene el id desde la url
  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemonDetails); 

  useEffect(() => { // se ejecuta al renderizar el componente
    window.scrollTo(0, 0); // al ingresar desde una pagina anterior, se posiciona en el top de la pagina
    dispatch(getPokemonById(id)); // se ejecuta la accion para obtener el detalle del pokemon
  }, [dispatch, id]); // se agrega el id como dependencia para que se ejecute la accion cada vez que cambie el id

  return (
    <div className={style.container}>
      <div>
                <Link className={style.link} to="/home">Home</Link>
            </div>
            <div>
                <Link className={style.link} to="/form">Create Pokemon</Link>
            </div>
      
        <h1>Pokemon Detail</h1>
      <div className={style.DetailContainer}>{/* detalle con info */}
        <div className={style.pokemonDetail}>
          <div className={style.imageContainer}>
            <img src={pokemonDetail.image} alt="pokemon" />
          </div>
          <div className={style.infoContainer}>
          <h1 className={style.name}> {pokemonDetail.name}</h1>
          <p className={style.info}>ID : {pokemonDetail.id}</p>
          <p className={style.info}>HP : {pokemonDetail.hp}</p>
          <p className={style.info}>Attack : {pokemonDetail.attack}</p>
          <p className={style.info}>Defense : {pokemonDetail.defense}</p>
          <p className={style.info}>Speed : {pokemonDetail.speed}</p>
          <p className={style.info}>Height : {pokemonDetail.height}</p>
          <p className={style.info}>Weight : {pokemonDetail.weight}</p> 
          <div className={style.typesContainer}>
          <h2 className={style.types}>Type :</h2>
          <ul>
            {pokemonDetail.type?.map((type, index) => ( // se mapean los tipos del pokemon
              <li key={index}> 
                {type}
              </li>
            ))}
          </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;