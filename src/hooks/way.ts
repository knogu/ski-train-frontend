import { useEffect, useState } from 'react';
import { Query, ToSkiQueryDefault, BackQueryDefault } from  '../objects/query';
import { Service } from '../objects/service';
import { TotalTransports } from '../objects/total-transport';
import { TransportJson } from '../objects/json-interface';

export type useWayType = {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  choices: Service[][];
  setChoices: React.Dispatch<React.SetStateAction<Service[][]>>;
  totalTransports: TotalTransports;
  setTotalTransports: React.Dispatch<React.SetStateAction<TotalTransports>>;
}

export const useWay = (isToSki: boolean) => {
  const [query, setQuery] = useState(isToSki? ToSkiQueryDefault : BackQueryDefault);
  const [choices, setChoices] = useState([] as Service[][]);
  const [totalTransports, setTotalTransports] = useState(new TotalTransports([] as TransportJson[]));

  useEffect(() => {
    if (totalTransports.transportsJson.length > 0) {
      setChoices(totalTransports.search(query));
    }
  }, [totalTransports, query])

  return { query, setQuery, choices, setChoices, totalTransports, setTotalTransports }
}
