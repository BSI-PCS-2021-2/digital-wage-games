import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, distinctUntilChanged, Observable, take, tap } from "rxjs";
import { SignInFormDTO } from "../../components/login/models/signInFormDTO";
import { environment } from "../../../environments/environment";
import { NotificationService } from "./notification.service";
import * as moment from "moment";
import { Jwt } from "../models/jwt.model";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
    ) { }

  public login(signInForm: SignInFormDTO): Observable<Jwt> {

    return this.http.post<Jwt>(`${environment.baseUrl}/auth/authenticate`, signInForm)
      .pipe(
        take(1),
        tap((jwt: Jwt) => {
          if (jwt !== null) {
            this.setSession(jwt);
            this.notificationService.success('Você está autenticado!');
            this.router.navigate(['/']);
          } else {
            this.notificationService.alert('Nome de usuário ou senha inválidos');
          }

        }),
        distinctUntilChanged(),
        catchError(err => {
          this.notificationService.error('Erro ao autenticar usuário.');
          throw new Error(err);
        })
      );

  }

  private setSession(jwt: Jwt) {
    const expiresAt = moment().add(jwt.expiresIn,'second');
    const username = jwt.username;

    localStorage.setItem('id_token', jwt.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem("username", username);
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("username");
    this.notificationService.alert('Você está desconectado!');
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getUsername() {
    return localStorage.getItem('username');
  }

}
