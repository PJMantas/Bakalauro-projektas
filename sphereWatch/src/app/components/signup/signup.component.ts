import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  file: any;
  submitted = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['' , Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
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

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (!this.registerForm.valid) {
      return
    }

    const formData = new FormData();
    formData.append('username', this.registerForm.controls['username'].value);
    formData.append('email', this.registerForm.controls['email'].value);
    formData.append('password', this.registerForm.controls['password'].value);
    formData.append('password_confirmation', this.registerForm.controls['password_confirmation'].value);
    if (this.file) 
    {
      formData.append('avatar_url', this.file);
    }

    this.authService.register(formData).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
        this.errors = error.error;
        console.log(this.errors.email);
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }
}