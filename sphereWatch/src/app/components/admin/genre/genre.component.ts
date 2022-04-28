import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  GenreList: Genre[] = [];
  editGenreForm: FormGroup;
  clickedIndex!: number;
  showCreate = false;
  showEdit = false;

  constructor(
    private GenreService: GenreService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { 
    this.editGenreForm = this.formBuilder.group({
      id: [''],
      name: ['']
    });
  }

  ngOnInit(): void {
    this.GenreService.getGenresList().subscribe(result => {
      console.log(result);
      this.GenreList = result['genres'];
    });
    
  }

  onCreate() {
    this.showCreate = true;
  }

  onEdit() {
    this.showEdit = true;
  }

  onDelete(genreId) {
    this.GenreService.deleteGenre(genreId).subscribe(result => {
      console.log(result);
      window.location.reload();
    });
  }

  createGenre(genreName) {
    this.GenreService.createGenre(genreName).subscribe(result => {
      console.log(result);
      window.location.reload();
    });
  }

  updateGenre(genreId, genreName) {
    this.editGenreForm.patchValue({
      id: genreId,
      name: genreName
    });
    this.GenreService.updateGenre(this.editGenreForm.value).subscribe(result => {
      console.log(result);
      window.location.reload();
    });
  }

  cancelEdit() {
    this.showEdit = false;
  }

  cancelCreate() {
    this.showCreate = false;
  }

}
