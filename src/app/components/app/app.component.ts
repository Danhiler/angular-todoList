import {Component, Input} from '@angular/core';
import {Itask} from '../../interfaces/iTask';


import {HttpClient} from '@angular/common/http';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title: String = 'todoList';
  private newTaskText: String = '';
  private editedTaskId: String = '';
  private items: Itask[];
  private store: NgRedux<IAppState>;

  constructor(private http: HttpClient,  ngRedux: NgRedux<IAppState>) {
    this.editedTaskId = '';
    this.items = [];

    this.store = ngRedux;

    this.store.dispatch({type: 'GET_TODOS'});

    ngRedux.subscribe(() => {
      this.items = ngRedux.getState().todos.items;
    });
  }

  addNewTask(newTaskText: string) {
    if (newTaskText === '') {
      return;
    }
    this.store.dispatch({type: 'CREATE_TODO', payload: {data: newTaskText}});
    this.newTaskText = '';
  }

  removeTask(taskId: string) {
    if (!taskId) {
      return;
    }
    this.store.dispatch({type: 'DELETE_TODO', payload: {data: taskId}});
  }

  selectTaskToUpdate(taskId: string) {
    this.editedTaskId = taskId;
  }

  updateEditedTask(updatedItem: Itask) {
    this.store.dispatch({type: 'EDIT_TODO', payload: {data: updatedItem}});
  }

  deleteChecked() {
    this.items.map(item => {
      if (item.done === true) {
        this.store.dispatch({type: 'DELETE_TODO', payload: {data: item.id}});
      }
    });
  }
}
