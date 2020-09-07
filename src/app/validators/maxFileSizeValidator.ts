import {ValidatorFn, FormControl } from '@angular/forms';

export function maxFileSizeValidator(maxSize: number): ValidatorFn {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const fileSize = file.size;
        if (fileSize > maxSize) {
          return {
            exceedingFileSize: {errorMessage : `File size ${fileSize} exceeds max file size`}
          };
        }
        
        return null;
      }
  
      return null;
    };
}