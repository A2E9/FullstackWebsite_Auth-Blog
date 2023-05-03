import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthGuard } from './services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './posts/post-list/post-list.component';

import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'primeng/colorpicker';
import {InputSwitchModule} from 'primeng/inputswitch';
import {MenubarModule} from 'primeng/menubar';
import {PasswordModule} from 'primeng/password';
import { DividerModule } from "primeng/divider";
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {ButtonModule} from 'primeng/button';
import {BlockUIModule} from 'primeng/blockui';
import {TableModule} from 'primeng/table';

import {CardModule} from 'primeng/card';
import { MenuBarComponent } from './components/objects/menu-bar/menu-bar.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

import { IndexedDbService } from './services/indexed-db.service';

// export function initDataStorageServiceFactory() {
//   return async (): Promise<IndexedDbService> => {
//     return await IndexedDbService.initService();
//   };
// }





const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home/post-list/create',
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home/post-list',
    component: PostListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    PostCreateComponent,
    PostListComponent,
    MenuBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    InputSwitchModule,
    MenubarModule,
    PasswordModule,
    DividerModule,
    VirtualScrollerModule,
    CardModule,
    ButtonModule,
    BlockUIModule,
    TableModule,
    

  ],
  providers: [AuthGuard
  //   ,{
  //   provide: IndexedDbService,
  //   useFactory: initDataStorageServiceFactory(),
  //   deps:[]
  // }
],
  bootstrap: [AppComponent],
})
export class AppModule {}
