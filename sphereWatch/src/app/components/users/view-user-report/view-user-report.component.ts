import { Component, OnInit } from '@angular/core';
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
  MostCommentedVideos: MostCommentedVideos[] = [];
  TotalVideoCount!: number;
  TotalVideoLikes!: number;
  TotalVideoDislikes!: number;
  TotalVideoViews!: number;
  TotalCommentCount!: number;
  chart!: Chart;

  mostLikedLabels: any;
  mostLikedData: any;
  mostDislikedData: any;

  constructor(
    private VideoService: VideoService,
    private ReportSerivce: ReportService,
    private router: Router,
  ) { }

  canvas: any;
  ctx: any;
  viewChart: any;
  commentsChart: any;
  ratingsChart: any;


  ngOnInit(): void {

    this.ReportSerivce.getUserReport().subscribe(result => {
      console.log(result);
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

      //console.log(this.MostDislikedVideos);
      console.log(this.MostLikedVideos);
      console.log(this.MostViewedVideos);
      console.log(this.TotalVideoCount);
      console.log(this.TotalVideoLikes);
      console.log(this.TotalVideoDislikes);
      console.log(this.TotalVideoViews);

      this.viewChart = new Chart('viewChart', {
        type: 'bar',
        data: {
          //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          labels: this.MostLikedVideos.map(video => video.title),
          datasets: [{
            label: 'Peržiūrų skaičius',
            //data: [12, 19, 3, 5, 2, 3],
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

      this.commentsChart = new Chart('commentChart', {
        type: 'bar',
        data: {
          //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          labels: this.MostCommentedVideos.map(video => video.title),
          datasets: [{
            label: 'Komentarų skaičius',
            //data: [12, 19, 3, 5, 2, 3],
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
      this.mostDislikedData = this.MostDislikedVideosByDate.map(video => video.dislikes);

      this.ratingsChart = new Chart('ratingChart', {
        type: 'line',
        data: {
          labels: this.MostLikedVideosByDate.map(video => video.title),
          datasets: [{
            label: 'Teigiami įvertinimai',
            type: 'line',
            data: this.mostLikedData,
            borderColor: '#3e95cd',
            borderWidth: 5
          },{
            label: 'Neigiami įvertinimai',
            type: 'line',
            data: this.mostDislikedData,
            borderColor: '#FF0000',
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

    });
  }

}