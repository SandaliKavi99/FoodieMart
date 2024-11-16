import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"search/:item",component:HomeComponent},
  {path:"food/:id",component:FoodPageComponent},
  {path:"notFound/",component:NotFoundComponent},
  {path:"login",component:LoginPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
