import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: '', component: DashboardComponent},
  {path: 'categories', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
