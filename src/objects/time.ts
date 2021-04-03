export class Time {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour
    this.minute = minute
  }

  add(diff: Time) {
    let resultHour: number;
    let resultMinute: number;
    resultMinute = this.minute + diff.minute
    resultHour = this.hour + diff.hour
    if (resultMinute >= 60) {
      resultMinute -= 60
      resultHour += 1
    }
    if (resultHour >= 24) {
      resultHour -= 24
    }
    return new Time(resultHour, resultMinute)
  }

  isEqualOrGreater(target: Time) {
    if (this.hour > target.hour) {
      return true
    } else if (this.hour == target.hour){
      return this.minute >= target.minute
    } else {
      return false
    }
  }

  isEqualOrEarlier(target: Time) {
    if (this.hour !== target.hour) {
      return this.hour < target.hour
    } else {
      return this.minute <= target.minute
    }
  }

  paddedHour() {
    return this.hour.toString().padStart(2, '0');
  }

  paddedMinute() {
    return this.minute.toString().padStart(2, '0');
  }
}
