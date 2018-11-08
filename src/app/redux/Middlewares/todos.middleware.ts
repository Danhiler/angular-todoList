import {todosActions} from '../actions/todos.actions';
import {Itask} from '../../interfaces/iTask';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import uuidv1 from 'uuid/v1';

@Injectable()
export class TodosMiddleware {
  private apihttp: HttpClient;
  private serverUrl: string;

  constructor(private http: HttpClient) {
    this.apihttp = http;
    this.serverUrl = 'http://localhost:3000/todos/';
  }

  call = store => next => action => {
    switch (action.type) {
      case todosActions.GET_TODOS:
        this.apihttp.get(this.serverUrl)
          .subscribe((data: Itask[]) => {
            next({type: todosActions.GET_TODOS, payload: data});
          });

        break;

      case todosActions.CREATE_TODO:
        this.apihttp.post(this.serverUrl, {
          value: action.payload.data,
          done: false,
          id: uuidv1()
        })
          .subscribe(() => {
            this.apihttp.get(this.serverUrl)
              .subscribe((data: Itask[]) => {
                next({type: todosActions.GET_TODOS, payload: data});
              });
          });

        break;

      case todosActions.DELETE_TODO:
        this.apihttp.delete(this.serverUrl + action.payload.data)
          .subscribe(() => {
            this.apihttp.get(this.serverUrl)
              .subscribe((data: Itask[]) => {
                next({type: todosActions.GET_TODOS, payload: data});
              });
          });
        break;

      case todosActions.EDIT_TODO:
        this.apihttp.put(this.serverUrl + action.payload.data.id, {
          ...action.payload.data
        })
          .subscribe(() => {
            this.apihttp.get(this.serverUrl)
              .subscribe((data: Itask[]) => {
                next({type: todosActions.GET_TODOS, payload: data});
              });
          });
        break;

      default:
        next(action);
    }
  };

}
