import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';
import { IProduct } from '../iproduct.dto';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  products!: IProduct[];
  productsObservable!: Observable<IProduct[]>;
  searchForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
  ) { }

  /*
  When an async function is called, it returns a Promise.
  When the async function returns a value, the Promise will be resolved with the returned value.
  When the async function throws an exception or some value, the Promise will be rejected with the thrown value.
  */
  async ngOnInit(): Promise<void> {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
    this.getProducts();
  }

  async getProducts(searchTerm: string = '') {
    this.productsObservable = this.productService.getAll(searchTerm);

    /*
    An async function can contain an await expression, that pauses the execution of the async function
    and waits for the passed Promise's resolution,
    and then resumes the async function's execution and returns the resolved value.
    */
    // The lastValueForm means: Converts an observable to a promise by subscribing to the
    // observable, waiting for it to complete, and resolving the returned promise with the last
    // value from the observed stream. (https://rxjs.dev/api/index/function/lastValueFrom)
    this.products = await lastValueFrom(this.productsObservable);
    // console.log('ngOnInit() -> this.products', this.products);
  }

  onSearchSubmit(){
    this.getProducts(this.searchForm.value.searchTerm);
  }
}
