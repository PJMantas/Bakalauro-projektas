import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Video } from '../../models/video';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { VideoService } from '../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  Video:Video = new Video();
  RecomendedVideoList:Video[] = [];
  UserPermissions!:Permission;
  videoId!: number;
  genreId!: number;
  filtersLoaded!: Promise<boolean>;
  ratioChart: any;
  allowReact: boolean = false;
  showEdit: boolean = false;
  enviroment = environment.files;

  constructor(
    private VideoService: VideoService,
    private PermissionService: PermissionService,
    private AuthService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];
      if (this.UserPermissions.reaction_create) {
        this.allowReact = true;
      } 
    });

    this.videoId = Number(this.route.snapshot.paramMap.get('id'));
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    const formData = new FormData();
      formData.append('video_id', this.videoId.toString());
      //formData.append('genre', this.genreId.toString());
      this.VideoService.addVideoView(formData).subscribe(response => {
        //console.log(response);
      });

    this.VideoService.getVideoById(this.videoId).subscribe(response => {
      this.Video = response['video'];
      this.genreId = this.Video.genre;
      this.AuthService.profileUser().subscribe(response => {
        if(this.Video.creator_id == response.id) {
          this.showEdit = true;
        }});
      this.filtersLoaded = Promise.resolve(true);

      this.VideoService.getVideoRecomendations(this.genreId, this.videoId).subscribe(response => {
        this.RecomendedVideoList = response['videos'];
        //console.log(response); 
      });

    });

    

  }

  onReaction(reactionType: boolean) {
    const formData = new FormData();
    formData.append('video_id', this.videoId.toString());
    formData.append('reaction_type', reactionType.toString());

    this.VideoService.reactToVideo(formData).subscribe(response => {
      this.Video = response['video'];
    });
  }

}
