import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Services, userService } from 'app/_Model/services';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private http: HttpClient
  ) { }
  getAll() {
    debugger;
    return this.http.get<Services[]>(`${environment.apiUrl}/api/services/ServicesList`);
}
addService(service: any) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/services/AddService`, service);
}
updateService(service: Services) {
  debugger;
  return this.http.put(`${environment.apiUrl}/api/services/updateService`, service);
}

userServices(ID:any){
  return this.http.get<userService[]>(`${environment.apiUrl}/api/services/userServices/${ID}`);
}
notAssign(ID:any){
  return this.http.get<Services[]>(`${environment.apiUrl}/api/services/notAssignService/${ID}`);
}
removeAuthorize(ID:any){
  debugger
  return this.http.delete(`${environment.apiUrl}/api/authorize/removeAuthorize/${ID}`);
           
}
assignServices(service: any) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/authorize/allowservice`, service);
}

}
