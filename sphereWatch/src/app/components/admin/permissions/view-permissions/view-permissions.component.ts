import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PermissionService } from '../../../../services/permission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission } from '../../../../models/permission';
@Component({
  selector: 'app-view-permissions',
  templateUrl: './view-permissions.component.html',
  styleUrls: ['./view-permissions.component.css']
})
export class ViewPermissionsComponent implements OnInit {

  permissionsList: Permission[] = [];

  constructor(
    private PermissionService: PermissionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.PermissionService.getPermissionList().subscribe(result => {
        this.permissionsList = result['permissions'];
      });
  }

  onDelete(id: number) {
    this.PermissionService.deletePermission(id).subscribe(result => {
    });
    this.PermissionService.getPermissionList().subscribe(result => {
      this.permissionsList = result['permissions'];
    });
  }

}
