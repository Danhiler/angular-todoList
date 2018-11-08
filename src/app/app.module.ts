import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {ListItemComponent} from './components/list-item/list-item.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from './redux/store.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {LoginComponent} from './components/login/login.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes/appRoutes';
import {NewUserComponent} from './components/login/new-user/new-user.component';
import {OldUserComponent} from './components/login/old-user/old-user.component';
import {AuthGuard} from './routerGuards/loginGuard';
import {FormsComponent} from './components/forms-component/forms-component.component';
import {FormsModule, ReactiveFormsModule, } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    HomePageComponent,
    LoginComponent,
    NewUserComponent,
    OldUserComponent,
    FormsComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    StoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, RouterModule],
  bootstrap: [HomePageComponent],
  // exports: {
  //   FormsModule,
  //   ReactiveFormsModule
  // }
})
export class AppModule {
}
