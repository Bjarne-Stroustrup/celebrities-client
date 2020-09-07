import {ValidatorFn, FormControl } from '@angular/forms';

export function allowedFileTypeValidator(allowedTypes: string[]): ValidatorFn {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        allowedTypes = allowedTypes.map(t => t.toLowerCase());

        if (!allowedTypes.includes(extension)) {
          return {
            forbiddenFileType: {errorMessage : `File extension ${extension} is not supported`}
          };
        }
        
        return null;
      }
  
      return null;
    };
}