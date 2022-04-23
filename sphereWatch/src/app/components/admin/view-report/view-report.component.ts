import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { VideoService } from 'src/app/services/video.service';
import { ReportService } from 'src/app/services/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';

export class MostCommentedVideos {
  video_id!: number;
  title!: string;
  comments!: number;
}

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {
  
  MostDislikedVideos:Video[] = [];
  MostLikedVideos:Video[] = [];
  MostViewedVideos:Video[] = [];
  MostCommentedVideos:MostCommentedVideos[] = [];
  RegisteredUsers!: number;
  TotalVideoCount!: number;
  TotalVideoLikes!: number;
  TotalVideoDislikes!: number;
  TotalVideoViews!: number;
  TotalCommentCount!: number;

  constructor(
    private AdminService: AdminService,
    private VideoService: VideoService,
    private ReportSerivce: ReportService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ReportSerivce.getSystemReport().subscribe(result => {
      console.log(result);
      this.MostDislikedVideos = result['MostDislikedVideos'];
      this.MostLikedVideos = result['MostLikedVideos'];
      this.MostViewedVideos = result['MostViewedVideos'];
      this.MostCommentedVideos = result['MostCommentedVideos'];
      this.RegisteredUsers = result['RegisteredUsers'][0].count;
      this.TotalVideoCount = result['Videos'][0].count;
      this.TotalVideoLikes = result['VideoSums'][0].likes;
      this.TotalVideoDislikes = result['VideoSums'][0].dislikes;
      this.TotalVideoViews = result['VideoSums'][0].clicks;
      this.TotalCommentCount = result['Comments'][0].count;
      
      console.log(this.MostDislikedVideos);
      console.log(this.MostLikedVideos);
      console.log(this.MostViewedVideos);
      console.log(this.RegisteredUsers);
      console.log(this.TotalVideoCount);
      console.log(this.TotalVideoLikes);
      console.log(this.TotalVideoDislikes);
      console.log(this.TotalVideoViews);

    });
  }

}
