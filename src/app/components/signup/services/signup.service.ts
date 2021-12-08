import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { SignUpFormDTO } from '../models/signupformDTO';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../../app/shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  signUp(signUpForm: SignUpFormDTO): Observable<boolean> {

    return this.http.post<boolean>(`${environment.baseUrl}/clients/users`, signUpForm)
      .pipe(
        take(1),
        tap((success: boolean) => {

          if (success) {
            this.notificationService.success('Cadastro concluído!');
          } else {
            this.notificationService.alert('Informações inválidas');
          }

        }),
        distinctUntilChanged(),
        catchError(err => {
          this.notificationService.error('Erro ao cadastrar usuário.');
          throw new Error(err);
        })
      );

  }
}
