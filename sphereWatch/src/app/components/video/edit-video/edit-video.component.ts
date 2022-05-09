import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../../models/video';
import { User } from '../../../models/user';
import { Genre } from 'src/app/models/genre';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { VideoService } from '../../../services/video.service';
import { GenreService } from 'src/app/services/genre.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {

  editVideoForm!: FormGroup;
  userId!: number;
  videoId!: number;
  video: Video = new Video();
  GenreList: Genre[] = [];
  currentUser: User = new User();
  UserPermissions!: Permission;
  loading = false;
  submitted = false;
  error: any;
  isLoaded:boolean = false;
  showWindow: boolean = false;
  allowDelete: boolean = false;

  constructor(
    private VideoService: VideoService,
    private GenreService: GenreService,
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    this.editVideoForm = this.formBuilder.group({
      video_id: ['', Validators.required],
      title: ['', Validators.required],
      video_url: ['', Validators.required],
      description: ['', Validators.required],
      //thumbnail: ['', Validators.required],
      creator_id: this.userId,
      genre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.video_edit) {
        this.router.navigate(['/video/userVideos']);
      }
      if (this.UserPermissions.video_delete) {
        this.allowDelete = true;
      }} , error => {
        this.router.navigate(['/home']);
      });

    this.videoId = Number(this.route.snapshot.paramMap.get('id'));

    this.VideoService.getVideoById(this.videoId).subscribe(response => {
      console.log(response);
      this.video = response['video'];
      this.editVideoForm = this.formBuilder.group({
        video_id: [this.video.id, Validators.required],
        title: [this.video.title, Validators.required],
        description: [this.video.description, Validators.required],
        creator_id: this.video.creator_id,
        genre: [this.video.genre, Validators.required],
      });
      this.isLoaded = true;

    });

    this.authService.profileUser().subscribe((data: any) => {
      this.currentUser = data;
      this.userId = this.currentUser.id;
      if (this.video.creator_id != this.userId) {
        this.router.navigate(['/profile']);
      } else {
        this.showWindow = true;
      }
      });

    this.GenreService.getGenresList().subscribe(result => {
        console.log(result);
        this.GenreList = result['genres'];
      });

  }

  onSubmit() {
    this.VideoService.updateVideo(this.editVideoForm.value).subscribe(
      data => {
        this.router.navigate(['/viewVideo/' + this.videoId]);
      }
    );
  }

  onDelete() {
    this.VideoService.deleteVideo(this.videoId).subscribe(
      data => {
        this.router.navigate(['/video/userVideos']);
      }
    );
  }

  onGenreChange(event) {
    this.editVideoForm.patchValue({
      genre: event.target.value
    });
    
  }

}
