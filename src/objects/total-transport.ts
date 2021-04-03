import { TotalTransportsJson, TransportJson } from './json-interface';
import { Transport } from './transport';
import { Query } from './query';
import { Service } from './service';
import { Time } from './time';


export class TotalTransports {
  transports: Transport[] = [];
  transportsJson: TransportJson[] = [];
  constructor(transportsJson: TransportJson[]) {
    this.transportsJson = transportsJson
  }

  search(searchQuery: Query) {
    this.resetTransports();
    this.applyQuery(searchQuery);
    return this.options();
  }

  resetTransports() {
    this.transports = [];
    this.transportsJson.forEach(transport => {
      this.transports.push(new Transport(transport))
    })
  }

  applyQuery(searchQuery: Query) {
    this.applyNeedsLaggageSpace(searchQuery);
    this.applyStartTimeCondition(searchQuery);
    this.applyReachTimeCondition(searchQuery);
    this.applyTransferTime(searchQuery);
  }

  applyNeedsLaggageSpace(searchQuery: Query) {
    this.transports.forEach((transport, i) => {
      if (transport.isBulletTrain()) {
        console.log(transport.services)
        if (searchQuery.needsLaggageSpace) {
          this.transports[i].services = transport.services.filter((service) => service.isWithLaggageSpace)
        } else {
          this.transports[i].services = transport.services.slice();
        }
      }
    })
  }

  applyStartTimeCondition(searchQuery: Query) {
    this.transports[0].services = this.transports[0].services.filter((service) => service.startTime.isEqualOrEarlier(searchQuery.startBefore ?? new Time(23,59))).filter((service) => service.startTime.isEqualOrGreater(searchQuery.startAfter ?? new Time(0,0)));
  }

  applyReachTimeCondition(searchQuery: Query) {
    this.transports[this.transports.length-1].services = this.transports.slice(-1)[0].services.filter((service) => service.reachTime.isEqualOrEarlier(searchQuery.reachBefore ?? new Time(23,59))).filter((service) => service.reachTime.isEqualOrGreater(searchQuery.reachAfter ?? new Time(0,0)));
  }

  applyTransferTime(searchQuery: Query) {
    for (let i=1; i<Math.min(this.transports.length, searchQuery.transferTimeArray.length); i++) {
      this.transports[i].transferTime = searchQuery.transferTimeArray[i] ?? this.transports[i].transferTime;
    }
  }

  options() {
    let result: Service[][] = [];
    this.transports[0].services.forEach(serviceOfFirstTransport => {
      let travel: Service[] = [];
      travel.push(serviceOfFirstTransport)
      let reachTime = serviceOfFirstTransport.reachTime
      let canReach = true
      for (let i = 1; i < this.transports.length; i++) {
        let retArray = this.transports[i].getNextService(reachTime);
        if (retArray) {
          let [nextService, usedAgain] = retArray;
          if (usedAgain) { result.pop() }
          travel.push(nextService);
          reachTime = nextService.reachTime
        } else {
          canReach = false
          break
        }
      }
      if (canReach) {
        result.push(travel)
      }
    })
    return result
  }
}

// export const defaultTotalTransports = new TotalTransports(defaultTotalTransportJson);
export const totalTransportJsonEx:TotalTransportsJson = JSON.parse(
`
{ "toSki":
[
  {
    "transferHour": 0,
    "transferMinute": 0,
    "startStation": "新浦安",
    "reachStation": "東京",
    "services": [
      {
        "startHour": 5,
        "startMinute": 51,
        "reachHour": 6,
        "reachMinute": 24,
        "isWithLaggageSpace": false
      },
      {
        "startHour": 6,
        "startMinute": 5,
        "reachHour": 6,
        "reachMinute": 49,
        "isWithLaggageSpace": false
      }
    ]
  },
  {
    "transferHour": 0,
    "transferMinute": 0,
    "startStation": "東京",
    "reachStation": "越後湯沢",
    "services": [
      {
        "startHour": 6,
        "startMinute": 44,
        "reachHour": 7,
        "reachMinute": 54,
        "isWithLaggageSpace": true
      },
      {
        "startHour": 7,
        "startMinute": 2,
        "reachHour": 8,
        "reachMinute": 32,
        "isWithLaggageSpace": false
      }
    ]
  },
  {
    "transferHour": 0,
    "transferMinute": 5,
    "startStation": "越後湯沢",
    "reachStation": "神立スノーリゾート",
    "services": [
      {
        "startHour": 8,
        "startMinute": 5,
        "reachHour": 8,
        "reachMinute": 15,
        "isWithLaggageSpace": false
      },
      {
        "startHour": 9,
        "startMinute": 30,
        "reachHour": 9,
        "reachMinute": 45,
        "isWithLaggageSpace": false
      }
    ]
  }
],
"Back":
[
  {
    "transferHour": 0,
    "transferMinute": 0,
    "startStation": "新浦安",
    "reachStation": "東京",
    "services": [
      {
        "startHour": 5,
        "startMinute": 51,
        "reachHour": 6,
        "reachMinute": 24,
        "isWithLaggageSpace": false
      },
      {
        "startHour": 6,
        "startMinute": 5,
        "reachHour": 6,
        "reachMinute": 49,
        "isWithLaggageSpace": false
      }
    ]
  },
  {
    "transferHour": 0,
    "transferMinute": 0,
    "startStation": "東京",
    "reachStation": "越後湯沢",
    "services": [
      {
        "startHour": 6,
        "startMinute": 44,
        "reachHour": 7,
        "reachMinute": 54,
        "isWithLaggageSpace": true
      },
      {
        "startHour": 7,
        "startMinute": 2,
        "reachHour": 8,
        "reachMinute": 32,
        "isWithLaggageSpace": false
      }
    ]
  },
  {
    "transferHour": 0,
    "transferMinute": 5,
    "startStation": "越後湯沢",
    "reachStation": "神立スノーリゾート",
    "services": [
      {
        "startHour": 8,
        "startMinute": 5,
        "reachHour": 8,
        "reachMinute": 15,
        "isWithLaggageSpace": false
      },
      {
        "startHour": 9,
        "startMinute": 30,
        "reachHour": 9,
        "reachMinute": 45,
        "isWithLaggageSpace": false
      }
    ]
  }
]
}
`

);
// export const totalTransportsEx = new TotalTransports(totalTransportJsonEx);
