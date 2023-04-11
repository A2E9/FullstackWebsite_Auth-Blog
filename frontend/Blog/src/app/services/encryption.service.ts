// encryption.service.ts
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
}










































// SOMETIME...

// // encryption.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as forge from 'node-forge';
// import * as CryptoJS from 'crypto-js';

// @Injectable({
//   providedIn: 'root',
// })
// export class EncryptionService {
//   private apiUrl = 'http://localhost:8000/dh-key-exchange/';

//   constructor(private http: HttpClient) {}

//   private generateDHKeyPair(): forge.pki.ed25519.KeyPair {
//     const keypair = forge.pki.ed25519.generateKeyPair();
//     return keypair;
//   }

//   private publicKeyToPem(publicKey: forge.pki.ed25519.PublicKey): string {
//     const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
//     return publicKeyPem;
//   }

//   private pemToPublicKey(publicKeyPem: string): forge.pki.ed25519.PublicKey {
//     const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
//     return publicKey;
//   }

//   private decryptData(encryptedData: any, sharedKey: string): string {
//     const iv = CryptoJS.enc.Base64.parse(encryptedData.iv);
//     const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ciphertext);
//     const tag = CryptoJS.enc.Base64.parse(encryptedData.tag);

//     const cipherParams = CryptoJS.lib.CipherParams.create({
//       ciphertext: ciphertext,
//       iv: iv,
//       salt: undefined,
//       algorithm: CryptoJS.algo.AES,
//       mode: CryptoJS.mode.GCM,
//       padding: CryptoJS.pad.NoPadding,
//       blockSize: 4,
//     });

//     const additionalAuthenticatedData = '';

//     const decrypted = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Hex.parse(sharedKey), {
//       mode: CryptoJS.mode.GCM,
//       padding: CryptoJS.pad.NoPadding,
//       iv: iv,
//       additionalAuthenticatedData: CryptoJS.enc.Utf8.parse(additionalAuthenticatedData),
//       tag: tag,
//     });

//     return decrypted.toString(CryptoJS.enc.Utf8);
//   }

//   public async retrieveEncryptedData(): Promise<string> {
//     const keyPair = this.generateDHKeyPair();
//     const publicKeyPem = this.publicKeyToPem(keyPair.publicKey);

//     const response = await this.http
//       .post(this.apiUrl, { publicKey: publicKeyPem }, { responseType: 'json' })
//       .toPromise();

//     const serverPublicKey = this.pemToPublicKey(response['publicKey']);
//     const sharedSecret = keyPair.privateKey.computeSecret(serverPublicKey);

//     const encryptedData = response['encryptedData'];
//     const decryptedData = this.decryptData(encryptedData, sharedSecret.toString('hex'));

//     return decryptedData;
//   }
// }
