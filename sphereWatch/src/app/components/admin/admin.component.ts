import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Permission } from 'src/app/models/permission';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { PermissionService } from 'src/app/services/permission.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  UsersList:User[] = [];
  UserPermissions!:Permission;
  showWindow = false;
  manageUsers = false;
  managePermissions = false;
  manageGenres = false;
  
  constructor(
    private AdminService: AdminService,
    private router: Router,
    private PermissionService: PermissionService,
  ) { }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];
      if (this.UserPermissions.is_admin) {
        console.log('Admin');
        this.showWindow = true;
      } else{
        this.router.navigate(['/home']);
      }

      if (this.UserPermissions.manage_users) {
        this.manageUsers = true;
      }

      if (this.UserPermissions.manage_permissions) {
        this.managePermissions = true;
      }

      if (this.UserPermissions.manage_genres) {
        this.manageGenres = true;
      }},
      error => {
        this.router.navigate(['/home'])
      });

    this.AdminService.getUserList().subscribe(result => {
      this.UsersList = result['users'];
    })
  }

  onDelete(userId){
    
    this.AdminService.deleteUser(userId).subscribe(result => {
      this.AdminService.getUserList().subscribe(result => {
        this.UsersList = result['users'];
      });
    })
  }

}
