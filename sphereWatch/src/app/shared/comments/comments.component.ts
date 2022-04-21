import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Comment } from '../../models/comment';
import { AuthService } from '../../shared/auth.service';
import { CommentService } from '../../services/comment.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() videoId!: number;
  addCommentForm!: FormGroup;
  addReplyForm!: FormGroup;
  editCommentForm!: FormGroup;
  userId!: number;
  
  comment: Comment = new Comment();
  currentUser: User = new User();
  CommentsList:Comment[] = [];
  CommentsList2:Comment[] = [];
  angular: any;
  loading = false;
  submitted = false;
  error: any;
  isLoaded: boolean = false;
  showReplyForm: boolean = false;
  showEditForm: boolean = false;
  showChildEditForm: boolean = false;
  clickedIndex!: number;
  someSubscription: any;

  constructor(
    private CommentService: CommentService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('COMMENT COMPONENT');
    console.log(this.videoId);
    this.addCommentForm = this.formBuilder.group({
      comment_text: ['', Validators.required],
      video_id: this.videoId,

    });

    this.addReplyForm = this.formBuilder.group({
      comment_text: ['', Validators.required],
      video_id: this.videoId,
      comment_parent_id: [''],

    });

    this.editCommentForm = this.formBuilder.group({
      id: [''],
      comment_text: ['', Validators.required],
    });

    this.getAllComments(this.videoId);
    


  }

  getAllComments(video_id: number) {
    console.log('COMMENT sarašas');
    console.log(video_id);
    this.CommentService.getCommentsList(video_id).subscribe(result => {
      console.log('pries');
      this.CommentsList = result['comments'];
      //this.test();
    });
  }

  onCreateComment() {
    this.submitted = true;
    this.loading = true;
    this.CommentService.createComment(this.addCommentForm.value).subscribe(
      data => {
        this.submitted = false;
        window.location.reload();
        //this.router.navigate(['/video/' + this.comment.video_id]);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onEditComment(commentId: number) {
    this.submitted = true;
    this.loading = true;
    this.editCommentForm.patchValue({
      id: commentId
    });
    this.CommentService.editComment(this.editCommentForm.value).subscribe(
      data => {
        this.submitted = false;
        window.location.reload();
        //this.router.navigate(['/video/' + this.comment.video_id]);
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

  onCreateReply(commentId: number) {
    this.submitted = true;
    this.loading = true;
    console.log('reply');
    console.log(this.addReplyForm.value);
    
    this.addReplyForm.patchValue({
      comment_parent_id: commentId
    });
    console.log(this.addReplyForm.value);
    this.CommentService.createCommentReply(this.addReplyForm.value).subscribe(
      data => {
        this.submitted = false;

        window.location.reload();
        //this.router.navigate(['/video/' + this.comment.video_id]);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onDeleteComment(commentId: number) {
    this.CommentService.deleteComment(commentId).subscribe(result => {
      console.log(result);
      window.location.reload();
    })
  }

  getCommentById(id){
    return this.CommentsList.find(x => x.id === id);
  }

}
