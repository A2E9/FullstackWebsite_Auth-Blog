import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items!: MenuItem[];

  constructor(private authServ: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.items = [
      // {
      //   label: 'Back',
      //   icon: 'pi pi-fw pi-arrow-circle-left',
      //   command: (event) => {
      //     this.router.navigateByUrl('home');
      //   },
      // },
      {
        label: 'Posts',
        icon: 'pi pi-fw pi-list',
        command: (event) => {
          this.openPosts();
        },
      },
      // {
      //   label: 'Post',
      //   icon: 'pi pi-fw pi-file',
      //   items: [
      //     {
      //       label: 'New',
      //       icon: 'pi pi-fw pi-plus',
      //       items: [
      //         {
      //           label: 'Bookmark',
      //           icon: 'pi pi-fw pi-bookmark',
      //         },
      //         {
      //           label: 'Video',
      //           icon: 'pi pi-fw pi-video',
      //         },
      //       ],
      //     },
      //     {
      //       label: 'Delete',
      //       icon: 'pi pi-fw pi-trash',
      //     },
      //     {
      //       separator: true,
      //     },
      //     {
      //       label: 'Export',
      //       icon: 'pi pi-fw pi-external-link',
      //     },
      //   ],
      // },
      // {
      //   label: 'Edit',
      //   icon: 'pi pi-fw pi-pencil',
      //   items: [
      //     {
      //       label: 'Left',
      //       icon: 'pi pi-fw pi-align-left',
      //     },
      //     {
      //       label: 'Right',
      //       icon: 'pi pi-fw pi-align-right',
      //     },
      //     {
      //       label: 'Center',
      //       icon: 'pi pi-fw pi-align-center',
      //     },
      //     {
      //       label: 'Justify',
      //       icon: 'pi pi-fw pi-align-justify',
      //     },
      //   ],
      // },
      {
        label: 'User',
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
            label: 'Show all',
            icon: 'pi pi-fw pi-users',
          },
        ],
      },
      // {
      //   label: 'Search',
      //   icon: 'pi pi-fw pi-users',
      //   items: [
      //     {
      //       label: 'Filter',
      //       icon: 'pi pi-fw pi-filter',
      //       items: [
      //         {
      //           label: 'Print',
      //           icon: 'pi pi-fw pi-print',
      //         },
      //       ],
      //     },
      //     {
      //       icon: 'pi pi-fw pi-bars',
      //       label: 'List',
      //     },
      //   ],
      // },
      // {
      //   label: 'Events',
      //   icon: 'pi pi-fw pi-calendar',
      //   items: [
      //     {
      //       label: 'Edit',
      //       icon: 'pi pi-fw pi-pencil',
      //       items: [
      //         {
      //           label: 'Save',
      //           icon: 'pi pi-fw pi-calendar-plus',
      //         },
      //         {
      //           label: 'Delete',
      //           icon: 'pi pi-fw pi-calendar-minus',
      //         },
      //       ],
      //     },
      //     {
      //       label: 'Archieve',
      //       icon: 'pi pi-fw pi-calendar-times',
      //       items: [
      //         {
      //           label: 'Remove',
      //           icon: 'pi pi-fw pi-calendar-minus',
      //         },
      //       ],
      //     },
      //   ],
      // },
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
  }
}
