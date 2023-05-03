import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public setItem(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string, parse: boolean = false) {
  
    const item = localStorage.getItem(key);
  
    if (item === null) {
      console.log("errorFound");
      return null;
    }
  
    if (parse) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.log('Error parsing JSON', e);
        return null;
      }
    }
  
    return item;
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clearStorage() {
    localStorage.clear();
  }
}
