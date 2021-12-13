import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidatorService } from 'src/app/shared/validators/passwordValidator.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  public confirmationFormGroup: FormGroup;
  public passwordRecoveryFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private passwordValidatorService: PasswordValidatorService) { }

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

}
