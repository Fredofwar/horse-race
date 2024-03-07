
import goldenHorse from "./assets/11O.jpg"
import cupsHorse from "./assets/11C.jpg";
import clubsHorse from "./assets/11B.jpg";
import swordsHorse from "./assets/11E.jpg";
import Button from "./components/Button";
import { useNavigate, useParams } from 'react-router-dom';

import './App.css';
import { useEffect, useState } from 'react';

const cards = ["1B", "1C", "1E", "1O", "2B", "2C", "2E", "2O", "3B", "3C", "3E", "3O", "4B", "4C", "4E", "4O", "5B", "5C", "5E", "5O", "6B", "6C", "6E", "6O",
    "7B", "7C", "7E", "7O", "8B", "8C", "8E", "8O", "9B", "9C", "9E", "9O", "10B", "10C", "10E", "10O", "12B", "12C", "12E", "12O"];
const horses = ["11B", "11C", "11E", "11O"];
const cardsNames = {
    "golden": "Oros",
    "clubs": "Bastos",
    "swords": "Espadas",
    "cups": "Copas"
}
const cardsSuprise = [];

const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    if (arr.length === 44) {
        for (let index = 0; index < 8; index++) {
            cardsSuprise.push(arr.pop());
        }
    }
    console.log(arr);
    return arr;
};



const cardsRandom = shuffle(cards);

