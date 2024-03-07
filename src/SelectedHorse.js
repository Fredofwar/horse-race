import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import './App.css';

const SelectedHorse = (props) => {
    const [horseSelected, setHorseSelected] = useState("");
    const [type, setType] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    const selected = () => {
        if (horseSelected.indexOf("O") !== -1) {
            setType("OROS");
        } else if (horseSelected.indexOf("B") !== -1) {
            setType("BASTOS");
        } else if (horseSelected.indexOf("E") !== -1) {
            setType("ESPADAS");
        } else if (horseSelected.indexOf("C") !== -1) {
            setType("COPAS");
        }
    }

    const onStartGame = () => {
        navigate(`/start-game/${params.id}`);
    }

    useEffect(() => {
        setHorseSelected(params.id);
        selected();
    });

    return (
        <div className="container-cards-select">
            <h1 className='title'>HAS SELECCIONADO EL CABALLERO DE {type}</h1>
            <br />
            <div>
                <img className="box" src={`/img/cards/${params.id}.jpg`} />
            </div>
            <div style={{display: "inline-block"}}>
                <Button label="Escoger otro caballero" onClick={props.onSelectHorseAgain}/>
                <Button label="Iniciar carrera" onClick={onStartGame}/>
            </div>
        </div>
    );
}

export default SelectedHorse;