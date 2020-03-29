import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {CredentialsType} from '../../types/credentials.type';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected loginForm: FormGroup;
  protected notifier: NotifierService;

  constructor(
      notifierService: NotifierService,
      private loginService: LoginService,
      private fb: FormBuilder,
      private _router: Router,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }


  onSubmit() {
    const credentials = <CredentialsType>{
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.loginService.authenticateUser(credentials);
    this._router.navigate(['/home']);
    this.notifier.notify('success', 'Login Successfully');
  }

}
