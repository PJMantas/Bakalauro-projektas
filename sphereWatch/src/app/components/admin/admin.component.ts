import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  UsersList:User[] = [];
  
  
  constructor(
    private AdminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.AdminService.getUserList().subscribe(result => {
     //console.log(JSON.stringify(result));
      this.UsersList = result['users'];
    })
  }

  onDelete(userId){
    
    this.AdminService.deleteUser(userId).subscribe(result => {
      console.log(result);
      window.location.reload();
    })
  }

}
