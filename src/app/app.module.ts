import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GameListItemComponent } from './components/game-list-item/game-list-item.component';
import { FriendListItemComponent } from './components/friend-list-item/friend-list-item.component';
import { SearchFriendComponent } from './pages/search-friend/search-friend.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreateCategoriesComponent } from './pages/create-categories/create-categories.component';
import { GameWaitingComponent } from './pages/game-waiting/game-waiting.component';
import { RoundCategoriesComponent } from './pages/round-categories/round-categories.component';
import { ResultsCategoriesComponent } from './pages/results-categories/results-categories.component';
import { SubmitCategoriesComponent } from './pages/submit-categories/submit-categories.component';
import { SidebarModule } from 'ng-sidebar';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FriendsComponent } from './pages/friends/friends.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ChooseCharacterComponent } from './pages/choose-character/choose-character.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GameListItemComponent,
    FriendListItemComponent,
    SearchFriendComponent,
    NotificationsComponent,
    CreateCategoriesComponent,
    GameWaitingComponent,
    RoundCategoriesComponent,
    ResultsCategoriesComponent,
    SubmitCategoriesComponent,
    CustomToastComponent,
    FriendsComponent,
    ChooseCharacterComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    SidebarModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot({
      toastComponent: CustomToastComponent
    }),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    IvyCarouselModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  entryComponents: [CustomToastComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faBars);
  }
}
