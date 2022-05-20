import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}
  // //get signup form data password and username
  postlogin(data: any) {
   
    return this.http.post<any>("http://localhost:8080/api/auth/signin",data);
    }

}