import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISupplier } from '../isupplier.dto';

@Component({
  selector: 'app-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styles: [
  ]
})
export class SuppliersFormComponent implements OnInit {
  @Input()
  supplier!: ISupplier;

  @Output() newSaveEvent = new EventEmitter<ISupplier>();
  supplierForm!: FormGroup;

  /**
  * Creates an `AbstractControl` from a user-specified configuration.
  *
  * The `FormBuilder` provides syntactic sugar that shortens creating instances of a
  * `FormControl`, `FormGroup`, or `FormArray`. It reduces the amount of boilerplate needed to
  * build complex forms.
  * @see [Reactive Forms Guide](guide/reactive-forms)
  */
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    console.log('ngOnInit() -> this.supplier log:', this.supplier);
    if (this.supplier) {
      this.supplierForm = this.fb.group({
        id: [this.supplier.id],
        companyName: [this.supplier.companyName, [Validators.required, Validators.minLength(3)]],
        contactName: [this.supplier.contactName, [Validators.required, Validators.minLength(3)]],
        contactTitle: [this.supplier.contactTitle],
        address: this.fb.group({
          street: [this.supplier.address.street],
          city: [this.supplier.address.city],
          region: [this.supplier.address.region],
          postalCode: [this.supplier.address.postalCode],
          country: [this.supplier.address.country],
          phone: [this.supplier.address.phone],
        }),
      });
    } else {
      this.supplierForm = this.fb.group({
        id: [null],
        companyName: [null, [Validators.required, Validators.minLength(3)]],
        contactName: [null, [Validators.required, Validators.minLength(3)]],
        contactTitle: [null],
        address: this.fb.group({
          street: [null],
          city: [null],
          region: [null],
          postalCode: [null],
          country: [null],
          phone: [null],
        }),
      });
    }
    // throw new Error('Method not implemented.');
  }

  onSupplierFormSubmit() {
    const supplier_form_value: ISupplier = this.supplierForm.value as unknown as ISupplier;
    console.log('onSupplierFormSubmit -> supplierForm.value: ', supplier_form_value)
    /**
     * Emits an event containing a given value.
     * @param value The value to emit.
     */
    this.newSaveEvent.emit(supplier_form_value);
  }

}
