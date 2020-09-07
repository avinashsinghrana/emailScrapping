import {Component, OnInit} from '@angular/core';
import {Message} from '../model/Message';
import {DataServiceService} from '../../service/data-service.service';
import {LoginModel} from '../model/LoginModel';
import {mailService} from '../../service/Service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit {
  selectedMessage: Message;
  messages: Message[] = [];
  res$: Observable<any>;
  constructor(private dataService: DataServiceService,
              ) {

  }

  ngOnInit(): void {
    console.log(this.messages);
    this.dataService.changeMailObserver$.subscribe(response => {
      this.messages = [];
      const loginData = response;
      console.log('mail ngcall from data source', loginData);
      this.getMails(loginData);
    });
  }

  selectMessage(i: number): void {
    this.selectedMessage = null;
    this.selectedMessage = this.messages[i];
  }

  getMails(login: LoginModel): void {
    console.log('inside mailList function', login);
    this.res$ = mailService('http://localhost:8080/e/req_id', login);
    this.res$.subscribe(res => {
        this.messages = res.object;
        console.log('messages on mail list', this.messages);
        console.log('logon Details on Mila lists', login);
      });
  }
}
