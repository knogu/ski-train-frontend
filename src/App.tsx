import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { PlaceField } from './components/PlaceField';
import { Way } from './components/Way';
import { useWay } from './hooks/way';

function App() {
  const wayToSki = useWay();
  const wayBack = useWay();

  return (
    <div className="main">
      <PlaceField wayToSki={ wayToSki } wayBack={ wayBack }/>
      <div className='ways'>
        <Way wayName='行き' way={ wayToSki } key={"0"}/>
        <Way wayName='帰り' way={ wayBack } key={"1"}/>
      </div>
    </div>
  );
}

export default App;
