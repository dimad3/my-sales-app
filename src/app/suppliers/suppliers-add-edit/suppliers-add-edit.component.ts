import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { ISupplier } from '../isupplier.dto';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-add-edit',
  templateUrl: './suppliers-add-edit.component.html',
  styles: [
  ]
})

export class SuppliersAddEditComponent implements OnInit {
  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  supplier!: ISupplier;
  supplierObservable!: Observable<ISupplier>;
  id!: number;
  //the component is in "add mode" when there is no user id route parameter, otherwise it is in "edit mode".
  // The property isAddMode is used to change the component behaviour based on which mode it is in
  isAddMode: boolean = true;

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
    console.log('ngOnInit() this.isAddMode log:', this.isAddMode);
    this.route.params.subscribe(params => {
      // we need to say that if params['id'] is null, 0 should be used
      this.id = (params['id'] || 0);
    });
    console.log('ngOnInit() this.id log:', this.id);

    if (this.id) {
      this.isAddMode = false;
      this.supplierObservable = this.supplierService.getById(this.id);
      // console.log('this.id log:', this.id);

      /*
      An async function can contain an await expression, that pauses the execution of the async function
      and waits for the passed Promise's resolution,
      and then resumes the async function's execution and returns the resolved value.
      */
      // The lastValueForm means: Converts an observable to a promise by subscribing to the
      // observable, waiting for it to complete, and resolving the returned promise with the last
      // value from the observed stream. (https://rxjs.dev/api/index/function/lastValueFrom)
      this.supplier = await lastValueFrom(this.supplierObservable);
    }
    // throw new Error('Method not implemented.');
  }

  /**
  * When an async function is called, it returns a Promise.
  * When the async function returns a value, the Promise will be resolved with the returned value.
  * When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
  * @param supplier - object of type Supplier, which is precisely the object passed on by the form
  */
  async onSave(supplier: ISupplier) {
    this.supplierObservable = this.supplierService.save(supplier);
    /*
    An async function can contain an await expression, that pauses the execution of the async function
    and waits for the passed Promise's resolution,
    and then resumes the async function's execution and returns the resolved value.
    */
    // The lastValueForm means: Converts an observable to a promise by subscribing to the
    // observable, waiting for it to complete, and resolving the returned promise with the last
    // value from the observed stream. (https://rxjs.dev/api/index/function/lastValueFrom)
    this.supplier = await lastValueFrom(this.supplierObservable);

    // After making the save, we use the router to navigate to the url /suppliers/show/id, returning
    // to the screen where Supplier is displayed
    // this.router.navigate(['/suppliers/show/', this.supplier.id]);
    if (this.isAddMode) {
      this.router.navigate(['/suppliers']);
    } else {
      this.router.navigate(['/suppliers/show/', supplier.id]);
    }
  }
}
