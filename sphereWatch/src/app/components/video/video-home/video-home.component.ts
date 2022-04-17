import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Video } from '../../../models/video';
import { VideoService } from '../../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.css']
})
export class VideoHomeComponent implements OnInit {

  VideoList:Video[] = [];

  constructor(
    private VideoService: VideoService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.VideoService.getVideosList().subscribe(result => {
      console.log(result);
      this.VideoList = result['videos'];
    }
    )};

}
