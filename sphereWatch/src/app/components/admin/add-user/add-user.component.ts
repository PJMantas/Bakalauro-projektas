import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { Permission } from 'src/app/models/permission';
import { AdminService } from '../../../services/admin.service';
import { PermissionService } from 'src/app/services/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  userId!: number;
  user: User = new User();
  UserPermissions!: Permission;
  manageUsers = false;
  loading = false;
  submitted = false;
  error: any;

  constructor(
    private AdminService: AdminService,
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.addForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
        email: ['', Validators.required],
        first_name: '',
        last_name: '',
        age: '',
        country: '',
        city: '',
        group_id: ''
      });
  }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.is_admin || !this.UserPermissions.manage_users) {
        this.router.navigate(['/home']);
      } else {
        this.manageUsers = true;
      }},
      error => {
        this.router.navigate(['/home']);
    });
  }

  get f() {return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      console.log("IVALID FORMAAA");
      return;
    }

    this.loading = true;
    
    this.AdminService.addUser(this.addForm.value)
    .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/admin']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });

    
        
  }

}
