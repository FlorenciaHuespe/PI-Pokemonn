import style from './card.module.css';
import React from 'react';
import {Link} from "react-router-dom";


const Card = ({ pokemon }) => {
  const { id, image, name, type } = pokemon;

    return (
        <div className={style.card}>
          <Link to={`/detail/${id}`} className={style.link}>
        <div className={style['img-container']}>
          <img src={image} alt="Pokemon" /> 
        </div> 
           <h2 className={style.name}>{name}</h2>
           <p className={style.info}>Types: {type}</p>
           </Link>
        </div>
    )
};

export default Card;