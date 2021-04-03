import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useWayType } from '../hooks/way';
import { QueryField } from './QueryField';
import { TotalChoices } from './Choices';

type WayProps = {
  wayName: string;
  way: useWayType;
}

export const Way = (props: WayProps) => {
  return (
    <div className='way'>
      <h1 className='way-name'>{ props.wayName }</h1>
      <QueryField query={props.way.query} setQuery={props.way.setQuery}/>
      <TotalChoices choices={props.way.choices}/>
    </div>
  )
}
