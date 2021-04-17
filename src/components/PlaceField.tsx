import React, { useEffect, useState } from 'react';
import { TotalTransportsJson } from '../objects/json-interface';
import Select from 'react-select';
import { useWayType } from '../hooks/way';
import { TotalTransports } from '../objects/total-transport';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";

interface Props {
  wayToSki: useWayType,
  wayBack: useWayType
}

export const PlaceField = (props: Props) => {
  const [startStation, setStartStation] = useState('');
  const [skiResort, setSkiResort] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (isRequesting && date) {
      const url = process.env.REACT_APP_API_URL + `/?start_station=${startStation}&ski_resort=${skiResort}&year=${date.getFullYear().toString()}&month=${(date.getMonth()+1).toString()}&date=${date.getDate().toString()}`
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((result) => {
          const json:TotalTransportsJson = result
          // 行き
          props.wayToSki.setTotalTransports(new TotalTransports(json.toSki));
          // 帰り
          props.wayBack.setTotalTransports(new TotalTransports(json.Back));
        })
    }
    setIsRequesting(false);
  }, [isRequesting]);

  const onSearch = () => {
    if (!startStation || !skiResort || !date) {
      let alert_ = '';
      if (!startStation) {
        alert_ += '出発駅を入力してください\n';
      }
      if (!skiResort) {
        alert_ += 'スキー場を入力してください\n';
      }
      if (!date) {
        alert_ += '日付を入力してください\n';
      }
      alert(alert_)
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
    { value: '神立スノーリゾート', label: '神立スノーリゾート' },
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

  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <div className='place-form'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className='select-date'
            value={date}
            onChange={setDate}
            format="yyyy/MM/dd"
            animateYearScrolling
            placeholder='日付'
          />
        </MuiPickersUtilsProvider>
        <Select options={startOptions} className='select-place' placeholder='出発駅' onChange={ handleStartStationInput }/>
        <Select options={resortOptions} className='select-place' placeholder='スキー場' onChange={ handleSkiResortInput } />
        <button
          onClick={ onSearch }
          className='search-button btn btn-outline-primary'
        >Search</button>
      </div>
    </>
  )
}
