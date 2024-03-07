import { useNavigate } from 'react-router-dom';
import Button  from './components/Button';
import './Welcome.css';

const Welcome = () => {

    const navigate = useNavigate();
    const selectHorse = () => {
        navigate('/select-horse');
    }

    return (
        <div >
            <p>Bienvenido a la carrera de caballos<br />
                <a>Mamba´s Software Corporation</a></p>
            <br/>
            <Button label="Comenzar Juego" onClick={selectHorse}/>
        </div>
    );
}
export default Welcome;