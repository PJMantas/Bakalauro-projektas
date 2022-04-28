import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenreRequest } from '../../../models/genreRequest';
import { GenreRequestService } from '../../../services/genre-request.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-genre',
  templateUrl: './request-genre.component.html',
  styleUrls: ['./request-genre.component.css']
})
export class RequestGenreComponent implements OnInit {
  requestForm: FormGroup;
  submitted = false;
  loading = false;
  error: any;

  constructor(
    private GenreRequestService: GenreRequestService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { 
    this.requestForm = this.formBuilder.group(
      {
        title: [''],
        description: [''],
      });
  }

  ngOnInit(): void {
  }

  get f() { return this.requestForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    }
    this.loading = true;
    this.GenreRequestService.addGenreRequest(this.requestForm.value).subscribe(
      data => {
        this.router.navigate(['/user-genre-requests']);
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

}
