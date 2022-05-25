import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { ReportService } from 'src/app/services/report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import Chart  from 'chart.js/auto';

export class MostCommentedVideos {
  video_id!: number;
  title!: string;
  comments!: number;
}

@Component({
  selector: 'app-view-user-report',
  templateUrl: './view-user-report.component.html',
  styleUrls: ['./view-user-report.component.css']
})
export class ViewUserReportComponent implements OnInit {

  MostDislikedVideos: Video[] = [];
  MostDislikedVideosByDate: Video[] = [];
  MostLikedVideos: Video[] = [];
  MostLikedVideosByDate: Video[] = [];
  MostViewedVideos: Video[] = [];
  videoViews: string[] = [];
  MostCommentedVideos: MostCommentedVideos[] = [];
  TotalVideoCount!: number;
  TotalVideoLikes!: number;
  TotalVideoDislikes!: number;
  TotalVideoViews!: number;
  TotalCommentCount!: number;
  chart!: Chart;
  isSignedIn: boolean = false;

  mostLikedLabels: any;
  mostLikedData: any;
  mostDislikedData: any;

  constructor(
    private VideoService: VideoService,
    private ReportSerivce: ReportService,
    private AuthStateService: AuthStateService,
    private router: Router,
  ) { 
    this.AuthStateService.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if (!this.isSignedIn) {
        this.router.navigate(['/home']);
      }
    });
  }

  canvas: any;
  viewChart: any;
  commentsChart: any;
  ratingsChart: any;


  ngOnInit(): void {

    this.ReportSerivce.getUserReport().subscribe(result => {
      //console.log(result);
      this.MostDislikedVideos = result['MostDislikedVideos'];
      this.MostLikedVideos = result['MostLikedVideos'];
      this.MostViewedVideos = result['MostViewedVideos'];
      this.MostCommentedVideos = result['MostCommentedVideos'];
      this.MostDislikedVideosByDate = result['MostDislikedVideosByDate'];
      this.MostLikedVideosByDate = result['MostLikedVideosByDate'];
      this.TotalVideoCount = result['VideoCount'][0].count;
      this.TotalVideoLikes = result['VideoSums'][0].likes;
      this.TotalVideoDislikes = result['VideoSums'][0].dislikes;
      this.TotalVideoViews = result['VideoSums'][0].clicks;
      this.TotalCommentCount = result['CommentCount'][0].commentCount;
      
      this.viewChart = new Chart('viewChart', {
        type: 'bar',
        data: {
          labels: this.MostLikedVideos.map(video => video.title),
          datasets: [{
            label: 'Peržiūrų skaičius',
            data: this.MostViewedVideos.map(video => video.clicks),
            borderColor: 
              '#3e95cd',
            borderWidth: 5
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      this.viewChart.render();

      this.commentsChart = new Chart('commentChart', {
        type: 'bar',
        data: {
          labels: this.MostCommentedVideos.map(video => video.title),
          datasets: [{
            label: 'Komentarų skaičius',

            data: this.MostCommentedVideos.map(video => video.comments),
            borderColor: 
              '#3e95cd',
            borderWidth: 5
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      this.mostLikedData = this.MostLikedVideosByDate.map(video => video.likes);
      this.videoViews = this.MostLikedVideosByDate.map(video => video.clicks);
      this.mostDislikedData = this.MostDislikedVideosByDate.map(video => video.dislikes);

      this.ratingsChart = new Chart('ratingChart', {
        type: 'line',
        data: {
          labels: this.MostLikedVideosByDate.map(video => video.title),
          datasets: [{
            label: 'Peržiūros',
            type: 'line',
            data: this.videoViews,
            borderColor: '#3e95cd',
            borderWidth: 5
          },{
            label: 'Teigiami įvertinimai',
            type: 'bar',
            data: this.mostLikedData,
            borderColor: '#5cb85c',
            borderWidth: 5
          },{
            label: 'Neigiami įvertinimai',
            type: 'bar',
            data: this.mostDislikedData,
            borderColor: '#FF0000',
            borderWidth: 5
          },
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

    });

    
  }

}
