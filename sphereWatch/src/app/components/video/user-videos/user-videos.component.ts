import { Component, OnInit } from '@angular/core';
import { Video } from '../../../models/video';
import { VideoService } from '../../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent implements OnInit {
  userVideos: Video[] = [];

  constructor(
    private VideoService: VideoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.VideoService.getUserVideosList().subscribe(result => {
      console.log(result);
      this.userVideos = result['videos'];
    });
  }

  onDelete(videoId) {
    this.VideoService.deleteVideo(videoId).subscribe(
      data => {
        this.router.navigate(['/video/userVideos']);
        window.location.reload();
      }
    );
  }
  

}
