import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { SignInFormDTO } from './models/signInFormDTO';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { GoogleSignInDTO } from './models/googleSignInDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      usernameCtrl: [''],
      passwordCtrl: [''],
    });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  public login(): void {
    const signInForm: SignInFormDTO = {
      username: this.loginFormGroup.get('usernameCtrl').value,
      password: this.loginFormGroup.get('passwordCtrl').value,
    };

    if (signInForm.username !== '' && signInForm.password !== '') {
      this.authenticationService
        .getAuthenticationInfo(signInForm.username)
        .subscribe((r) => {
          if (r !== null && r.banned) {
            console.log(new Date(r.nextAllowedAccess))
            this.notificationService.error(
              `Tentativas bloqueadas, espere ${
                Math.trunc((new Date(r.nextAllowedAccess).getTime() - Date.now()) / 1000)
              } segundos para tentar novamente.`
            );
          } else {
            this.authenticationService.login(signInForm).subscribe();
          } 
        });
    }
  }

  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      if (this.user.email !== '' && this.user.id !== '') {
        const googleSignIn: GoogleSignInDTO = {
          email: this.user.email,
          id: this.user.id,
          name: this.user.name,
        };

        this.authenticationService.loginWithGoogle(googleSignIn).subscribe();

        this.authenticationService.setProfileAvatar(this.user.photoUrl);
      }
    });
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
