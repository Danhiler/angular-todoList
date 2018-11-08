import {FormControl} from '@angular/forms';

export function emailValidator(control: FormControl) {
  const regex_exep = /\S+@\S+\.\S+/;
  if (!regex_exep.test(control.value)) {
    return {
      emailInvalid: true
    };
  }
  return null;
}

export function userNameValidator(control: FormControl) {
  const regex_exep = 'Ravid0';
  if (regex_exep !== control.value) {
    return {
      usernameInvalid: true
    };
  }
  return null;
}
