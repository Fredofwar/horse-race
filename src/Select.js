
import goldenHorse from "./assets/11O.jpg"
import cupsHorse from "./assets/11C.jpg";
import clubsHorse from "./assets/11B.jpg";
import swordsHorse from "./assets/11E.jpg";

import './App.css';

const Select = (props) => {

    return(
      <div >
        <h1 className="title">BIENVENIDO A LA CARRERA DE CABALLOS</h1>
        <h2 className="title">-:BARAJA ESPAÑOLA:-</h2>
        <h3 className="title">SELECCIONA UNA CARTA</h3>
        <img src={goldenHorse} className="selection" onClick={() => props.onSelectHorse("11O")} />
        <img src={cupsHorse} className="selection" onClick={() => props.onSelectHorse("11C")} />
        <img src={clubsHorse} className="selection" onClick={() => props.onSelectHorse("11B")} />
        <img src={swordsHorse} className="selection" onClick={() => props.onSelectHorse("11E")} />
      </div>
    );
}

export default Select;