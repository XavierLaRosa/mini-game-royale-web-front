import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCategoriesComponent } from './pages/create-categories/create-categories.component';
import { GameWaitingComponent } from './pages/game-waiting/game-waiting.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { RegisterComponent } from './pages/register/register.component';
import { RoundCategoriesComponent } from './pages/round-categories/round-categories.component';
import { SearchFriendComponent } from './pages/search-friend/search-friend.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search-friends', component: SearchFriendComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'create-categories', component: CreateCategoriesComponent },
  { path: 'game-waiting/:gid/:state', component: GameWaitingComponent },
  { path: 'round-categories/:gid', component: RoundCategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
