import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreRequest } from '../../../models/genreRequest';
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

  constructor(
    private GenreRequestService: GenreRequestService,
    private GenreService: GenreService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
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
