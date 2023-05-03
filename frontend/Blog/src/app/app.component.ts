import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { IndexedDbService } from './services/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Blog';

  constructor(private primengConfig: PrimeNGConfig, private indexDB: IndexedDbService) {
  }
  
  async ngOnInit() {
    // await this.storeData()
    this.primengConfig.ripple = true;
  }

  
}
