import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { VideoHomeComponent } from './components/video/video-home/video-home.component';
import { EditVideoComponent } from './components/video/edit-video/edit-video.component';
import { CreateVideoComponent } from './components/video/create-video/create-video.component';
import { UserVideosComponent } from './components/video/user-videos/user-videos.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { ViewReportComponent } from './components/admin/view-report/view-report.component';
import { ViewUserReportComponent } from './components/users/view-user-report/view-user-report.component';
import { ViewPermissionsComponent } from './components/admin/permissions/view-permissions/view-permissions.component';
import { AddPermissionComponent } from './components/admin/permissions/add-permission/add-permission.component';
import { EditPermissionComponent } from './components/admin/permissions/edit-permission/edit-permission.component';
import { GenreComponent } from './components/admin/genre/genre.component';
import { GenreRequestComponent } from './components/admin/genre-request/genre-request.component';
import { RequestGenreComponent } from './components/users/request-genre/request-genre.component';
import { UserGenreRequestsComponent } from './components/users/user-genre-requests/user-genre-requests.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'viewUserReport', component: ViewUserReportComponent },
  { path: 'request-genre', component: RequestGenreComponent },
  { path: 'user-genre-requests', component: UserGenreRequestsComponent },

  { path: 'viewVideo/:id', component: VideoViewComponent },
  { path: 'videoHome', component: VideoHomeComponent },
  { path: 'video/editVideo/:id', component: EditVideoComponent },
  { path: 'video/createVideo', component: CreateVideoComponent },
  { path: 'video/userVideos', component: UserVideosComponent },
  
  { path: 'home', component: HomeComponent },

  { path: 'admin', component: AdminComponent },
  { path: 'admin/add-user', component: AddUserComponent },
  { path: 'admin/edit-user/:id', component: EditUserComponent },
  { path: 'admin/view-report', component: ViewReportComponent },
  { path: 'admin/view-permissions', component: ViewPermissionsComponent },
  { path: 'admin/add-permission', component: AddPermissionComponent },
  { path: 'admin/edit-permission/:id', component: EditPermissionComponent },
  { path: 'admin/genre', component: GenreComponent },
  { path: 'admin/genre-requests', component: GenreRequestComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}