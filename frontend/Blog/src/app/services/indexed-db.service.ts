import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'dataStorage';
  private storeName = 'singleLineData';
  private _dbPromise: Promise<IDBPDatabase>;

  constructor(private cryptoService: EncryptionService) {
    this._dbPromise = this.initDatabase();
  }

  private async initDatabase(): Promise<IDBPDatabase> {
    return await openDB(this.dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('singleLineData')) {
          db.createObjectStore('singleLineData', { keyPath: 'id' });
        }
      },
    });
  }

  private get db(): Promise<IDBPDatabase> {
    return this._dbPromise;
  }

  async createData(data: { id: string; value: string }): Promise<void> {
    let dataE = {
      id: data.id,
      value: this.cryptoService.encryptDB(data.value),
    };
    const tx = (await this.db).transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.put(dataE);
    await tx.done;
  }

  async readData(id: any): Promise<string | undefined> {
    const tx = (await this.db).transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const data = await store.get(id);
    return data?.value;
  }

  async updateData(data: { id: string; value: string }): Promise<void> {
    const tx = (await this.db).transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.put(data);
    await tx.done;
  }

  async deleteData(id: string): Promise<void> {
    const tx = (await this.db).transaction(this.storeName, 'readwrite');
    const store = tx.objectStore(this.storeName);
    await store.delete(id);
    await tx.done;
  }
  async getAllData(): Promise<any[]> {
    const tx = (await this.db).transaction(this.storeName, 'readonly');
    const store = tx.objectStore(this.storeName);
    const data = await store.getAll();
    return data.map((item) => {
      return {
        id: item.id,
        value: JSON.parse( this.cryptoService.decryptDB(item.value)),
      };
    });
  }
  
}