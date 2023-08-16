import CardsContainer from "../../components/CardsContainer/cardsContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Searchbar from "../../components/Searchbar/searchbar";
import Filters from "../../components/Filters/filter";
import Navbar from "../../components/NavBar/navBar"

import style from "./home.module.css";

//cuando se monta, que haga el dispatch
//    useEffect() -  useDispatch()

const Home = () => {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);

    useEffect(()=> {//para cuando cambie algo en redux
        dispatch(getPokemons());
    },[dispatch]) //array de dependencia
return(
    <div className={style.home}>
    <Searchbar />
    <Filters />
    <Navbar />
    <CardsContainer pokemons={allPokemons} />
    </div>
)
};

export default Home;