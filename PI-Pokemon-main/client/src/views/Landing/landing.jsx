import style from './landing.module.css';
import { useHistory } from 'react-router-dom';

const Landing = ({ start }) => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/home');
    }
    return (
        <div className={style.container}>
            <div className={style.pokeball} onClick={handleClick}>
            </div>
           <span className={style.btn_play} onClick={handleClick}> START</span> 
        </div>
    );
};

export default Landing;

