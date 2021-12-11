import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { SignupService } from './services/signup.service';
import { SignUpFormDTO } from './models/signupformDTO';

@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = '(OPCIONAL)';
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
    {provide: MatStepperIntl, useClass: StepperIntl}
  ],
})
export class SignupComponent implements OnInit {

  public accountFormGroup: FormGroup;
  public personalFormGroup: FormGroup;

  private isHuman: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matStepperIntl: MatStepperIntl,
    private signupService: SignupService) { }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      usernameCtrl: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(5),
        Validators.maxLength(30)
      ]],
      passwordCtrl: ['', Validators.required],
      passwordConfirmationCtrl: ['', Validators.required]
    },
    {
      validators: [this.passwordMatchValidator, this.passwordStrengthValidator]
    });
    this.personalFormGroup = this.formBuilder.group({
      postalCodeCtrl: [''],
      cityCtrl: [''],
      stateCtrl: [''],
      districtCtrl: [''],
      numberCtrl: [''],
      additionalInfoCtrl: [''],
      streetCtrl: [''],
      phone1Ctrl: [''],
      phone2Ctrl: [''],
      phone3Ctrl: [''],
      secondaryEmailCtrl: ['', Validators.email],
    });

    this.matStepperIntl.changes.next();
  }

  public confirmSignup (): void {
    const signUpForm: SignUpFormDTO = {
      email: this.accountFormGroup.get('emailCtrl').value,
      username: this.accountFormGroup.get('usernameCtrl').value,
      name: null,
      password: this.accountFormGroup.get('passwordCtrl').value,
      postalCode: this.personalFormGroup.get('postalCodeCtrl').value,
      city: this.personalFormGroup.get('cityCtrl').value,
      state: this.personalFormGroup.get('stateCtrl').value,
      district: this.personalFormGroup.get('districtCtrl').value,
      number: this.personalFormGroup.get('numberCtrl').value,
      additionalInfo: this.personalFormGroup.get('additionalInfoCtrl').value,
      street: this.personalFormGroup.get('streetCtrl').value,
      phone1: this.personalFormGroup.get('phone1Ctrl').value,
      phone2: this.personalFormGroup.get('phone2Ctrl').value,
      phone3: this.personalFormGroup.get('phone3Ctrl').value,
      secondaryEmail: this.personalFormGroup.get('secondaryEmailCtrl').value,
    }

    this.signupService.signUp(signUpForm).subscribe();

  }

  public isFormValid (): boolean {
    return this.accountFormGroup.valid && this.personalFormGroup.valid && this.isHuman;
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: any } {
    const password = form.controls['passwordCtrl'].value;
    const passwordConfirmation = form.controls['passwordConfirmationCtrl'].value;

    if (!password || !passwordConfirmation) {
       return null;
    } else if (password !== passwordConfirmation) {
      form.controls['passwordCtrl'].setErrors({mismatch: true});
      form.controls['passwordConfirmationCtrl'].setErrors({mismatch: true});
      return {mismatch: false}
    } else if (password === passwordConfirmation) {
      form.controls['passwordCtrl'].setErrors(null);
      form.controls['passwordConfirmationCtrl'].setErrors(null);
      return null;
    }

    return null;
 }

  passwordStrengthValidator(form: FormGroup): { [key: string]: any } {
    let hasNumber = /\d/.test(form.controls['passwordCtrl'].value);
    let hasUpper = /[A-Z]/.test(form.controls['passwordCtrl'].value);
    let hasLower = /[a-z]/.test(form.controls['passwordCtrl'].value);
    let isGreaterThan8 = form.controls['passwordCtrl'].value.length >= 8;

    if (hasNumber && hasUpper && hasLower && isGreaterThan8) {
      form.controls['passwordCtrl'].setErrors(null);
      return null;
    }
    form.controls['passwordCtrl'].setErrors({strength: true});
    return { strength: true };
  }

  resolved(captchaResponse: string) {

    if (captchaResponse === null) {
      this.isHuman = false;
      return;
    }

    this.isHuman = true;
  }

}
