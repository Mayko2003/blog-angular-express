import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IgxButtonModule,
  IgxIconModule,
  IgxNavigationDrawerModule,
  IgxRippleModule,
  IgxToggleModule,
  IgxInputGroupModule,
  IgxAvatarModule,
  IgxTextSelectionModule,
  IgxFocusModule,
  IgxCardModule,
  IgxSnackbarModule
} from 'igniteui-angular';
import { HomeComponent } from './components/layouts/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PostComponent } from './components/post/post/post.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { UserComponent } from './components/user/user/user.component';
import { NotFound404Component } from './components/status/not-found404/not-found404.component';
import { AuthService } from './services/auth.service';
import { RequestInterceptorService } from './services/request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    PostComponent,
    PostFormComponent,
    UserComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IgxButtonModule,
    IgxIconModule,
    IgxNavigationDrawerModule,
    IgxRippleModule,
    IgxToggleModule,
    IgxInputGroupModule,
    IgxTextSelectionModule,
	  IgxFocusModule,
    CKEditorModule,
    IgxCardModule,
    IgxSnackbarModule,
    IgxAvatarModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
