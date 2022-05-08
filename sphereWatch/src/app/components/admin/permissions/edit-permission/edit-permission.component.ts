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
  UserPermissions!: Permission;
  editForm: FormGroup;
  error: any;
  submitted = false;
  showWindow = false;

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
        manage_users: [''],
        manage_permissions: [''],
        manage_genres: [''],

      });
  }

  ngOnInit(): void {
    this.PermissionService.getAuthUserPermissions().subscribe(result => {
      this.UserPermissions = result['permissions'];

      if (!this.UserPermissions.is_admin || !this.UserPermissions.manage_permissions) {
        this.router.navigate(['/home']);
      } else {
        this.showWindow = true;
      }},
      error => {
        this.router.navigate(['/home']);
    });

    this.$permisionId = Number(this.route.snapshot.paramMap.get('id'));

    this.PermissionService.getPermission(this.$permisionId).subscribe(response => {
      
      this.$permission = response['permission'];
      console.log(this.$permission.id);
      this.editForm = this.formBuilder.group({
        id: [this.$permission.id, Validators.required],
        group_name: [this.$permission.group_name, Validators.required], 
        video_create: this.$permission.video_create,
        video_edit: this.$permission.video_edit,
        video_delete: this.$permission.video_delete,
        reaction_create: this.$permission.reaction_create,
        comment_create: this.$permission.comment_create,
        comment_edit: this.$permission.comment_edit,
        comment_delete: this.$permission.comment_delete,
        is_admin: this.$permission.is_admin,
        manage_users: this.$permission.manage_users,
        manage_permissions: this.$permission.manage_permissions,
        manage_genres: this.$permission.manage_genres,
      });
    })
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    this.PermissionService.updatePermission(this.editForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.error = error.error;
        console.log(this.error);
      },
      () => {
        this.editForm.reset();
        this.router.navigate(['/admin/view-permissions']);
      }
    );
  }
}
