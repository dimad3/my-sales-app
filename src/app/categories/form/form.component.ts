import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../ICategory.dto';

@Component({
  selector: 'category-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  /**
 * Creates a new `FormGroup` instance.
 *
 * @param controls A collection of child controls. The key for each child is the name
 * under which it is registered.
 *
 * @param validatorOrOpts A synchronous validator function, or an array of such functions,
 * or an `AbstractControlOptions` object that contains validation functions and a validation trigger.
 *
 * @param asyncValidator A single async validator or array of async validator functions
 *
 */
  categoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
  });

  onSubmit(){
    console.log('Submit: ', this.categoryForm.value)
  }
}
