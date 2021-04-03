import React, { useEffect, useState } from 'react';
import { TotalTransportsJson, TransportJson } from '../objects/json-interface';
import Select from 'react-select';
import { useWayType } from '../hooks/way'
import { TotalTransports, totalTransportJsonEx } from '../objects/total-transport'

interface Props {
  wayToSki: useWayType,
  wayBack: useWayType
}

export const PlaceField = (props: Props) => {
  const [startStation, setStartStation] = useState('');
  const [skiResort, setSkiResort] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (isRequesting) {
      const url = process.env.REACT_APP_API_URL + '/?start_station=新浦安&ski_resort=上越国際スキー場'
      console.log(url)
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((result) => {
          const json:TotalTransportsJson = result
          console.log(json)
          // 行き
          props.wayToSki.setTotalTransports(new TotalTransports(json.toSki));
          // 帰り
          props.wayBack.setTotalTransports(new TotalTransports(json.Back));
        })
    }
    setIsRequesting(false);
  }, [isRequesting]);

  const onSearch = () => {
    if (!startStation && !skiResort) {
      alert('出発駅とスキー場を入力してください');
      return
    }
    if (!startStation) {
      alert('出発駅を入力してください');
      return
    }
    if (!skiResort) {
      alert('スキー場を入力してください');
      return
    }
    setIsRequesting(true);
    return
  };

  const startOptions = [
    { value: '新浦安', label: '新浦安' },
    { value: '海園の街', label: '海園の街' },
  ]
  
  const resortOptions = [
    { value: '上越国際スキー場', label: '上越国際スキー場' },
    { value: 'ガーラ湯沢', label: 'ガーラ湯沢' },
  ]  

  type selectOption = {label: string, value: string}

  const handleStartStationInput = (selected?: selectOption | null)=> {
    if (selected) {
      setStartStation(selected.value);
    }
  };

  const handleSkiResortInput = (selected?: selectOption | null)=> {
    if (selected) {
      setSkiResort(selected.value);
    }
  };


  return (
    <>
      <div className='place-form'>
        <Select options={startOptions} className='select-place' placeholder='出発駅' onChange={ handleStartStationInput }/>
        <Select options={resortOptions} className='select-place' placeholder='スキー場' onChange={ handleSkiResortInput } />
        <button
          onClick={ onSearch }
          className='search-button btn btn-outline-primary'
        >Search</button>
        {/* { props.wayToSki.travel[0] ? props.wayToSki.travel[0].toString() : ''} */}
      </div>
      <hr></hr>
    </>
  )
}
