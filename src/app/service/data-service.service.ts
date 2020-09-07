import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from '../components/model/Message';
import {LoginModel} from '../components/model/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private allCurrentMails = new Subject<LoginModel>();
  changeMailObserver$ = this.allCurrentMails.asObservable();

  constructor() {
  }

  changeMail(messages: LoginModel): void {
    this.allCurrentMails.next(messages);
  }
}
