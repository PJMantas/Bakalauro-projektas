import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth.interceptor';
import { VideoViewComponent } from './components/video-view/video-view.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { VideoHomeComponent } from './components/video/video-home/video-home.component';
import { EditVideoComponent } from './components/video/edit-video/edit-video.component';
import { CreateVideoComponent } from './components/video/create-video/create-video.component';
import { UserVideosComponent } from './components/video/user-videos/user-videos.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { CommentsComponent } from './shared/comments/comments.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ViewReportComponent } from './components/admin/view-report/view-report.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    VideoViewComponent,
    NavbarComponent,
    AdminComponent,
    AddUserComponent,
    EditUserComponent,
    HomeComponent,
    VideoHomeComponent,
    EditVideoComponent,
    CreateVideoComponent,
    UserVideosComponent,
    EditProfileComponent,
    CommentsComponent,
    FooterComponent,
    ViewReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}