import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../models/video';
import { VideoService } from '../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import Chart  from 'chart.js/auto';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {

  Video:Video = new Video();
  RecomendedVideoList:Video[] = [];
  videoId!: number;
  genreId!: number;
  filtersLoaded!: Promise<boolean>;
  ratioChart: any;

  constructor(
    private VideoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
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
      //console.log(response);
      this.Video = response['video'];
      this.genreId = this.Video.genre;
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
      console.log(response);
      this.Video = response['video'];
    });
  }

}
