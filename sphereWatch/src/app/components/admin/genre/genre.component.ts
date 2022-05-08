import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../models/genre';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
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
  UserPermissions!: Permission;
  editGenreForm: FormGroup;
  clickedIndex!: number;
  showCreate = false;
  showEdit = false;
  showWindow = false;

  constructor(
    private GenreService: GenreService,
    private PermissionService: PermissionService,
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
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.is_admin || !this.UserPermissions.manage_genres) {
        this.router.navigate(['/home']);
      } else {
        this.showWindow = true;
      }},
      error => {
        this.router.navigate(['/home']);
    });


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
      this.GenreList = this.GenreList.filter(genre => genre.id !== genreId);
      
    });
  }

  createGenre(genreName) {
    this.GenreService.createGenre(genreName).subscribe(result => {
      this.GenreService.getGenresList().subscribe(result => {
        this.GenreList = result['genres'];
      });
      this.showCreate = false;
    });
  }

  updateGenre(genreId, genreName) {
    this.editGenreForm.patchValue({
      id: genreId,
      name: genreName
    });
    this.GenreService.updateGenre(this.editGenreForm.value).subscribe(result => {
      this.showEdit = false;
      this.GenreService.getGenresList().subscribe(result => {
        this.GenreList = result['genres'];
      });  
    });
  }

  cancelEdit() {
    this.showEdit = false;
  }

  cancelCreate() {
    this.showCreate = false;
  }

}
