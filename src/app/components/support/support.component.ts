import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportEmailDTO } from '../../shared/models/dto/supportEmail/supportEmailDTO';
import { AuthenticationService } from '../../shared/services/authentication.service'
import { SupportService } from '../../shared/services/support.service'

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  public supportFormGroup: FormGroup;
  public supportMessageForm: FormGroup;

  constructor(
    private supportService: SupportService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.supportFormGroup = this.formBuilder.group({
      email: "exemple@gmail.com",
      clientEmail: [''],
      message: [''],
      category: ['']
    });
  }
  enviarMensagem(): void {
    const supportForm: SupportEmailDTO = {
      email: "exemple@gmail.com",
      clientEmail: "exemple@gmail.com",
      category: this.supportFormGroup.get('category').value,
      message: this.supportFormGroup.get('message').value
    }
    this.supportService.sendSupportEmail(supportForm);
  }
}
