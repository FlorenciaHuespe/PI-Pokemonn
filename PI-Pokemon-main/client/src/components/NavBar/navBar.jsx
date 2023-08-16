import { Link } from "react-router-dom";
import style from './navBar.module.css';

const NavBar = () => {
    return (        
            <div className={style.mainContainer}> 
            <div>
                <Link className={style.link} to="/home">Home</Link>
            </div>
            <div>
                <Link className={style.link} to="/form">Create Pokemon</Link>
            </div>
            </div>
    )
}

export default NavBar;