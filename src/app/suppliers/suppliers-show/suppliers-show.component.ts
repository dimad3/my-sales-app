import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { ISupplier } from '../isupplier.dto';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers-show',
  templateUrl: './suppliers-show.component.html',
  styles: [
  ]
})
export class SuppliersShowComponent implements OnInit {
  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  supplier!: ISupplier;
  supplierObservable!: Observable<ISupplier>;
  id!: number;

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
  ) { }

  /*
  When an async function is called, it returns a Promise.
  When the async function returns a value, the Promise will be resolved with the returned value.
  When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
  */
  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      // we need to say that if params['id'] is null, 0 should be used
      this.id = (params['id'] || 0)
      // console.log('params log:', params) //log the entire params object
      // console.log("params['id'] log:", params['id']) //log the value of id
    });

    if (this.id) {
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
      console.log('this.supplier log:', this.supplier);
      // throw new Error('Method not implemented.');
    }
  }
}
