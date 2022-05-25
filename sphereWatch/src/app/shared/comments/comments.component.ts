import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Permission } from 'src/app/models/permission';
import { Comment } from '../../models/comment';
import { AuthService } from '../../shared/auth.service';
import { PermissionService } from 'src/app/services/permission.service';
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
  UserPermissions!: Permission;
  CommentsList:Comment[] = [];
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
  allowComment: boolean = false;
  allowEditComment: boolean = false;
  allowDeleteComment: boolean = false;
  commentsCount: number = 7;

  constructor(
    private CommentService: CommentService,
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];
      if (this.UserPermissions.comment_create) {
        this.allowComment = true;
      } 
      if (this.UserPermissions.comment_edit) {
        this.allowEditComment = true;
      }
      if (this.UserPermissions.comment_delete) {
        this.allowDeleteComment = true;
      }
    });

    this.authService.profileUser().subscribe(result => {
      this.userId = result.id;
    });




    this.addCommentForm = this.formBuilder.group({
      comment_text: ['', Validators.required],
      video_id: this.videoId,

    });

    this.addReplyForm = this.formBuilder.group({
      comment_text: ['', Validators.required],
      video_id: this.videoId,
      comment_parent_id: [''],

    });


    this.getAllComments(this.videoId);

    this.editCommentForm = this.formBuilder.group({
      id: [''],
      comment_text: ['', Validators.required],
    });
  }

  getAllComments(video_id: number) {

    this.CommentService.getCommentsList(video_id, this.commentsCount).subscribe(result => {
      this.CommentsList = result['comments'];
    });
   
  }

  onCreateComment() {
    this.submitted = true;
    this.loading = true;
    this.CommentService.createComment(this.addCommentForm.value).subscribe(
      data => {
        this.submitted = false;
        this.CommentService.getCommentsList(this.videoId, this.commentsCount).subscribe(result => {
          this.CommentsList = result['comments'];
        });
        this.addCommentForm.patchValue({
          comment_text: ''
        });
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
        this.CommentService.getCommentsList(this.videoId, this.commentsCount).subscribe(result => {
          this.CommentsList = result['comments'];
        });
        this.showEditForm = false;
        this.editCommentForm.reset();
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
    
    this.addReplyForm.patchValue({
      comment_parent_id: commentId
    });
    
    this.CommentService.createCommentReply(this.addReplyForm.value).subscribe(
      data => {
        this.submitted = false;

        this.CommentService.getCommentsList(this.videoId, this.commentsCount).subscribe(result => {
          this.CommentsList = result['comments'];
          this.addReplyForm.reset();
        });
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onDeleteComment(commentId: number) {
    this.CommentService.deleteComment(commentId).subscribe(result => {
      this.CommentService.getCommentsList(this.videoId, this.commentsCount).subscribe(result => {
        this.CommentsList = result['comments'];
      });
    })
  }

  getCommentById(id){
    return this.CommentsList.find(x => x.id === id);
  }

  onLoadMoreComments() {
    this.commentsCount += 7;
    this.getAllComments(this.videoId);
  }
}
