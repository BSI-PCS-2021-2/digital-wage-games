import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewAddressComponent } from './new-address/new-address.component';
import { MatAccordion } from '@angular/material/expansion';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { AddressDTO } from 'src/app/shared/models/dto/address.dto';
import { Address } from 'src/app/shared/models/address.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private authenticationService: AuthenticationService,
              private addressService: AddressService,
              private matDialog: MatDialog,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsername();
    this.userId = parseInt(this.authenticationService.getUserId());
    this.addressFormGroups.push(this.createAddressFormGroup());
    
    this.addressService.getAddressesByClient(this.userId).subscribe(as => {
      as.forEach(a => {
        this.addresses.push({
          id: a.id,
          postalCode: a.postalCode,
          city: a.city,
          state: a.state,
          district: a.district,
          number: a.number,
          additionalInfo: a.additionalInfo,
          street: a.street
        })
      })
    })

    this.userService.get(this.username).subscribe(u => {
      this.mainInfosFormGroup.controls['name'].setValue(u.name);
      this.mainInfosFormGroup.controls['email'].setValue(u.email)
      this.contactFormGroup.controls['tel'].setValue(u.tel);
      this.contactFormGroup.controls['phone1'].setValue(u.cel2);
      this.contactFormGroup.controls['phone2'].setValue(u.cel1);
    })
  }

  addAddress(): void {
    let dialogRef = this.matDialog.open(NewAddressComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public addressFormGroups = new FormBuilder().array([
  ])

  public removeAddress(addressId: number) {
    this.addressService.deleteAddress(this.userId, addressId);
    this.notificationService.success("Endereço removido com sucesso!");
  }

  public update() {
    this.userService.update({
      email: this.mainInfosFormGroup.controls['email'].value,
      name: this.mainInfosFormGroup.controls['name'].value,
      username: this.mainInfosFormGroup.controls['email'].value,
      secondaryEmail: '',
      id: this.userId,
      phone1: this.contactFormGroup.controls['tel'].value,
      phone2: this.contactFormGroup.controls['phone1'].value,
      phone3: this.contactFormGroup.controls['phone2'].value,
    })
  }

  public changePassword() {
    console.log('ad')
    if (this.passwordFormGroup.controls['new'].value !== this.passwordFormGroup.controls['repeat'].value) {
      this.notificationService.error("As senhas devem ser iguais.");
      return;
    }
    let result = this.userService.changePassword({
      newPass: this.passwordFormGroup.controls['new'].value,
      oldPass: this.passwordFormGroup.controls['old'].value,
      username: this.username
    }).subscribe(e => {
      e ? this.notificationService.success("Senha atualizada com sucesso!") : this.notificationService.error("Senha atual incorreta!");
    })
  }

  private createAddressFormGroup() {
    return this.formBuilder.group({
      id: new FormControl(),
      city: new FormControl(),
      district: new FormControl(),
      additionalInfo: new FormControl(),
      number: new FormControl(),
      state: new FormControl(),
      street: new FormControl(),
      postalCode: new FormControl()
    })
  }
  public addresses: Address[] = [];
  public addressFormBuilderArray = new FormBuilder().array([]);
  public mainInfosFormGroup: FormGroup = this.formBuilder.group({
    name: '',
    email: ''
  });
  public contactFormGroup: FormGroup = this.formBuilder.group({
    tel: '',
    phone1: '',
    phone2: ''
  })
  public passwordFormGroup: FormGroup = this.formBuilder.group({
    old: '',
    new: '',
    repeat: ''
  })

  username: string;
  userId: number;

}
