import { Component, Injectable, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
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

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matStepperIntl: MatStepperIntl,
    private signupService: SignupService) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.email],
      usernameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
      passwordConfirmationCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      cepCtrl: [''],
      cityCtrl: [''],
      stateCtrl: [''],
      districtCtrl: [''],
      numberCtrl: [''],
      additionalInfoCtrl: [''],
      streetCtrl: ['']
    });

    this.matStepperIntl.changes.next();
  }

  confirmSignup (): void {
    const signUpForm: SignUpFormDTO = {
      email: this.firstFormGroup.get('emailCtrl').value,
      username: this.firstFormGroup.get('usernameCtrl').value,
      passwordCtrl: this.firstFormGroup.get('passwordCtrl').value,
      passwordConfirmationCtrl: this.firstFormGroup.get('passwordConfirmationCtrl').value,
      cepCtrl: this.secondFormGroup.get('cepCtrl').value,
      cityCtrl: this.secondFormGroup.get('cityCtrl').value,
      stateCtrl: this.secondFormGroup.get('stateCtrl').value,
      districtCtrl: this.secondFormGroup.get('districtCtrl').value,
      numberCtrl: this.secondFormGroup.get('numberCtrl').value,
      additionalInfoCtrl: this.secondFormGroup.get('additionalInfoCtrl').value,
      streetCtrl: this.secondFormGroup.get('streetCtrl').value,
    }

    this.signupService.signUp(signUpForm);

  }

}
