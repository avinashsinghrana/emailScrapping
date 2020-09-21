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
  // emailId = 'noreplytokenid@gmail.com';
  // password = 'Noreply@123';
  emailId = 'avinashrana45@gmail.com';
  password = 'Avinash#8956';
  duration = 500;
  isLogin = false;
  type = true;
  messageType = 'Seen';

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
    login.type = this.type;
    this.dataService.changeMail(login);
    this.isLogin = true;
  }

  changeType(): void {
    this.type = !this.type;
    if (this.type){
      this.messageType = 'Seen';
    }else {
      this.messageType = 'Unseen';
    }
  }
}
