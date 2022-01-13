import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewAddressComponent>,
              private authenticationSerevice: AuthenticationService,
              private addressService: AddressService,
              private formBuider: FormBuilder,
              private notificationService: NotificationService,
              private router: Router
              ) { }

  ngOnInit(): void {
  }

  postAddress() {
    this.addressService.createAddress({
      city: this.addressFormGroup.get('city').value,
      state: this.addressFormGroup.get('state').value,
      district: this.addressFormGroup.get('district').value,
      street: this.addressFormGroup.get('street').value,
      additionalInfo: this.addressFormGroup.get('additional').value,
      postalCode: this.addressFormGroup.get('postalCode').value,
      cep: this.addressFormGroup.get('cep').value,
      number: this.addressFormGroup.get('number').value,
      clientId: parseInt(this.authenticationSerevice.getUserId())
    })
    this.notificationService.success("Endereço adicionado com sucesso!")
    this.closeDialog();    
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
  addressFormGroup = this.formBuider.group({
    cep: '',
    city: '',
    state: '',
    district: '',
    street: '',
    additional: '',
    postalCode: '',
    number: ''
  })
}
