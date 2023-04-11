import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import { LocalService } from 'src/app/services/local.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items!: MenuItem[];

  constructor(private authServ: AuthService, private router: Router, private localStore: LocalService, private encrypted: EncryptionService) {
  }
  ngOnInit(): void {
    console.log('4')
    
    this.items = [
      {
        label: 'Posts',
        icon: 'pi pi-fw pi-list',
        command: (event) => {
          this.openPosts();
        },
      },
      {
        label: (this.localStore.getItem('user',true))?.user_info?.username 
        ,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Edit Me',
            icon: 'pi pi-fw pi-pencil',
          },
        ],
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: (event) => {
          this.logout();
        },
      },
    ];
  }
  checked!: boolean;
  color1!: string;

  color2: any = {
    r: 100,
    g: 130,
    b: 150,
  };

  color3: any = {
    h: 100,
    s: 50,
    b: 50,
  };
  logout() {
    this.authServ.logout();
  }
  openPosts() {
    this.router.navigateByUrl('home/post-list');
    console.log(this.encrypted.getUserData().subscribe({
      next: (data) => {
        console.log('Decrypted data:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    }
    ))
  }
}
