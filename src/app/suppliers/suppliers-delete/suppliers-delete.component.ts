import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { ISupplier } from '../isupplier.dto';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-delete',
  templateUrl: './suppliers-delete.component.html',
  styles: [
  ]
})
export class SuppliersDeleteComponent implements OnInit {
  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  supplier!: ISupplier;
  supplierObservable!: Observable<ISupplier>;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  /*
  When an async function is called, it returns a Promise.
  When the async function returns a value, the Promise will be resolved with the returned value.
  When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
  */
  async ngOnInit(): Promise<void> {
    // “+” - converts String to Number
    // "|| 0" - we need to say that if paramMap.get is null, 0 should be used
    const ID: Number = +(this.route.snapshot.paramMap.get('id') || 0);

    if (ID) {
      this.supplierObservable = this.supplierService.getById(ID);

      /*
      An async function can contain an await expression, that pauses the execution of the async function
      and waits for the passed Promise's resolution,
      and then resumes the async function's execution and returns the resolved value.
      */
      // The lastValueForm means: Converts an observable to a promise by subscribing to the
      // observable, waiting for it to complete, and resolving the returned promise with the last
      // value from the observed stream. (https://rxjs.dev/api/index/function/lastValueFrom)
      this.supplier = await lastValueFrom(this.supplierObservable);
      // throw new Error('Method not implemented.');
    }
  }

  /**
  * When an async function is called, it returns a Promise.
  * When the async function returns a value, the Promise will be resolved with the returned value.
  * When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
  */
  async onDeleteSupplierClick() {
    this.supplierObservable = this.supplierService.delete(this.supplier.id);
    /*
    An async function can contain an await expression, that pauses the execution of the async function
    and waits for the passed Promise's resolution,
    and then resumes the async function's execution and returns the resolved value.
    */
    // The lastValueForm means: Converts an observable to a promise by subscribing to the
    // observable, waiting for it to complete, and resolving the returned promise with the last
    // value from the observed stream. (https://rxjs.dev/api/index/function/lastValueFrom)
    await lastValueFrom(this.supplierObservable);
    // After making delete, we use the router to navigate to the url /suppliers, returning
    // to the screen where Suppliers are displayed
    this.router.navigate(['/suppliers']);
  }

}
