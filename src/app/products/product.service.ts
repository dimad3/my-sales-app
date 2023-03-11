import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IProduct } from './iproduct.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProduct[]> {
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns
     * the response body in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body in the requested type.
     */
    const PRODUCTS = this.http.get<IProduct[]>(environment.api + 'products');
    // console.log('ProductService getAll() log:', PRODUCTS);
    return PRODUCTS;
  }

}
