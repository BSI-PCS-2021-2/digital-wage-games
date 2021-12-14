import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"
import { NotificationService } from '../../../../app/shared/services/notification.service';
import { PasswordRecoveryDTO } from '../models/passwordRecoveryDTO';
import { PasswordRecoveryFormDTO } from '../models/passwordRecoveryFormDTO';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router) { }

  recoverPassword(passwordRecoveryForm: PasswordRecoveryFormDTO): Observable<number[]> {

    return this.http.patch<number[]>(`${environment.baseUrl}/clients/user/${passwordRecoveryForm.username}`, passwordRecoveryForm)
      .pipe(
        take(1),
        tap((index: number[]) => {
          if (index[0] === -1) {
            this.notificationService.alert('O nome de usuário não existe!');
          } else if (index[0] === -2) {
            this.notificationService.alert('Código de verificação inválido!');
          } else {
            this.notificationService.success('Nova senha cadastrada!');
            this.router.navigate(['/login']);
          }

        }),
        distinctUntilChanged(),
        catchError(err => {
          this.notificationService.error('Erro ao atualizar senha.');
          throw new Error(err);
        })
      );

  }

  sendConfirmationCode(passwordRecovery: PasswordRecoveryDTO): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}/clients/password-recovery-codes`, passwordRecovery)
    .pipe(
      take(1),
      tap((success: boolean) => {
        if (success) {
          this.notificationService.success('Código enviado!');
        } else {
          this.notificationService.alert('O usuário não existe!');
        }
      }),
      distinctUntilChanged(),
      catchError(err => {
        this.notificationService.error('Erro ao enviar email de confirmação');
        throw new Error(err);
      })
    );
  }
}
