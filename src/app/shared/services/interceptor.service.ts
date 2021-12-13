import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private authenticationService: AuthenticationService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loaderService.isLoading.next(true);

    const idToken = localStorage.getItem("id_token");

    if (idToken && this.authenticationService.isLoggedIn()) {
      const cloned = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + idToken)
      });

      return next.handle(cloned).pipe(
        finalize(() => {
          setTimeout(() => {
            this.loaderService.isLoading.next(false);
          }, 500);

        })
      );
    } else {

      if (this.authenticationService.getUsername()) {
        this.authenticationService.logout();
      }

      return next.handle(req).pipe(
        finalize(() => {
          setTimeout(() => {
            this.loaderService.isLoading.next(false);
          }, 500);

        })
      );

    }

  }

}
