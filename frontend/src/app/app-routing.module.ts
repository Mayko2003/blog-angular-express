import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/layouts/home/home.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { PostComponent } from './components/post/post/post.component';
import { Error404Component } from './components/status/error404/error404.component';
import { UserComponent } from './components/user/user/user.component';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'post/create', component: PostFormComponent, canActivate: [AuthGuardService]},
  { path: 'post/:slug', component: PostComponent, canActivate: [AuthGuardService]},
  { path: 'user/:username', component: UserComponent, canActivate: [AuthGuardService]},
  { path: '', component: HomeComponent},
  { path: 'logout', component: LoginComponent, data: {logout: true}},
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
