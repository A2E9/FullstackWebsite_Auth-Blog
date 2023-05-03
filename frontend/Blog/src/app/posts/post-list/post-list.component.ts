import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post.service';
import { Post } from 'src/app/Post';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IndexedDbService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  blockedPanel: boolean = false;
  switchView: boolean = false;
  pnl: any;
  items!: MenuItem[];
  constructor(
    private blogService: BlogPostService,
    private localStore: LocalService,
    private authServ: AuthService,
    private router: Router,
    private indexDB: IndexedDbService
  ) {
    this.getAllValues().finally(() => {
      if (this.posts.length === 0)
        this.blogService.getPosts().subscribe(() => {});
    });
  }
  async getAllValues() {
    const values = await this.indexDB.getAllData();

    values.forEach((e) => {
      this.posts.push(e.value);
    });
    console.log('values: ', values);
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Back',
        icon: 'pi pi-fw pi-arrow-circle-left',
        command: (event) => {
          this.router.navigateByUrl('home');
        },
      },
      // {
      //   label: 'Posts',
      //   icon: 'pi pi-fw pi-list',
      //   command: (event) => {
      //     this.openPosts();
      //   },
      // },
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
        label: 'Post',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            command: (event) => {
              this.router.navigateByUrl('home/post-list/create');
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-times',
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
        ],
      },
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
  logout() {
    this.authServ.logout();
  }

  // this.blogService.getPosts()
  // .subscribe((data: Post[]) => {
  //   data.forEach((user) => {
  //     user.date = moment(user.date).format('DD.MM.YYYY');
  //   });
  // this.blogService.getPosts()
  // .subscribe((data: Post[]) => {})
}
