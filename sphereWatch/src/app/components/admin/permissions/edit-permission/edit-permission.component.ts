import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from '../../../../services/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission } from '../../../../models/permission';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {
  $permisionId!: number;
  $permission: Permission = new Permission();
  editForm: FormGroup;
  error: any;
  submitted = false;

  constructor(
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.editForm = this.formBuilder.group(
      {
        id: [''],
        group_name: [''],
        video_create: [''],
        video_edit: [''],
        video_delete: [''],
        reaction_create: [''],
        comment_create: [''],
        comment_edit: [''],
        comment_delete: [''],
        is_admin: [''],
        user_create: [''],
        user_edit: [''],

      });
  }

  ngOnInit(): void {
    this.$permisionId = Number(this.route.snapshot.paramMap.get('id'));

    this.PermissionService.getPermission(this.$permisionId).subscribe(response => {
      
      this.$permission = response['permission'];
      console.log(this.$permission.id);
      this.editForm = this.formBuilder.group({
        id: [this.$permission.id, Validators.required],
        group_name: this.$permission.group_name,
        video_create: this.$permission.video_create,
        video_edit: this.$permission.video_edit,
        video_delete: this.$permission.video_delete,
        reaction_create: this.$permission.reaction_create,
        comment_create: this.$permission.comment_create,
        comment_edit: this.$permission.comment_edit,
        comment_delete: this.$permission.comment_delete,
        is_admin: this.$permission.is_admin,
        user_create: this.$permission.user_create,
        user_edit: this.$permission.user_edit,
      });
    })
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    this.PermissionService.updatePermission(this.editForm.value).subscribe(response => {
      this.router.navigate(['/admin/view-permissions']);
    });
  }

}
