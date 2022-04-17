import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../../../models/video';
import { User } from '../../../models/user';
import { VideoService } from '../../../services/video.service';
import { AuthService } from '../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {

  addVideoForm!: FormGroup;
  userId!: number;
  video: Video = new Video();
  currentUser: User = new User();
  loading = false;
  submitted = false;
  error: any;
  isLoaded:boolean = false;
  file: any;

  constructor(
    private VideoService: VideoService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    
    console.log(this.userId);
    

    this.authService.profileUser().subscribe((data: any) => {
      this.currentUser = data;
      this.userId = this.currentUser.id;
      
      this.isLoaded = true;
      this.addVideoForm = this.formBuilder.group({
        title: ['', Validators.required],
        video_url: [null, Validators.required],
        description: ['', Validators.required],
        //thumbnail: ['', Validators.required],
        creator_id: this.userId,
        genre: ['', Validators.required],
        
      });
    });

    
  }

  ngOnInit(): void {

  }
  
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.addVideoForm.invalid) {
      console.log("IVALID FORMAAA");
      return;
    }

    const formData = new FormData();
    
    formData.append("video_url", this.file);
    formData.append("title", this.addVideoForm.controls['title'].value);
    formData.append("description", this.addVideoForm.controls['description'].value);
    formData.append("genre", this.addVideoForm.controls['genre'].value);
    console.log(formData.get('video_url'));

    this.loading = true;
    
    this.VideoService.createVideo(formData)
            .subscribe(
                data => {
                  this.router.navigate(['/videoHome']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
  }

}
