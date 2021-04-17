import { Time } from './time';
import { Service } from './service';
import { TransportJson } from './json-interface';

export class Transport {
  transferTime: Time;
  startStation: string;
  reachStation: string;
  services: Service[];
  nextTrainIndex = 0

  constructor(transport_: TransportJson) {
    this.transferTime = new Time(transport_.transferHour, transport_.transferMinute)
    this.startStation = transport_.startStation
    this.reachStation = transport_.reachStation
    this.services = []
    transport_.services.forEach(service => {
      this.services.push(new Service(service, this.startStation, this.reachStation))
    })
  }

  getNextService = (timeBeforeTransfer: Time):[Service, boolean]|null => {
    let timeAfterTransfer = this.transferTime.add(timeBeforeTransfer);
    for (let i = this.nextTrainIndex; i < this.services.length; i++) {
      if (this.services[i].startTime.isEqualOrGreater(timeAfterTransfer)) {
        // 返り値の後ろの値がtrue <=> 既に使用したserviceを使った
        return [this.services[i], i === this.nextTrainIndex]
      }
    }
    return null
  }

  isBulletTrain = () => {
    return (this.startStation === '東京' && this.reachStation === '越後湯沢') || (this.startStation === '越後湯沢' && this.reachStation === '東京')
  }
}
