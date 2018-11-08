import {Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {AppComponent} from '../components/app/app.component';
import {OldUserComponent} from '../components/login/old-user/old-user.component';
import {NewUserComponent} from '../components/login/new-user/new-user.component';
import {AuthGuard} from '../routerGuards/loginGuard';
import {FormsComponent} from '../components/forms-component/forms-component.component';


export const appRoutes: Routes = [
    {
      path: '',
      pathMatch: 'full',
      component: AppComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'forms',
      component: FormsComponent
    },
    {
      path: 'login',
      component: LoginComponent,
      children: [
        {
          path: 'new-user',
          component: NewUserComponent
        },
        {
          path: 'old-user',
          component: OldUserComponent

        }]
    }
  ]
;
