import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User} from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editUserForm: FormGroup;
  userId!: number;
  user!: User;
  profileImage!: string;
  loading = false;
  submitted = false;
  error: any;
  file: any;

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { 
    this.editUserForm = this.formBuilder.group(
      {
        user_id: [''],
        username: [''],
        email: [''],
        first_name: [''],
        last_name: [''],
        age: [''],
        country: [''],
        city: [''],
        avatar_url: [''],
        group_id: [''],

      });
  }

  get f() { return this.editUserForm.controls; }

  ngOnInit(): void {
    console.log("pries error");
    this.authService.profileUser().subscribe((data: any) => {
      this.user = data;
      this.profileImage = this.user.avatar_url;
      this.editUserForm = this.formBuilder.group({
        user_id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        age: this.user.age,
        country: this.user.country,
        city: this.user.city,
        group_id: this.user.group_id,
        avatar_url: [''],
      });
    });
    
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editUserForm.invalid) {
      return;
    }

    const formData = new FormData();
    
    formData.append("user_id", this.editUserForm.controls['user_id'].value);
    formData.append("username", this.editUserForm.controls['username'].value);
    formData.append("email", this.editUserForm.controls['email'].value);
    formData.append("first_name", this.editUserForm.controls['first_name'].value);
    formData.append("last_name", this.editUserForm.controls['last_name'].value);
    formData.append("age", this.editUserForm.controls['age'].value);
    formData.append("country", this.editUserForm.controls['country'].value);
    formData.append("city", this.editUserForm.controls['city'].value);
    formData.append("group_id", this.editUserForm.controls['group_id'].value);

    if (this.file) {
      formData.append("avatar_url", this.file);
    }
    console.log("viska ikiso");
    this.loading = true;
    this.UserService.updateProfile(formData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/profile']);
        
      },
      error => {
        console.log(this.error);
        this.error = error;
        this.loading = false;
      });
  }

}
