import {todosActions} from '../actions/todos.actions';
import {Itask} from '../../interfaces/iTask';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import uuidv1 from 'uuid/v1';
import {usersActions} from '../actions/users.actions';

@Injectable()
export class UsersMiddleware {
  private apihttp: HttpClient;
  private serverUrl: string;

  constructor(private http: HttpClient) {
    this.apihttp = http;
    this.serverUrl = 'http://localhost:3000/users/';
  }

  call = store => next => action => {
    switch (action.type) {
      case usersActions.GET_DATA:
        this.apihttp.get(this.serverUrl)
          .subscribe((data: Itask[]) => {
            next({type: usersActions.GET_DATA, payload: data});
          });
        break;

      case usersActions.CREATE_USER:
        const {username, password, email} = action.payload.data;
        this.apihttp.post(this.serverUrl, {
          username: username,
          password: password,
          email: email
        })
          .subscribe(() => {
            this.apihttp.get(this.serverUrl)
              .subscribe((data: Itask[]) => {
                next({type: usersActions.GET_DATA, payload: data});
              });
          });
        break;
      //
      // case todosActions.DELETE_TODO:
      //   this.apihttp.delete(this.serverUrl + action.payload.data)
      //     .subscribe(() => {
      //       this.apihttp.get(this.serverUrl)
      //         .subscribe((data: Itask[]) => {
      //           next({type: todosActions.GET_DATA, payload: data});
      //         });
      //     });
      //   break;
      //
      // case todosActions.EDIT_TODO:
      //   this.apihttp.put(this.serverUrl + action.payload.data.id, {
      //     ...action.payload.data
      //   })
      //     .subscribe(() => {
      //       this.apihttp.get(this.serverUrl)
      //         .subscribe((data: Itask[]) => {
      //           next({type: todosActions.GET_DATA, payload: data});
      //         });
      //     });
      //   break;

      default:
        next(action);
        break;
    }
  };

}
