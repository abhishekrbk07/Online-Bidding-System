import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {

  constructor(private http: HttpClient) {}
  //Services for posting form of signup
  postSignUp(data: any) {
    // let backendURL7=environment.backendURL7
    return this.http.post<any>("http://localhost:8080/api/auth/signup", data);
  }

}
