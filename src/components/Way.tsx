import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useWayType } from '../hooks/way';
import { QueryField } from './QueryField';
import { TotalChoices } from './Choices';

type WayProps = {
  wayName: string;
  way: useWayType;
  key: string;
}

export const Way = (props: WayProps) => {
  return (
    <div className='way'>
      <QueryField query={props.way.query} setQuery={props.way.setQuery} wayName={props.wayName}/>
      <TotalChoices choices={props.way.choices} wayKey={props.key}/>
    </div>
  )
}
