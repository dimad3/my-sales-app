import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ISupplier } from '../isupplier.dto';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styles: [
  ]
})
export class SuppliersListComponent implements OnInit {
  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  suppliers!: ISupplier[];
  suppliersObservable!: Observable<ISupplier[]>;

  constructor(private supplierService: SupplierService) { }

  /*
  When an async function is called, it returns a Promise.
  When the async function returns a value, the Promise will be resolved with the returned value.
  When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
  */
  async ngOnInit(): Promise<void> {
    this.suppliersObservable = this.supplierService.getAll();
    console.log('this.suppliersObservable log:', this.suppliersObservable);

    /*
    An async function can contain an await expression, that pauses the execution of the async function
    and waits for the passed Promise's resolution,
    and then resumes the async function's execution and returns the resolved value.
    */
    // The lastValueForm means: Converts an observable to a promise by subscribing to the
    // observable, waiting for it to complete, and resolving the returned promise with the last
    // value from the observed stream. (https://rxjs.dev/api/index/function/lastValueFrom)
    this.suppliers = await lastValueFrom(this.suppliersObservable);
    console.log('this.suppliers log:', this.suppliers);
    // throw new Error('Method not implemented.');
  }

}
