import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from './ICategory.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // inject the HttpClient class into CategoryService
  // The http property is declared directly in the class constructor.
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<ICategory[]> {
    // get() method fetches data from a server, it takes two arguments:
    // the endpoint URL from which to fetch, and an options object that is used to configure the request
    // The asynchronous method sends an HTTP request, and returns an Observable
    // that emits the requested data when the response is received
    return this.http.get<ICategory[]>(environment.api + 'categories');
  }
}
