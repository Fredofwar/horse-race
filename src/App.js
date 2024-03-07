import React from 'react';
import Welcome from './Welcome';
import SelectHorse from './Select';
import SelectedHorse from './SelectedHorse';
import StartGame from './StartGame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Winner from './Winner';

export default function App() {

  const onSelectHorse = (selected) => {
    window.location.href = `/selected-horse/${selected}`;
  }

  const onSelectHorseAgain = () => {
    window.location.href = "/select-horse";
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/select-horse' element={<SelectHorse onSelectHorse={onSelectHorse} />} />
        <Route path='/selected-horse/:id' element={<SelectedHorse onSelectHorseAgain={onSelectHorseAgain} />} />
        <Route path='/start-game/:id' element={<StartGame />} />
        <Route path='/winner-game/:selected/:winner/:cardwin' element={<Winner />}/>
      </Routes>
    </BrowserRouter>
  );
}