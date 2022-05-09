import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreRequest } from '../../../models/genreRequest';
import { GenreRequestService } from '../../../services/genre-request.service';
import { AuthStateService } from '../../../shared/auth-state.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-genre-requests',
  templateUrl: './user-genre-requests.component.html',
  styleUrls: ['./user-genre-requests.component.css']
})
export class UserGenreRequestsComponent implements OnInit {

  UserGenreRequests: GenreRequest[] = [];
  isSignedIn = false;

  constructor(
    private GenreRequestService: GenreRequestService,
    private AuthStateService: AuthStateService,
    private router: Router,

  ) { 
    this.AuthStateService.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if (!this.isSignedIn) {
        this.router.navigate(['/home']);
      }});
  }


  ngOnInit(): void { 
    this.GenreRequestService.getUserGenreRequestsList().subscribe(result => {
      //console.log(JSON.stringify(result));
      this.UserGenreRequests = result['genreRequests'];
    })
  }

  onDelete(genreRequestId){
    this.GenreRequestService.deleteGenreRequest(genreRequestId).subscribe(result => {
      console.log(result);
      window.location.reload();
    })
  }

}
