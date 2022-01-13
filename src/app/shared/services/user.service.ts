import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PutUserDTO } from '../models/dto/user/putUser.dto';
import { ChangePasswordDTO } from '../models/dto/user/changePassword.dto';
import { UserInfo } from '../models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) { }

  get(username: string) {
    return this.http.get<UserInfo>(`${environment.baseUrl}/clients/user/${username}`)
  }
  update(putUserDTO: PutUserDTO) {
    return this.http.put<void>(`${environment.baseUrl}/clients/user/infos`, putUserDTO).subscribe();
  }
  changePassword(changePasswordDTO: ChangePasswordDTO) {
    return this.http.post<boolean>(`${environment.baseUrl}/clients/change-password`, changePasswordDTO).subscribe();
  }
}
