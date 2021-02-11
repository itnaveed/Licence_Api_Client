import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User } from 'app/_Model/user';
import { userService } from 'app/_Model/services';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient
  ) { }
  getAll() {
    debugger;
    return this.http.get<User[]>(`${environment.apiUrl}/api/users/UsersList`);
}
addUser(user: User) {
  user.IsActive = true;
  debugger;
  return this.http.post(`${environment.apiUrl}/api/Users/RegisterUser`, user);
}
assignService(user: userService) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/Users/RegisterUser`, user);
}
getDetail(id:any):Observable<any> {
  debugger;
  return this.http.get<User>(`${environment.apiUrl}/api/users/GetDetail/${id}`);
}
updateUser(user: User) {
  if(user.IsActive == true){
    user.IsActive = true;
  }
  else{
    user.IsActive = false;
  }
  debugger;
  return this.http.put(`${environment.apiUrl}/api/Users/updateUser`, user);
}

}
