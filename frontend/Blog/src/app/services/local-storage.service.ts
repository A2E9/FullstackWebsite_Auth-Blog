import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage: any;
  private _myData$: any;
  constructor() {}
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  setInfo(token: string) {
    const jsonData = JSON.stringify(token)
    this._localStorage.setItem('token', jsonData)
    this._myData$.next(token)
 }

 loadInfo() {
    const token = JSON.parse(this._localStorage.getItem('token'))
    this._myData$.next(token)
 }

 clearInfo() {
    this._localStorage.removeItem('token')
    this._myData$.next(null)
 }

 clearAllLocalStorage() {
    this._localStorage.clear()
    this._myData$.next(null)
 }
}
