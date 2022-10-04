import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public saveObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }


  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public getObject(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
