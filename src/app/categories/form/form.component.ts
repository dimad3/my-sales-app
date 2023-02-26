import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category.dto';

@Component({
  selector: 'category-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() newBackEvent = new EventEmitter();
  @Output() newSaveEvent = new EventEmitter<Category>();

  @Input() set categoryChild(category: Category) {
    /**
     * Sets the value of the `FormGroup`. It accepts an object that matches
     * the structure of the group, with control names as keys.
     *
     * @usageNotes
     * ### Set the complete value for the form group
     *
     * ```
     * const form = new FormGroup({
     *   first: new FormControl(),
     *   last: new FormControl()
     * });
     *
     * console.log(form.value);   // {first: null, last: null}
     *
     * form.setValue({first: 'Nancy', last: 'Drew'});
     * console.log(form.value);   // {first: 'Nancy', last: 'Drew'}
     * ```
     *
     * @throws When strict checks fail, such as setting the value of a control
     * that doesn't exist or if you exclude a value of a control that does exist.
     *
     * @param value The new value for the control that matches the structure of the group.
     * @param options Configuration options that determine how the control propagates changes
     * and emits events after the value changes.
    */
    this.categoryForm.setValue(category);
  }

  categoryForm = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['']
  });

  /**
  * Creates an `AbstractControl` from a user-specified configuration.
  *
  * The `FormBuilder` provides syntactic sugar that shortens creating instances of a
  * `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to
  * build complex forms.
  * @see [Reactive Forms Guide](guide/reactive-forms)
  */
  constructor(private fb: FormBuilder) { }

  onSubmit() {
    const category: Category = this.categoryForm.value as unknown as Category;
    console.log('onSubmit in form-component.ts: ', category)
    this.newSaveEvent.emit(category);
  }

  onBack() {
    this.newBackEvent.emit();
  }
}
