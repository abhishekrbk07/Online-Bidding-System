import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/signupservices/signup.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private signupservice: SignupService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      username: [''],
      password: [''],
    });
  }
//signup post form
  signUp() {
    this.signupservice.postSignUp(this.signupForm.value).subscribe({
      next: (res) => {
       
        this.signupForm.reset();
  
      },
      error: () => {
        alert('Signup Successfully');
        this.router.navigate(['login']);
      },
    });
  }
}
