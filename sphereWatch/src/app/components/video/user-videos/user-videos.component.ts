import { Component, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { VideoService } from '../../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent implements OnInit {
  userVideos: Video[] = [];
  allowDelete = false;
  allowEdit = false;
  UserPermissions!: Permission;
  isSignedIn: boolean = false;
  enviroment = environment.files;

  constructor(
    private VideoService: VideoService,
    private PermissionService: PermissionService,
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
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.video_delete) {
        this.allowDelete = true;
      }  
      if (!this.UserPermissions.video_edit) {
        this.allowEdit = true;
      } 
    });

    this.VideoService.getUserVideosList().subscribe(result => {
      this.userVideos = result['videos'];
    });
  }

  onDelete(videoId) {
    this.VideoService.deleteVideo(videoId).subscribe(
      data => {
          this.userVideos = this.userVideos.filter(video => video.id !== videoId);
        
      });
  }
  

}
