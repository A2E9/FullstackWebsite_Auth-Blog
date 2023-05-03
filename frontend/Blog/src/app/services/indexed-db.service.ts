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

// import { Injectable } from '@angular/core';
// import { EncryptionService } from './encryption.service';
// import { openDB, IDBPDatabase } from 'idb';

// @Injectable({
//   providedIn: 'root',
// })
// export class IndexedDbService {
//   private dbName = 'TEST';
//   private storeName = 'your-store-name';
//   private request!: IDBOpenDBRequest;
//   private db: any;
//   constructor(private cryptoService: EncryptionService) {
//     //   const DBOpenRequest = window.indexedDB.open("toDoList", 4);
//     this.connectToDb();
//   }

//   connectToDb() {
//     console.log('CONSTRUCTED');
//     this.request = window.indexedDB.open(this.dbName, 1);
//     console.log('this.request: ', this.request);
//     // Let us open our database

//     // this.db = await openDB(this.dbName, 1, {
//     //   upgrade: (db) => {
//     //     db.createObjectStore("customer");
//     //   }
//     // });
//   }

//   setData(key: string, data: any) {
//     // This is what our customer data looks like.
//     const customerData = [
//       { ssn: '444-44-4444', name: 'Bill', email: 'bill@company.com' },
//       { ssn: '555-55-5555', name: 'Donna', email: 'donna@home.org' },
//     ];

//     const encryptedData = this.cryptoService.encryptDB(data);
//     console.log('encryptedData: ', encryptedData);
//     console.log('Decrpyted', this.cryptoService.decryptDB(encryptedData));

//     this.request.onupgradeneeded = (event: any) => {
//       let db = event.target.result;
//       const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

//       objectStore.createIndex("name", "name", { unique: false });
//       objectStore.createIndex("email", "email", { unique: true });
//       console.log('customerData: 1', customerData)
//       objectStore.transaction.oncomplete = (event: any) => {
//           console.log('customerData: 2', customerData)
//         // Store values in the newly created objectStore.
//         const customerObjectStore = db
//           .transaction("customers", 'readwrite')
//           .objectStore("customers");

//           customerData.forEach((customer) => {
//             customerObjectStore.add(customer);
//             console.log('customer: ', customer)
//           });
//       };
//     };
//   }

//   //   async getData(key: string): Promise<any> {
//   //     const encryptedData = await this.db.get("customer", key);
//   //     return this.cryptoService.decryptDB(encryptedData);
//   //   }
// }
