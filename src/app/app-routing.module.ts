import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ChooseCharacterComponent } from './pages/choose-character/choose-character.component';
import { CreateCategoriesComponent } from './pages/create-categories/create-categories.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { GameWaitingComponent } from './pages/game-waiting/game-waiting.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { RegisterComponent } from './pages/register/register.component';
import { ResultsCategoriesComponent } from './pages/results-categories/results-categories.component';
import { RoundCategoriesComponent } from './pages/round-categories/round-categories.component';
import { SearchFriendComponent } from './pages/search-friend/search-friend.component';
import { SubmitCategoriesComponent } from './pages/submit-categories/submit-categories.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'search-friends', component: SearchFriendComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'choose-character/:gid/:id', component: ChooseCharacterComponent },
  { path: 'create-categories', component: CreateCategoriesComponent },
  { path: 'game-waiting/:gid/:state', component: GameWaitingComponent },
  { path: 'round-categories/:gid', component: RoundCategoriesComponent },
  { path: 'results-categories/:gid', component: ResultsCategoriesComponent },
  { path: 'submit-categories', component: SubmitCategoriesComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'categories-game/:gid', component: CategoriesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
