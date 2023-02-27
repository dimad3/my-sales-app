import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Category } from './category.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // inject the HttpClient class into CategoryService
  // The http property is declared directly in the class constructor.
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Category[]> {
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns
     * the response body in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body in the requested type.
     */
    return this.http.get<Category[]>(environment.api + 'categories');
  }

  save(category: Category): Observable<Category> {
    if (category.id === 0) {
      /**
       * Constructs a `POST` request that interprets the body as JSON
       * and returns an observable of the response.
       *
       * @param url The endpoint URL.
       * @param body The content to replace with.
       * @param options HTTP options
       *
       * @return  An `Observable` of the `HttpResponse` for the request, with a response body in the
       * requested type.
       */
      return this.http.post<Category>(environment.api + 'categories/', category);
    }

    /**
     * Constructs a `PUT` request that interprets the body as an instance of the requested type
     * and returns an observable of the requested type.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the requested type.
     */
    return this.http.put<Category>(environment.api + 'categories/' + category.id, category);
  }

  delete(id: number): Observable<Category[]> {
    /**
     * Constructs a DELETE request that interprets the body as JSON and returns
     * the response in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with response body in the requested type.
     */
    const categoryDeleted = this.http.delete<Category[]>(environment.api + 'categories/' + id);
    return categoryDeleted;
  }

}
