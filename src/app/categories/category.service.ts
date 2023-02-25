import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    // get() method fetches data from a server, it takes two arguments:
    // the endpoint URL from which to fetch, and an options object that is used to configure the request
    // The asynchronous method sends an HTTP request, and returns an Observable
    // that emits the requested data when the response is received
    return this.http.get<Category[]>(environment.api + 'categories');
  }

  save(category: Category): Observable<Category>{
    if (category.id) {
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
    return this.http.post<Category>(environment.api + 'categories/' + category.id, category);
  }
}
