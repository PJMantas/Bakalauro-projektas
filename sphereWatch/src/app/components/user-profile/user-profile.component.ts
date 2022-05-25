import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/shared/token.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { environment } from 'src/environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  UserPermissions!: Permission;
  enableButton = false;
  isSignedIn: boolean = false;
  enviroment = environment.files;
  closeResult = '';
  constructor(
    public authService: AuthService,
    private PermissionService: PermissionService,
    private token: TokenService,
    private AuthStateService: AuthStateService,
    private UserService: UserService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.AuthStateService.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if (!this.isSignedIn) {
        this.router.navigate(['/home']);
      }
    });
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
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
  onDeleteProfile() {
    this.UserService.deleteProfile().subscribe(result => {
      //console.log(result);
      this.AuthStateService.setAuthState(false);
      this.token.removeToken();
      this.modalService.dismissAll();
      this.router.navigate(['/home']);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  
}