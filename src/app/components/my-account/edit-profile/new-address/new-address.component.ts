import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NewAddressComponent>,
              private authenticationSerevice: AuthenticationService,
              private addressService: AddressService,
              private formBuider: FormBuilder
              ) { }

  ngOnInit(): void {
  }

  postAddress() {
    // TODO 
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
    addicional: '',
    postalCode: '',
    number: ''
  })
}
