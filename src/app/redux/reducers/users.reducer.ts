import {usersActions} from '../actions/users.actions';

export function UsersReducer(state: any, action: any) {
  switch (action.type) {
    case usersActions.GET_DATA:
      return Object.assign({}, state, {list:action.payload});

    default:
      if (typeof state === 'undefined') {
        return null;
      } else {
        return state;
      }

  }
}
