import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, distinctUntilChanged, Observable, take, tap } from "rxjs";
import { SignInFormDTO } from "../../components/login/models/signInFormDTO";
import { environment } from "../../../environments/environment";
import { NotificationService } from "./notification.service";
import { CartService } from "./cart.service";
import * as moment from "moment";
import { Jwt } from "../models/jwt.model";
import { stringify } from "querystring";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
    private cartService: CartService
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
    jwt.expiresIn = 3600;
    const expiresAt = moment().add(jwt.expiresIn,'second');
    const username = jwt.username;
    this.cartService.getCartByClient(jwt.userId).subscribe((cart) => {
      localStorage.setItem("cart_id", `${cart.id}`);
    });
    localStorage.setItem("user_id", `${jwt.userId}`);
    localStorage.setItem('id_token', jwt.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem("username", username);

  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("username");
    localStorage.removeItem("cart_id");
    localStorage.removeItem("user_id");
    this.notificationService.alert('Você está desconectado!');
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration()) && localStorage.getItem("expires_at") !== null;
  }

  public isLoggedOut(): boolean {
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

  public getCartId() {
    return localStorage.getItem('cart_id');
  }

  public getUserId() {
    return localStorage.getItem('user_id');
  }

}
