import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  Video:Video = new Video();
  videoId!: number;
  filtersLoaded!: Promise<boolean>;

  constructor(
    private VideoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.videoId = Number(this.route.snapshot.paramMap.get('id'));
    //this.videoUrl = 'assets/videos/drip.mp4';
    //console.log(this.videoUrl);
    this.VideoService.getVideoById(this.videoId).subscribe(response => {
      console.log(response);
      this.Video = response['video'];
      this.filtersLoaded = Promise.resolve(true);
    });

    const formData = new FormData();
    formData.append('video_id', this.videoId.toString());
    formData.append('genre', this.Video.genre);
    this.VideoService.addVideoView(formData).subscribe(response => {
      console.log(response);
    });
  }

  onLike() {
    const formData = new FormData();
    formData.append('video_id', this.videoId.toString());
    formData.append('genre', this.Video.genre);

    this.VideoService.likeVideo(formData).subscribe(response => {
      console.log(response);
      this.Video = response['video'];
    });
  }

  onDislike() {
    const formData = new FormData();
    formData.append('video_id', this.videoId.toString());
    formData.append('genre', this.Video.genre);
    
    this.VideoService.dislikeVideo(formData).subscribe(response => {
      console.log(response);
      this.Video = response['video'];
    });
  }

}
