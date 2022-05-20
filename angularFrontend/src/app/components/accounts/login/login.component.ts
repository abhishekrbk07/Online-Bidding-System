import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/loginservices/login.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/authservice/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loggedIn: boolean = false;
  username: any
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: LoginService,
    private route: ActivatedRoute,
    private auth: AuthService,private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
 
    this.username = this.route.snapshot.params['username'];
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  userlogin() {
    this.loginservice.postlogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.loginForm.reset();
        this.loggedIn = true;
        this.router.navigate(['home']);
        sessionStorage.setItem('authUser', JSON.stringify(res));
       
      },
      error: () => {
        alert('Something went wrong!');
      },
    });
  }
  
  }

