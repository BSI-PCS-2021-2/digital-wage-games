import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignInFormDTO } from '../login/models/signInFormDTO';

@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html',
  styleUrls: ['./adm-login.component.scss']
})
export class AdmLoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      usernameCtrl: [''],
      passwordCtrl: ['']
    });

  }

  public login(): void {

    const signInForm: SignInFormDTO = {
      username: this.loginFormGroup.get('usernameCtrl').value,
      password: this.loginFormGroup.get('passwordCtrl').value,
    }
  }
}
