import { TotalTransports } from "./total-transport";

export interface ServiceJson {
  startHour: number,
  startMinute: number,
  reachHour: number,
  reachMinute: number,
  isWithLaggageSpace: boolean
}

export interface TransportJson {
  transferHour: number,
  transferMinute: number,
  startStation: string,
  reachStation: string,
  services: ServiceJson[]
}

export interface TotalTransportsJson {
  toSki: TransportJson[],
  Back: TransportJson[]
}

export const transportsJson: TotalTransportsJson = {
  toSki: [],
  Back: []
}
