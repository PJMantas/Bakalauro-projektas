import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  UserPermissions!: Permission;
  enableButton = false;
  constructor(
    public authService: AuthService,
    private PermissionService: PermissionService,
    private router: Router,
    ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile);
    });
  }
  ngOnInit() {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (this.UserPermissions.video_create) {
        this.enableButton = true;
      } 
    });
  }
}