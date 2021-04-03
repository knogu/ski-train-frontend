import { Time } from './time';

export interface Query {
  startAfter: Time;
  startBefore: Time | null;
  reachBefore: Time;
  reachAfter: Time | null;
  needsLaggageSpace: boolean;
  transferTimeArray: (Time | null)[];
}

export const QueryDefault: Query = {
  startAfter: new Time(5,0),
  reachBefore: new Time(12,0),
  startBefore: null,
  reachAfter: null,
  needsLaggageSpace: false,
  transferTimeArray:  [null, null, null]
}
