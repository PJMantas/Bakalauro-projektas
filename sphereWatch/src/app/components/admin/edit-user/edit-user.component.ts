import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { Permission } from 'src/app/models/permission';
import { AdminService } from '../../../services/admin.service';
import { PermissionService } from 'src/app/services/permission.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  userId!: number;
  user: User = new User();
  UserPermissions!: Permission;
  manageUsers = false;
  loading = false;
  submitted = false;
  error: any;

  constructor(
    private AdminService: AdminService,
    private UserService: UserService,
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.editForm = this.formBuilder.group(
      {
        username: [''],
        email: [''],
        first_name: [''],
        last_name: [''],
        age: [''],
        country: [''],
        city: [''],
        group_id: ['']
      });
  
  }

  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    
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

    this.UserService.getUser(this.userId).subscribe(response => {
      this.user = response['user'];
      this.editForm = this.formBuilder.group({
        user_id: [this.userId, Validators.required],
        username: this.user.username,
        email: this.user.email,
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        age: this.user.age,
        country: this.user.country,
        city: this.user.city,
        group_id: this.user.group_id
    });
  })
  }

  get f() { return this.editForm.controls; }

  onSubmit(){
    this.AdminService.adminUpdateUser(this.editForm.value).subscribe(response => {
      
        this.router.navigate(['/admin']);
    
      console.log(response);
    })
    
  }

}


