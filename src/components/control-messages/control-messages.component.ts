import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

// Angular 2 Form Builder and Validation Management
// https://coryrylan.com/blog/angular-2-form-builder-and-validation-management

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
})
export class ControlMessages {
  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}
