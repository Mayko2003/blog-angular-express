import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/layouts/home/home.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { PostComponent } from './components/post/post/post.component';
import { UserComponent } from './components/user/user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'post/create', component: PostFormComponent},
  { path: 'post/:slug', component: PostComponent},
  { path: 'user/:username', component: UserComponent},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
