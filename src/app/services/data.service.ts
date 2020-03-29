import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
      private http: HttpClient,
  ) { }

  getRequest(suffix, options = {}) {
    return this.http.get(environment.baseUri + suffix, options);
  }

  postRequest (suffix, data = {}) {
    return this.http.post(environment.baseUri + suffix, data);
  }

  putRequest (suffix, data = {}) {
    return this.http.put(environment.baseUri + suffix, data);
  }

  deleteRequest(suffix, id, options = {}) {
    return this.http.delete(`${environment.baseUri}${suffix}/${id}`, options);
  }

}
