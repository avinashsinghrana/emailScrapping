import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../model/LoginModel';
import {DataServiceService} from '../../service/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hide = true;
  emailId: string = 'noreplytokenid@gmail.com';
  password: string = 'Noreply@123';
  duration: number = 500;
  isLogin = false;

  constructor(
    private dataService: DataServiceService) {
  }

  ngOnInit(): void {
  }

  mailCall(): void {
    const login: LoginModel = new LoginModel();
    login.user = this.emailId;
    login.password = this.password;
    login.hours = this.duration;
    console.log('login details on dashboard', login);
    sessionStorage.setItem('login_D', JSON.stringify(login));
    console.log('session data', sessionStorage.getItem('login_D'));
    this.dataService.changeMail(login);
    this.isLogin = true;
  }
}
