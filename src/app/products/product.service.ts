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

  getAll(search: string = ''): Observable<IProduct[]> {
    const searchTerm = search != '' ? '&q=' + search : ''
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns
     * the response body in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body in the requested type.
     */
    console.log(environment.api + 'products?' + searchTerm);
    // search syntax see in API docs (fake-server -> readme.md)
    // The API has the _expand parameter which will also bring up categories and suppliers
    return this.http.get<IProduct[]>(environment.api + 'products?_expand=category&_expand=supplier' + searchTerm);
  }

}
