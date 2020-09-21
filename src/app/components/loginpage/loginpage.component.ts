import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataServiceService} from "../../service/data-service.service";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  login: FormGroup;
  hide = false;
  submitted = false;
  email;
  password;
  urlLink = '';

  constructor(public formBuilder: FormBuilder,
              public dataService: DataServiceService) {
  }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.dataService.currentLink$.subscribe(url => {
      this.urlLink = url;
      console.log('get Data from data service', this.urlLink);
    });
  }

  Login(): any {

  }

  get f(): any {
    return this.login.controls;
  }
}
