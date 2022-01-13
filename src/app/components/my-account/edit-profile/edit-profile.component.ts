import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewAddressComponent } from './new-address/new-address.component';
import { MatAccordion } from '@angular/material/expansion';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { AddressDTO } from 'src/app/shared/models/dto/address.dto';
import { Address } from 'src/app/shared/models/address.model';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private authenticationService: AuthenticationService,
              private addressService: AddressService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsername();
    this.userId = parseInt(this.authenticationService.getUserId());
    // this.addressService.getAddressesByClient(this.userId).subscribe(as => {
    //   as.forEach(a => {
    //     this.addresses.push({
    //       id: a.id,
    //       postalCode: a.postalCode,
    //       city: a.city,
    //       state: a.state,
    //       district: a.district,
    //       number: a.number,
    //       additionalInfo: a.additionalInfo,
    //       street: a.street
    //     })
    //   })
    // })
  }

  addAddress(): void {
    let dialogRef = this.matDialog.open(NewAddressComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public addresses: Address[] = [
    {
      id: 1,
      city: 'Rio de Janeiro',
      district: '',
      additionalInfo: '',
      number: '342',
      state: 'Rio de Janeiro',
      street: 'Avenida Getúlio Vargas',
      postalCode: '21'
    },
    {
      id: 2,
      city: 'Rio de Janeiro',
      district: '',
      additionalInfo: '',
      number: '342',
      state: 'Rio de Janeiro',
      street: 'Avenida Getúlio Vargas',
      postalCode: '21'
    },
    {
      id: 3,
      city: 'Rio de Janeiro',
      district: '',
      additionalInfo: '',
      number: '342',
      state: 'Rio de Janeiro',
      street: 'Avenida Getúlio Vargas',
      postalCode: '21'
    },
  ];
  username: string;
  userId: number;

}
