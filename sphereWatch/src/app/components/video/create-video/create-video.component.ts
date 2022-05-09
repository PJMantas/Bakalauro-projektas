import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../../models/video';
import { User } from '../../../models/user';
import { Permission } from 'src/app/models/permission';
import { VideoService } from '../../../services/video.service';
import { PermissionService } from 'src/app/services/permission.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Genre } from '../../../models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {

  addVideoForm!: FormGroup;
  userId!: number;
  video: Video = new Video();
  currentUser: User = new User();
  GenreList: Genre[] = [];
  loading = false;
  submitted = false;
  error: any;
  isLoaded: boolean = false;
  file: any;
  thumbnail: any;
  UserPermissions!: Permission;
  showWindow = false;

  constructor(
    private VideoService: VideoService,
    private GenreService: GenreService,
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.addVideoForm = this.formBuilder.group({
      title: ['', Validators.required],
      video_url: [null, Validators.required],
      description: ['', Validators.required],
      thumbnail_url: [''],
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.video_create) {
        this.router.navigate(['/video/userVideos']);
      } else {
        this.showWindow = true;
      }

    }, error => {
      this.router.navigate(['/home']);
    });

    this.GenreService.getGenresList().subscribe(result => {
      console.log(result);
      this.GenreList = result['genres'];
    });
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      this.file = event.target.files[0];

    }
  }

  onThumbnailChange(event) {

    if (event.target.files.length > 0) {
      this.thumbnail = event.target.files[0];

    }
  }

  onGenreChange(event) {
    this.addVideoForm.patchValue({
      genre: event.target.value
    });

  }


  onSubmit() {
    this.submitted = true;

    if (this.addVideoForm.invalid) {
      console.log("IVALID FORMAAA");
      return;
    }

    const formData = new FormData();

    formData.append("video_url", this.file);
    formData.append("title", this.addVideoForm.controls['title'].value);
    formData.append("description", this.addVideoForm.controls['description'].value);
    formData.append("genre", this.addVideoForm.controls['genre'].value);

    if (this.thumbnail) {
      formData.append("thumbnail_url", this.thumbnail);
    }

    this.loading = true;

    this.VideoService.createVideo(formData)
      .subscribe(
        data => {
          this.router.navigate(['/videoHome']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
