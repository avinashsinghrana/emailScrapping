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
  messages = [];
  subject = [];
  res$: Observable<any>;
  constructor(private dataService: DataServiceService,
              ) {

  }

  ngOnInit(): void {
    console.log(this.messages);
    this.dataService.changeMailObserver$.subscribe(response => {
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
    this.res$ = mailService('http://localhost:8080/e/req_id', login);
    this.res$.subscribe(res => {
        const currentMessage: Message[] = res.object;
        this.assign(currentMessage);
      });
  }

  assign(messages): void {
    this.subject = [];
    this.messages = messages;
    messages.forEach(messageData => {
      this.subject.push(messageData.subject);
    });
  }
}
