import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'posts', component: AllPostsComponent,canActivate: [AuthGuard]},
  {path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
