import { Time } from './time';
import { ServiceJson } from './json-interface';

export class Service {
  startStation: string;
  reachStation: string;
  startTime: Time;
  reachTime: Time;
  isWithLaggageSpace: boolean;

  constructor(service_: ServiceJson, startStation: string, reachStation: string) {
    this.startStation = startStation
    this.reachStation = reachStation
    this.startTime = new Time(service_.startHour, service_.startMinute);
    this.reachTime = new Time(service_.reachHour, service_.reachMinute);
    this.isWithLaggageSpace = service_.isWithLaggageSpace
  }
}
