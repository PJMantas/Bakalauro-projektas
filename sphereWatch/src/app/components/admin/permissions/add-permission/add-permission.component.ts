import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from '../../../../services/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission } from '../../../../models/permission';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {
  $permisionId!: number;
  $permission: Permission = new Permission();
  addForm: FormGroup;
  error: any;
  submitted = false;

  constructor(
    private PermissionService: PermissionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.addForm = this.formBuilder.group({
      group_name: ['', Validators.required],
      video_create: [false ],
      video_edit: [false],
      video_delete: [false],
      reaction_create: [false],
      comment_create: [false],
      comment_edit: [false],
      comment_delete: [false],
      is_admin: [false],
      manage_users: [false],
      manage_permissions: [false],
      manage_genres: [false],

    });
  }

  ngOnInit(): void {
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    

  this.PermissionService.addPermission(this.addForm.value).subscribe(
    (result) => {
      console.log(result);
    },
    (error) => {
      this.error = error.error;
      console.log(this.error);
    },
    () => {
      this.addForm.reset();
      this.router.navigate(['/admin/view-permissions']);
    }
  );
  /*
    this.PermissionService.addPermission(this.addForm.value).subscribe(response => {
      this.router.navigate(['/admin/view-permissions']);
    }
    
    );*/
  }

}
