import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private matStepperIntl: MatStepperIntl,
    private signupService: SignupService) { }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      usernameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      passwordConfirmationCtrl: ['', Validators.required]
    });
    this.personalFormGroup = this.formBuilder.group({
      cepCtrl: [''],
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
      password: this.accountFormGroup.get('passwordCtrl').value,
      passwordConfirmation: this.accountFormGroup.get('passwordConfirmationCtrl').value,
      cep: this.personalFormGroup.get('cepCtrl').value,
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
    return this.accountFormGroup.valid && this.personalFormGroup.valid;
  }

}
