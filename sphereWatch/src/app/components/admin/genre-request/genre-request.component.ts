import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreRequest } from '../../../models/genreRequest';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { GenreRequestService } from '../../../services/genre-request.service';
import { GenreService } from 'src/app/services/genre.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-request',
  templateUrl: './genre-request.component.html',
  styleUrls: ['./genre-request.component.css']
})
export class GenreRequestComponent implements OnInit {
  GenreRequests: GenreRequest[] = [];
  UserPermissions!: Permission;
  showWindow = false;

  constructor(
    private GenreRequestService: GenreRequestService,
    private GenreService: GenreService,
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.is_admin) {
        this.router.navigate(['/home']);
      } else {
        this.showWindow = true;
      }},
      error => {
        this.router.navigate(['/home']);
    });

    this.GenreRequestService.getGenreRequestsList().subscribe(result => {
      //console.log(JSON.stringify(result));
      this.GenreRequests = result['genreRequests'];
    });
  }

  onDelete(genreRequestId) {
    this.GenreRequestService.deleteGenreRequest(genreRequestId).subscribe(result => {
      console.log(result);
      window.location.reload();
    });
  }
  
  onReject(genreRequestId) {
    this.GenreRequestService.rejectGenreRequest(genreRequestId).subscribe(result => {
      console.log(result);
      window.location.reload();
    });
  }

  onAccept(genreRequestId, genreName) {
    this.GenreRequestService.approveGenreRequest(genreRequestId).subscribe(result => {
      console.log(result);
    });
    this.GenreService.createGenre(genreName).subscribe(result => {
      console.log(result);
      window.location.reload();
    });
  }

}
