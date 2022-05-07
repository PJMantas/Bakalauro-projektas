import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { VideoService } from 'src/app/services/video.service';
import { ReportService } from 'src/app/services/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import Chart  from 'chart.js/auto';

export class MostCommentedVideos {
  video_id!: number;
  title!: string;
  comments!: number;
}

export class UserCountByMonth {
  month!: string;
  count!: number;
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
  UserCountByMonth:UserCountByMonth[] = [];
  RegisteredUsers!: number;
  TotalVideoCount!: number;
  TotalVideoLikes!: number;
  TotalVideoDislikes!: number;
  TotalVideoViews!: number;
  TotalCommentCount!: number;
  ratingsChart: any;
  usersByMonth: any;
  userMonthCount: any;


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
      this.UserCountByMonth = result['UserCountPerMonth'];
      this.RegisteredUsers = result['RegisteredUsers'][0].count;
      this.TotalVideoCount = result['Videos'][0].count;
      this.TotalVideoLikes = result['VideoSums'][0].likes;
      this.TotalVideoDislikes = result['VideoSums'][0].dislikes;
      this.TotalVideoViews = result['VideoSums'][0].clicks;
      this.TotalCommentCount = result['Comments'][0].count;
      
      
      console.log(this.UserCountByMonth);

      this.ratingsChart = new Chart('ratingsChart', {
        type: 'doughnut',
        data: {
          labels: ['Teigiami', 'Neigiami'],
          datasets: [{
            label: 'Peržiūrų skaičius',
            data: [this.TotalVideoLikes, this.TotalVideoDislikes],
            borderColor: 
              '#3e95cd',
            borderWidth: 2,
            backgroundColor: [
              '#32CD32',
              '#f08080'
            ],
          }],
          
        }});

        this.userMonthCount = Object.keys(this.UserCountByMonth).map((key, index) => this.UserCountByMonth[key]);

        this.usersByMonth = new Chart('usersByMonth', {
        type: 'bar',
        data: {
          labels: ['Sausis', 'Vasaris', 'Kovas', 'Balandžis', 'Gegužė', 'Birželis', 'Liepa', 'Rugpjūtis', 'Rugsėjis', 'Spalis', 'Lapkritis', 'Gruodis'],
          datasets: [{
            label: 'Naudotojų skaičius',
            data: this.userMonthCount,
            borderColor: 
              '#3e95cd',
            borderWidth: 2,
            backgroundColor: [
              '#bd3f09'
            ],
          }],
          
        }});
      });

    
  }

  }
