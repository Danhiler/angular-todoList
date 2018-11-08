import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {Itask} from '../interfaces/iTask';
import {TodosReducer} from './reducers/todos.reducer';
import {TodosMiddleware} from './Middlewares/todos.middleware';
import {HttpClientModule} from '@angular/common/http';
import {UsersMiddleware} from './Middlewares/users.middleware';
import {combineReducers} from 'redux';
import {UsersReducer} from './reducers/users.reducer';

export interface IAppState {
  items?: Itask[];
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgReduxModule,
    HttpClientModule,
  ],
  providers: [TodosMiddleware, UsersMiddleware]
})

export class StoreModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    todotsMW: TodosMiddleware,
    usersMW: UsersMiddleware
  ) {

    ngRedux.configureStore(combineReducers({todos: TodosReducer, users: UsersReducer}), {},
      [todotsMW.call, usersMW.call],
      devTools.isEnabled() ? [devTools.enhancer()] : []);

    // Enable syncing of Angular router state with our Redux store.
    // if (ngReduxRouter) {
    //   ngReduxRouter.initialize();
    // }

    // Enable syncing of Angular form state with our Redux store.
    // provideReduxForms(store);
  }
}
