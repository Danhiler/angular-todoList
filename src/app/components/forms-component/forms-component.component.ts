import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Itask} from '../../interfaces/iTask';
import {todosActions} from '../../redux/actions/todos.actions';
import {HttpClient} from '@angular/common/http';
import {emailValidator, userNameValidator} from './validators/form-validators';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux/store.module';

// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'

@Component({
  selector: 'app-forms-component',
  templateUrl: './forms-component.component.html',
  styleUrls: ['./forms-component.component.scss']
})
export class FormsComponent implements OnInit {
  private serverUrl: string;
  private form: FormGroup;
  private apihttp: HttpClient;
  private lists: any[];
  private errorMsg: string[];
  private store: NgRedux<IAppState>;

  constructor(http: HttpClient, ngRedux: NgRedux<IAppState>) {
    this.apihttp = http;
    this.store = ngRedux;
    this.lists = [];
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, userNameValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, emailValidator])
    });
    this.errorMsg = [];
  }

  ngOnInit() {
    this.updateTable();
    this.store.subscribe(() => {
      this.lists = this.store.getState().users.list;
    });
  }

  submit() {
    this.getFormValidationErrors();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch({type: 'CREATE_USER', payload: {data: this.form.value}});
  this.updateTable()
  }

  private updateTable() {
    this.store.dispatch({type: 'GET_DATA'});
  }


  checkValid(attrName: string) {
    return (this.form.controls[attrName].errors && this.form.controls[attrName].touched);
  }

  getFormValidationErrors() {
    this.errorMsg = [];
    Object.keys(this.form.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          let explainError = '';
          switch (keyError) {
            case 'required':
              explainError += 'is required';
              break;
            case 'minlength':
              explainError += 'need to be at least 5 characters';
              break;
            case 'emailInvalid':
              explainError += 'is incorrect';
              break;
            case 'usernameInvalid':
              explainError += 'is incorrect';
              break;
            default:
              explainError += 'error not recognized';
              break;
          }
          this.errorMsg.push('Field ' + key + ' ' + explainError);
        })
        ;
      }
    })
    ;
  }
}

