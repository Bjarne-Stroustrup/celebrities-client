import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import {of} from 'rxjs';
import { CelebrityService } from '../celebrity.service';

export function uniqueCelebrityNameValidator(celebrityService: CelebrityService, currentCelebrityName: string = null): AsyncValidatorFn {
  return function (control: FormControl) {
    const enteredCelebrityName = control.value;
    
    if (currentCelebrityName !== null && currentCelebrityName === enteredCelebrityName){
      return of(null);
    }

      return celebrityService.doesCelebrityNameExist(enteredCelebrityName).pipe(
        map(doesExist => (
          doesExist ? { uniqueCelebrityName: {errorMessage: `Celebrity with name ${enteredCelebrityName} already exists`}} : null)
          ));
        };
}