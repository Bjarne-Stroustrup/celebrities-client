import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import {of} from 'rxjs';
import { CelebrityService } from '../celebrity.service';

export function uniqueCelebrityNameValidator(currentCelebrityName: string, celebrityService: CelebrityService): AsyncValidatorFn {
  return function (control: FormControl) {
    const enterdCelebrityName = control.value;

    if (currentCelebrityName === enterdCelebrityName){
      return of(null);
    }

      return celebrityService.doesCelebrityNameExist(enterdCelebrityName).pipe(
        map(doesExist => (
          doesExist ? { uniqueCelebrityName: {errorMessage: `Celebrity with name ${enterdCelebrityName} already exists`}} : null)
          ));
        };
}