import {Component, OnInit} from '@angular/core';
import {Message} from '../model/Message';
import {DataServiceService} from '../../service/data-service.service';
import {LoginModel} from '../model/LoginModel';
import {mailService} from '../../service/Service';
import {Observable} from 'rxjs';
import {mailSorting} from '../../service/MailSort';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss']
})
export class MailListComponent implements OnInit {
  selectedMessage: Message;
  backupMessage: Message[];
  messages = [];
  res$: Observable<any>;
  searchTerm = '';
  selectedSubject = -1;
  status = 111;

  constructor(private dataService: DataServiceService,
  ) {
  }

  ngOnInit(): void {
    this.dataService.changeMailObserver$.subscribe(response => {
      this.status = 111;
      this.getMails(response);
    });
  }

  selectMessage(i: number): void {
    this.selectedSubject = i;
    this.selectedMessage = this.messages[i];
    this.dataService.passLink(this.selectedMessage.bodyContent);
  }

  getMails(login: LoginModel): void {
    this.res$ = mailService('http://localhost:8080/e/req_id', login);
    this.res$.subscribe(res => {
      this.status = res.statusCode;
      this.selectedSubject = -1;
      const currentMessage: Message[] = res.object;
      this.assign(currentMessage);
    });
  }

  assign(message): void {
    this.messages = message;
    this.duplicate(message);
  }

  onEnter(): void {
    this.messages = [];
    this.selectedSubject = -1;
    this.selectedMessage = undefined;
    this.messages = this.backupMessage;
    const currentMessage: Message[] = mailSorting(this.messages, this.searchTerm);
    this.assignMessageAfterSearch(currentMessage);
  }

  clearMessage(): void {
    this.searchTerm = '';
    this.messages = [];
    this.selectedSubject = -1;
    this.selectedMessage = undefined;
    this.messages = this.backupMessage;
  }

  assignMessageAfterSearch(currentMessage: Message[]): void {
    this.messages = [];
    this.messages = currentMessage;
  }

  duplicate(message: any): void {
    this.backupMessage = message;
  }

  checkSelection(i: number): any {
    if (this.selectedSubject === i) {
      return {
        'background-color': 'lightgrey',
      };
    }
  }

  sreachBlank(event): void {
    if (this.searchTerm === '') {
      this.messages = [];
      this.selectedSubject = -1;
      this.selectedMessage = undefined;
      this.messages = this.backupMessage;
    }
  }
}
