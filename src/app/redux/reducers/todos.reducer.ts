import {todosActions} from '../actions/todos.actions';

export function TodosReducer(state: any = {}, action: any) {
  switch (action.type) {
    case todosActions.GET_TODOS:

      return Object.assign({}, state, {items: action.payload});

    default:
      return state;
  }
}
