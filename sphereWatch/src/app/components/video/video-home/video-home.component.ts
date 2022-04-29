import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Video } from '../../../models/video';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { VideoService } from '../../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.css']
})
export class VideoHomeComponent implements OnInit {

  VideoList:Video[] = [];
  GenreList: Genre[] = [];
  toggle = true;
  status = 'Enable'; 

  constructor(
    private VideoService: VideoService,
    private router: Router,
    private GenreService: GenreService,

    ) { }

  ngOnInit(): void {
    this.GenreService.getGenresList().subscribe(result => {
      console.log(result);
      this.GenreList = result['genres'];
    });

    this.VideoService.getVideosList().subscribe(result => {
      console.log(result);
      this.VideoList = result['videos'];
    }
    )};

  searchVideo(event: any) {
    const searchTerm = event.target.value;
    this.VideoService.searchVideo(searchTerm.trim()).subscribe(result => {
      console.log(result);
      this.VideoList = result['videos'];
    }
  )};

  selectUnselect(genreId: number) {
    console.log(genreId);
    this.VideoService.getVideoByGenre(genreId).subscribe(result => {
      console.log(result);
      this.VideoList = result['videos'];
  }
  )};

}
