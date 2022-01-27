import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { SignInFormDTO } from '../../components/login/models/signInFormDTO';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';
import { CartService } from './cart.service';
import * as moment from 'moment';
import { Jwt } from '../models/jwt.model';
import { stringify } from 'querystring';
import { SignInResponse } from '../models/signInResponse.model';
import { AuthenticationInfo } from '../models/authenticationInfo.dto';
import { GoogleSignInDTO } from 'src/app/components/login/models/googleSignInDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
    private cartService: CartService
  ) {}

  public login(signInForm: SignInFormDTO): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        `${environment.baseUrl}/auth/authenticate`,
        signInForm
      )
      .pipe(
        take(1),
        tap((response: SignInResponse) => {
          if (response.jwt !== undefined) {
            console.log(response);
            this.setSession(response.jwt);
            this.notificationService.success('Você está autenticado!');
            this.router.navigate(['/']);
          } else {
            this.notificationService.alert(
              'Nome de usuário ou senha inválidos'
            );
          }
        }),
        distinctUntilChanged(),
        catchError((err) => {
          this.notificationService.error('Erro ao autenticar usuário.');
          throw new Error(err);
        })
      );
  }

  public loginWithGoogle(
    googleSignIn: GoogleSignInDTO
  ): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        `${environment.baseUrl}/auth/authenticate-with-google`,
        googleSignIn
      )
      .pipe(
        take(1),
        tap((response: SignInResponse) => {
          if (response.jwt !== undefined) {
            console.log(response);
            this.setSession(response.jwt);
            this.notificationService.success('Você está autenticado!');
            this.router.navigate(['/']);
          } else {
            this.notificationService.alert(
              'Nome de usuário ou senha inválidos'
            );
          }
        }),
        distinctUntilChanged(),
        catchError((err) => {
          this.notificationService.error('Erro ao autenticar usuário.');
          throw new Error(err);
        })
      );
  }

  public getAuthenticationInfo(
    username: string
  ): Observable<AuthenticationInfo> {
    return this.http.get<AuthenticationInfo>(
      `${environment.baseUrl}/clients/user/${username}`
    );
  }

  private setSession(jwt: Jwt) {
    const expiresAt = moment().add(jwt.expiresIn, 'second');
    const username = jwt.username;
    console.log(jwt.userId);
    this.cartService.getCartByClient(jwt.userId).subscribe((cart) => {
      localStorage.setItem('cart_id', `${cart.id}`);
    });
    localStorage.setItem('user_id', `${jwt.userId}`);
    localStorage.setItem('id_token', jwt.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', username);
  }

  public setProfileAvatar(avatar: string) {
    localStorage.setItem('user_avatar', avatar);
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('cart_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_avatar');
    this.notificationService.alert('Você está desconectado!');
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    return (
      moment().isBefore(this.getExpiration()) &&
      localStorage.getItem('expires_at') !== null
    );
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getUsername() {
    return localStorage.getItem('username');
  }

  public getCartId() {
    return localStorage.getItem('cart_id');
  }

  public getUserId() {
    return localStorage.getItem('user_id');
  }

  public getAvatar() {
    return localStorage.getItem('user_avatar');
  }
}
