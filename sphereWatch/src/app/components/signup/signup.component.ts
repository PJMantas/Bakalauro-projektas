import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  file: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      avatar_url: [''],
    });
  }
  ngOnInit() {}

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  }
  onSubmit() {

    const formData = new FormData();
    formData.append('username', this.registerForm.controls['username'].value);
    formData.append('email', this.registerForm.controls['email'].value);
    formData.append('password', this.registerForm.controls['password'].value);
    formData.append('password_confirmation', this.registerForm.controls['password_confirmation'].value);
    if (this.file) 
    {
      formData.append('avatar_url', this.file);
    }
    console.log(formData);

    this.authService.register(formData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }
}