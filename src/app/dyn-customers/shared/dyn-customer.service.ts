import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';

import { Customer } from './dyn-customer.model';
import { DynToastService } from '../../dyn-shell/shared/dyn-toast.service';

@Injectable()
export class CustomerService {
  private customersUrl = 'http://172.17.8.101/api/clients';  // URL to web API
  
  constructor (
    private http: Http,
    private toastService: DynToastService
  ) {}
  
  getCustomers (): Observable<Customer[]> {

    let customer$ = this.http.get(this.customersUrl)
                    .map(this.extractData)
                    .catch(this.handleError.bind(this));

    return customer$;  
  } 

  getCustomer(id: string): Observable<Customer> {

    return this.getCustomers()
            .map(each => { return each.find(customer => customer._id === id)} )
           .catch(this.handleError.bind(this))
  } 

  addCustomer (customer: Customer): Observable<Customer> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.customersUrl, { customer }, options)
                    .map(this.extractData)
                    .catch(this.handleError.bind(this));
  }

  updateCustomer (customer: Customer): Observable<Customer> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.customersUrl + '/' + customer._id, JSON.stringify(customer), { headers: headers })
                    .map(this.extractData)
                    .catch(this.handleError.bind(this));
  }

  private extractData(res: Response) {

    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    this.toastService.showToast({ Title: 'Error', Msg: errMsg, Type: 'error' });
    return Observable.throw(errMsg);
  }
}