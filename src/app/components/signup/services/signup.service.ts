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

  signUp(signUpForm: SignUpFormDTO): Observable<number[]> {

    return this.http.post<number[]>(`${environment.baseUrl}/clients/users`, signUpForm)
      .pipe(
        take(1),
        tap((index: number[]) => {
          if (index.length > 0) {
            this.notificationService.success('Cadastro concluído!');
          } else {
            this.notificationService.alert('O nome de usuário já existe!');
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
