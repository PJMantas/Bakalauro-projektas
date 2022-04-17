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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },

  { path: 'viewVideo/:id', component: VideoViewComponent },
  { path: 'videoHome', component: VideoHomeComponent },
  { path: 'video/editVideo/:id', component: EditVideoComponent },
  { path: 'video/createVideo', component: CreateVideoComponent },
  { path: 'video/userVideos', component: UserVideosComponent },

  { path: 'home', component: HomeComponent },

  { path: 'admin', component: AdminComponent },
  { path: 'admin/add-user', component: AddUserComponent },
  { path: 'admin/edit-user/:id', component: EditUserComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}