import { Component, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { VideoService } from '../../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent implements OnInit {
  userVideos: Video[] = [];
  allowDelete = false;
  UserPermissions!: Permission;

  constructor(
    private VideoService: VideoService,
    private PermissionService: PermissionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.video_delete) {
        this.allowDelete = true;
      }   
    });

    this.VideoService.getUserVideosList().subscribe(result => {
      this.userVideos = result['videos'];
    });
  }

  onDelete(videoId) {
    this.VideoService.deleteVideo(videoId).subscribe(
      data => {
        this.router.navigate(['/video/userVideos']);
        this.VideoService.getUserVideosList().subscribe(result => {
          this.userVideos = this.userVideos.filter(video => video.id !== videoId);
        });
      }
    );
  }
  

}
