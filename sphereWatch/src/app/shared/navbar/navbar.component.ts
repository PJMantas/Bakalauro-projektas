import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.authService.profileUser().subscribe((data: any) => {
      this.profile_pic = data.avatar_url;
      this.userName = data.first_name;
      
    });
    
    
  }

  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }

}
