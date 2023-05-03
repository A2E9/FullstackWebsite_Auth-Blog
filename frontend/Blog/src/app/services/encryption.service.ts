import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs';
import { LocalService } from './local.service';


@Injectable({
  providedIn: 'root',
})

//Used for auth the user in application
export class EncryptionService {
  private apiUrl = 'http://localhost:8000/api/user/'
  private secretKey = '0xasdfasdfasdfasdfasdfasdfasdfas'

  private secretIndex: string = 'your-secret-key';

  constructor(private http: HttpClient, private localStore: LocalService) { }

  getUserData() {
    const authToken = this.localStore.getItem("user", true)?.token;
    const headers = new HttpHeaders().set('Authorization', `Token ${authToken}`);
    
    return this.http.get<{ encrypted_data: string }>(this.apiUrl, { headers }).pipe(
      map(response => {
        const decryptedData = this.decrypt(response.encrypted_data, this.secretKey);
        return JSON.parse(decryptedData);
      })
    );
  }
  
  private decrypt(encryptedData: string, key: string): string {
    const rawData = CryptoJS.enc.Base64.parse(encryptedData);
    const iv = rawData.clone();
    iv.sigBytes = 16; // AES block size is 16 bytes
    rawData.words.splice(0, 4); // Remove IV from the rawData
    rawData.sigBytes -= 16; // Update the rawData length (in bytes)
  
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: rawData
    });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Utf8.parse(key), { mode: CryptoJS.mode.CBC, iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encryptDB(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  decryptDB(ciphertext: string): any {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}