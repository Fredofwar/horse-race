import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './App.css';
import Button from "./components/Button";

const Winner = () => {

    const [winner, setWinner] = useState("");
    const [message, setMessage] = useState("¡¡HAY GANADOR!!");
    const params = useParams();
    const navigate = useNavigate();

    const setMessagewinner = () => {
        if (params.winner === "golden") {
            setWinner("CABALLERO DE OROS");
        }else if (params.winner === "cups") {
            setWinner("CABALLERO DE COPAS");
        }else if (params.winner === "swords") {
            setWinner("CABALLERO DE ESPADAS");
        }else if (params.winner === "clubs") {
            setWinner("CABALLERO DE BASTOS");
        } else if("dead-heat" === params.winner) {
            setMessage("NO HAY GANADOR, SE HAN TERMINADO LAS CARTAS!!");
            setWinner("SUERTE PARA LA PRÓXIMA");
        }
        if(params.selected === params.winner){
            setMessage("¡¡FELICIDADES ERES EL GANDOR DE LA CARRERA!!");
        }
    }

    const playAgain = () => {
        navigate('/select-horse');
    }

    useEffect(() => {
        setMessagewinner();
        setTimeout(() => {
            navigate(`/`);
        }, 59000);
    }, []);

    return (
        <div>
            <h1 className="title">{message}</h1>
            <h2 className="title">{winner}</h2> <br/>
            <img src={`/img/cards/${params.cardwin}.jpg`} className="card-game-revel"/> <br/>
            <Button label="Retirada" onClick={() => { navigate('/'); }} />
            <Button label="Volver a jugar" onClick={playAgain}/>
        </div>
    );
}

export default Winner;