import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { Genre } from 'src/app/models/genre';
import { VideoService } from 'src/app/services/video.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  RecomendedVideos1: Video[] = [];
  RecomendedVideos2: Video[] = [];
  RecomendedVideos3: Video[] = [];
  GenreList: Genre[] = [];
  genreTitle1: string = "";
  genreTitle2: string = "";
  genreTitle3: string = "";

  constructor(
    private VideoService: VideoService,
    private GenreService: GenreService
  ) { }

  ngOnInit(): void {
    this.VideoService.getRecomendedGenreVideos().subscribe(response => {
      
      this.RecomendedVideos1 = response['videos1'];
      this.RecomendedVideos2 = response['videos2'];
      this.RecomendedVideos3 = response['videos3'];

      this.GenreService.getGenresList().subscribe(response => {
        this.GenreList = response['genres'];
        this.GenreList.forEach(element => {
          if (element.id == this.RecomendedVideos1[0].genre) {
            this.genreTitle1 = element.name;
          } else if (element.id == this.RecomendedVideos2[0].genre) {
            this.genreTitle2 = element.name;
          } else if (element.id == this.RecomendedVideos3[0].genre) {
            this.genreTitle3 = element.name;
          }
          
        });
      });

    });
  }

}
