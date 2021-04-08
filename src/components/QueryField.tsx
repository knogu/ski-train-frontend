import { TimeField } from './TimeField';
import { Query } from  '../objects/query';
import { Time } from '../objects/time';

interface Props {
  query: Query,
  setQuery: React.Dispatch<React.SetStateAction<Query>>,
  wayName: string;
}

export const QueryField = (props: Props) => {
  const { query, setQuery, wayName } = props;

  return (
    <div className="search">
      <div className='common-filter-params'>
        <h3 className='query-header'>{wayName}</h3>
          <div className='query-body'>
          <TimeField
            hour={ query.startAfter.paddedHour() }
            minute={ query.startAfter.paddedMinute() }
            leave={ true }
            onHourChange={(hour) =>{
              const newQuery = { ...query, startAfter: new Time(Number(hour), Number(query.startAfter.minute)) }
              setQuery(newQuery);
            }}
            onMinuteChange={(minute) =>{
              const newQuery = { ...query, startAfter: new Time(Number(query.startAfter.hour), Number(minute)) }
              setQuery(newQuery);
            }}
          />

          <TimeField
            hour={ query.reachBefore.paddedHour() }
            minute={ query.reachBefore.paddedMinute() }
            leave={ false }
            onHourChange={(hour) =>{
              const newQuery = { ...query, reachBefore: new Time(Number(hour), Number(query.reachBefore.minute)) }
              setQuery(newQuery);
            }}
            onMinuteChange={(minute) =>{
              const newQuery = { ...query, reachBefore: new Time(Number(query.reachBefore.hour), Number(minute)) }
              setQuery(newQuery);
            }}
          />
          <label>
            <input
              type='checkbox'
              onChange={(e) => setQuery({ ...query, needsLaggageSpace: !query.needsLaggageSpace })}
              checked={ query.needsLaggageSpace }
            />
            荷物置き場のある新幹線のみ
          </label>
        </div>
      </div>
    </div>
  );
}
