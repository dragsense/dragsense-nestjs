import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeperService {

  constructor() { }

  
  getLastKeys = (obj: any, result: Record<string, any> = {}): any => {
    for (const key in obj) {
      if (
        obj[key] &&
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key])
      ) {
        if (
          key.toLowerCase().includes('date') &&
          obj[key].hasOwnProperty('year')
        ) {
          const { year, month, day, hour, minute, second } = obj[key];
          const date = new Date(year, month - 1, day, hour, minute, second);
          result[key] = date;
        } else {
          this.getLastKeys(obj[key], result);
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  };

}
