import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { SignInFormDTO } from './models/signInFormDTO';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      usernameCtrl: [''],
      passwordCtrl: ['']
    });
  }

  public login(): void {

    const signInForm: SignInFormDTO = {
      username: this.loginFormGroup.get('usernameCtrl').value,
      password: this.loginFormGroup.get('passwordCtrl').value,
    }

    if (signInForm.username !== '' && signInForm.password !== '') {
      this.authenticationService.getAuthenticationInfo(signInForm.username).subscribe(r => {
        if (r !== undefined && r.banned) {
          this.notificationService.error(`Tentativas bloqueadas, espere ${(new Date(r.nextAllowedAccess).getTime() - new Date(Date.now()).getTime()) * 1000} segundos para tentar novamente.`)
          this.loginFormGroup.disable();
        } else {
          this.authenticationService.login(signInForm).subscribe((response) => {
            if (response.banned) {
              this.notificationService.error(`Tentativas bloqueadas, espere ${(new Date(r.nextAllowedAccess).getTime() - new Date(Date.now()).getTime()) * 1000} segundos para tentar novamente.`)
              this.loginFormGroup.disable();
            }
          });
        }
      })
    }
  }
}
