import React from 'react';
import './App.scss';
import { PlaceField } from './components/PlaceField';
import { Way } from './components/Way';
import { useWay } from './hooks/way';

function App() {
  const wayToSki = useWay(true);
  const wayBack = useWay(false);

  return (
    <div className="main">
      <PlaceField wayToSki={ wayToSki } wayBack={ wayBack }/>
      <div className='ways'>
        <Way wayName='行き' way={ wayToSki } key='行き'/>
        <Way wayName='帰り' way={ wayBack } key='帰り'/>
      </div>
    </div>
  );
}

export default App;
