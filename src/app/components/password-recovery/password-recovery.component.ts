import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidatorService } from 'src/app/shared/validators/passwordValidator.service';
import { PasswordRecoveryDTO } from './models/passwordRecoveryDTO';
import { PasswordRecoveryFormDTO } from './models/passwordRecoveryFormDTO';
import { PasswordRecoveryService } from './services/password-recovery.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  public confirmationFormGroup: FormGroup;
  public passwordRecoveryFormGroup: FormGroup;

  private isHuman: boolean;
  public sentCode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private passwordValidatorService: PasswordValidatorService,
    private passwordRecoveryService: PasswordRecoveryService) { }

  ngOnInit(): void {

    this.passwordRecoveryFormGroup = this.formBuilder.group({
      usernameCtrl: ['', [Validators.required]],
      passwordCtrl: ['', Validators.required],
      passwordConfirmationCtrl: ['', Validators.required]
    },
    {
      validators: [this.passwordValidatorService.passwordMatchValidator, this.passwordValidatorService.passwordStrengthValidator]
    });

    this.confirmationFormGroup = this.formBuilder.group({
      confirmationCodeCtrl: ['', [Validators.required]]
    });

  }

  public confirmPasswordRecovery (): void {
    const passwordRecoveryForm: PasswordRecoveryFormDTO = {
      username: this.passwordRecoveryFormGroup.get('usernameCtrl').value,
      password: this.passwordRecoveryFormGroup.get('passwordCtrl').value,
      code: this.confirmationFormGroup.get('confirmationCodeCtrl').value
    }

    this.passwordRecoveryService.recoverPassword(passwordRecoveryForm).subscribe();

  }

  public isFormValid (): boolean {
    return this.passwordRecoveryFormGroup.valid && this.confirmationFormGroup.valid && this.isHuman;
  }

  public resolved(captchaResponse: string) {

    if (captchaResponse === null) {
      this.isHuman = false;
      return;
    }

    this.isHuman = true;
  }

  public hasUsername(): boolean {
    return this.passwordRecoveryFormGroup.get('usernameCtrl').valid;
  }

  public sendCode(): void {

    const passwordRecovery: PasswordRecoveryDTO = {
      username: this.passwordRecoveryFormGroup.get('usernameCtrl').value
    }

    this.passwordRecoveryService.sendConfirmationCode(passwordRecovery).subscribe();
  }

}
