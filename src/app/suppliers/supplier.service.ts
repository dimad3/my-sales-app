import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ISupplier } from './isupplier.dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ISupplier[]> {
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns
     * the response body in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body in the requested type.
     */
    const SUPPLIERS = this.http.get<ISupplier[]>(environment.api + 'suppliers');
    console.log('SupplierService getAll() log:', SUPPLIERS);
    return SUPPLIERS;
  }

  getById(id: Number): Observable<ISupplier> {
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns
     * the response body in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body in the requested type.
     */
    const SUPPLIER = this.http.get<ISupplier>(environment.api + 'suppliers/' + id);
    console.log('SupplierService getById() log:', SUPPLIER);
    return SUPPLIER;
  }

}
