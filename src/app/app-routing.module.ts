import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MailListComponent} from './components/mail-list/mail-list.component';
import {LoginpageComponent} from './components/loginpage/loginpage.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'mail',   pathMatch: 'full'
      },
      {
        path: 'mail' , component: MailListComponent,
      },

    ],
  },
  {
    path: 'auth' , component: LoginpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
