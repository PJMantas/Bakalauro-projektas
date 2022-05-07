import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../../models/video';
import { Genre } from 'src/app/models/genre';
import { GenreService } from 'src/app/services/genre.service';
import { VideoService } from '../../../services/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.css']
})
export class VideoHomeComponent implements OnInit {

  VideoList:Video[] = [];
  GenreList: Genre[] = [];
  toggle = true;
  genreId: number = -1;
  isSelected: boolean = false;
  orderType = 'asc';
  orderField = 'created_at';
  filterForm: FormGroup;

  constructor(
    private VideoService: VideoService,
    private router: Router,
    private GenreService: GenreService,
    private FromBuilder: FormBuilder,

    ) { 
      this.filterForm = this.FromBuilder.group({
        genre: [''],
        orderField: [''],
        orderType: ['']
      });
    }

    

  enableDisableRule(job) {
    
  }

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

  isGenreSelected(genreId: number) {
    this.isSelected = true;
    if(this.genreId === genreId)
    {
      this.isSelected = false;
      return true;
    } 
    return false;
  }
  selectUnselect(genreId: number) {
    console.log(genreId);

    this.toggle = !this.toggle;

    if(this.genreId === genreId) 
    {
      this.genreId = -1;
      this.VideoService.getVideosList().subscribe(result => {
        this.VideoList = result['videos'];
      });
    } 
    else {
    this.genreId = genreId;
      this.VideoService.getVideoByGenre(genreId).subscribe(result => {
        this.VideoList = result['videos'];
      });
    }
     
    
  }

  changeOrderType(event: any) {
    
    if (event.target.value === "1") {
      this.orderType = 'desc';
    } else {
      this.orderType = 'asc';
    }
    
    this.getFilteredList();
  }
  orderVideosBySelection(event: any) {
    if (event.target.value === "1") 
    {
      this.orderField = 'created_at';
      this.getFilteredList();
     
    }
    else if (event.target.value === "2")
    {
      this.orderField = 'clicks';
      this.getFilteredList();
    }
    
  }

  getFilteredList()
  {
    this.filterForm.patchValue({
      genre: this.genreId,
      orderField: this.orderField,
      orderType: this.orderType
    });
   
    this.VideoService.getOrderedVideosByGenre(this.filterForm.value).subscribe(result => {
      this.VideoList = result['videos'];
      console.log(result);
      
    });
  }

}
