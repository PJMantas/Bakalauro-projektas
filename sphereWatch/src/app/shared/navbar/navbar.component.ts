import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission';
import { TokenService } from '../token.service';
import { AuthStateService } from '../auth-state.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isSignedIn!: boolean;
  profile_pic!: string;
  userName!: string;
  isCollapsed = false;
  isAdmin: boolean = false;

  constructor(
    private auth: AuthStateService,
    private PermissionService: PermissionService,
    public router: Router,
    public token: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if (this.isSignedIn) {
        this.authService.profileUser().subscribe((data: any) => {
          this.profile_pic = data.avatar_url;
          this.userName = data.first_name;
          this.PermissionService.getAuthUserPermissions().subscribe(result => {
            this.isAdmin = result['permissions'].is_admin;
          });
        });
      }
    });



  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