const StartGame = () => {

    const [countGolden, setCountGolden] = useState(0);
    const [countCups, setCountCups] = useState(0);
    const [countSwords, setCountSwords] = useState(0);
    const [countClubs, setCountClubs] = useState(0);
    const [currentCard, setCurrentCard] = useState("00");
    const [typeHorse, setTypeHorse] = useState("");
    const [typeHorseX, setTypeHorseX] = useState("");
    const [currentCards, setCurrentCards] = useState(cardsRandom);
    const [cardsX, setCardsX] = useState(cardsSuprise);
    const [secret, setSecret] = useState("00");
    const [selected, setSelected] = useState("");
    const [secretCard, setSecretCard] = useState(2);
    const [disabledButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const secretBase = "00";
    let isBack = false;

    const createIdImage = (type, counter) => {
        return `img-${type}-${counter}`;
    }

    const createPathHorse = (type) => {
        let card = "00";
        if (type === "golden") {
            card = '11O';
        } else if (type === "cups") {
            card = '11C';
        } else if (type === "clubs") {
            card = '11B';
        } else if (type === "swords") {
            card = '11E';
        }
        return `/img/cards/${card}.jpg`;
    }

    const createElementImage = (counter, type) => {
        const imageHorse = document.createElement('img');
        imageHorse.id = createIdImage(type, counter);
        imageHorse.src = createPathHorse(type);
        imageHorse.className = "card-game";
        return imageHorse;
    }

    const setNextPosition = (type, newNextPos) => {
        if (type === "golden") {
            setCountGolden(newNextPos);
        }
        if (type === "cups") {
            setCountCups(newNextPos);
        }
        if (type === "swords") {
            setCountSwords(newNextPos);
        }
        if (type === "clubs") {
            setCountClubs(newNextPos);
        }
    }

    const forward = (counterPosAct, type) => {
        const row = document.getElementById(`row-${type}`);
        const nextPos = document.createElement('td');
        nextPos.id = `${type}-${counterPosAct + 1}`;
        row.appendChild(nextPos);

        const imageHorse = createElementImage(counterPosAct + 1, type);
        if (nextPos) {
            nextPos.appendChild(imageHorse);
            setNextPosition(type, counterPosAct + 1);
            const before = document.getElementById(`img-${type}-${(counterPosAct)}`);
            before.parentNode.removeChild(before);
        }
    }

    const getCardSecretRamdom = () => {
        return cardsX.pop();
    }

    const backToBefore = (idImg, counter, id) => {
        const posAct = document.getElementById(`${idImg + counter}`);
        posAct.parentNode.removeChild(posAct);
        const posActTd = document.getElementById(`${id}-${counter}`);
        posActTd.parentNode.removeChild(posActTd);
        const posAnt = document.getElementById(`${id}-${counter - 1}`);
        posAnt.appendChild(createElementImage((counter - 1), id));
    }

    const revealSecretCard = () => {
        if (countGolden >= secretCard
            && countClubs >= secretCard
            && countCups >= secretCard
            && countSwords >= secretCard) {
            isBack = true;
            const cardToShow = document.getElementById(`cardx-${secretCard - 1}`);
            const cardSecret = getCardSecretRamdom();
            cardToShow.src = `/img/cards/${cardSecret}.jpg`
            setSecret(cardSecret);
            if (cardSecret.indexOf("O") !== -1) {
                backToBefore("img-golden-", countGolden, "golden");
                setTypeHorseX("OROS");
                setCountGolden(countGolden - 1);
            } else if (cardSecret.indexOf("B") !== -1) {
                backToBefore("img-clubs-", countClubs, "clubs");
                setTypeHorseX("BASTOS");
                setCountClubs(countClubs - 1);
            } else if (cardSecret.indexOf("E") !== -1) {
                backToBefore("img-swords-", countSwords, "swords");
                setTypeHorseX("ESPADAS");
                setCountSwords(countSwords - 1);
            } else if (cardSecret.indexOf("C") !== -1) {
                backToBefore("img-cups-", countCups, "cups");
                setTypeHorseX("COPAS");
                setCountCups(countCups - 1);
            }
            setSecretCard((secretCard + 1));
        } else {
            isBack = false;
        }
    }

    const getCardRamdom = () => {
        return currentCards.pop();
    }

    const isWinner = (counterPosAct, type, cardRandom) => {
        if(currentCards.length === 0){
            setTimeout(() => {
                navigate(`/winner-game/${selected}/dead-heat/00`);
            }, 1000);
        }
        if(counterPosAct + 1 >= 10){
            setTimeout(() => {
                navigate(`/winner-game/${selected}/${type}/${cardRandom}`);
            }, 1000);
        }
    }

    const takeCard = () => {
        let type = "";
        let counterPosAct = 0;
        revealSecretCard();
        if (!isBack) {
            const cardRandom = getCardRamdom();
            if (cardRandom.indexOf("O") !== -1) {
                setTypeHorse("OROS")
                type = "golden";
                counterPosAct = countGolden;
            } else if (cardRandom.indexOf("B") !== -1) {
                setTypeHorse("BASTOS")
                type = "clubs";
                counterPosAct = countClubs;
            } else if (cardRandom.indexOf("E") !== -1) {
                setTypeHorse("ESPADAS")
                type = "swords";
                counterPosAct = countSwords;
            } else if (cardRandom.indexOf("C") !== -1) {
                setTypeHorse("COPAS")
                type = "cups";
                counterPosAct = countCups;
            }
            setCurrentCard(cardRandom);
            forward(counterPosAct, type);
            isWinner(counterPosAct, type, cardRandom);
        }
    }

    const setSelection = () => {
        if (params.id.indexOf("O") !== -1) {
            setSelected("golden")
        } else if (params.id.indexOf("B") !== -1) {
            setSelected("clubs")
        } else if (params.id.indexOf("E") !== -1) {
            setSelected("swords")
        } else if (params.id.indexOf("C") !== -1) {
            setSelected("cups")
        }
    }

    useEffect(() => {
        setSelection();
    }, []);

    return (
        <div>
            <div>
                <h1 className="title">CARRERA DE CABALLOS CON BARAJA ESPAÑOLA</h1>
                <h3>TU SELECCION: </h3>
                <img src={`/img/cards/${params.id}.jpg`} className="card-game" />
            </div>
            <div>
                <table>
                    <tr>
                        <th className="title">
                            <h2>RETROCEDE:</h2><br/>
                            <label className='sub-title'>{typeHorseX}</label><br/>
                            <img className="card-game-revel" src={`/img/cards/${secret}.jpg`} /><br/>
                            <span className='sub-title'>{cardsX.length}</span>
                        </th>
                        <th className="title">
                            <table name="table-header-game">
                                <tr>
                                    <th className='title'><h2>START</h2></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className='title'><h2> END </h2></th>
                                </tr>
                                <tr id="row-golden">
                                    <td id="golden-0"><img id='img-golden-0' src={goldenHorse} className="card-game" /></td>
                                </tr>
                                <tr id="row-cups">
                                    <td id='cups-0'><img id='img-cups-0' src={cupsHorse} className="card-game" /></td>
                                </tr>
                                <tr id="row-clubs">
                                    <td id='clubs-0'><img id='img-clubs-0' src={clubsHorse} className="card-game" /></td>
                                </tr>
                                <tr id="row-swords">
                                    <td id='swords-0'><img id='img-swords-0' src={swordsHorse} className="card-game" /></td>
                                </tr>
                                <tr>
                                    <td className="td-but"><Button label="Retirada" onClick={() => { window.location.assign(window.location.href = "/") }} /></td>
                                    <td><img id="cardx-1" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-2" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-3" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-4" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-5" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-6" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-7" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-8" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td><img id="cardx-8" src={`/img/cards/${secretBase}.jpg`} className="card-game" /></td>
                                    <td className="td-but"><Button label={(currentCards.length > 0) ? "Tomar carta" : "No hay mas cartas"} 
                                        onClick={() => takeCard()} id='deck' disabled={(currentCards.length > 0) ? false : true }/></td>
                                </tr>
                            </table>
                        </th>
                        <th className="title">
                            <h2>AVANZA:</h2><br/>
                            <label className='sub-title'>{typeHorse}</label><br/>
                            <img className="card-game-revel" src={`/img/cards/${currentCard}.jpg`} /><br/>
                            <span className='sub-title'>{currentCards.length}</span>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default StartGame;