import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { Customer } from './dyn-customer.model';

@Injectable()
export class CustomerService {
  private customersUrl = './app/dyn-customers/shared/dyn-customers.json';  // URL to web API
  
  constructor (private http: Http) {}
  
  getCustomers (): Observable<Customer[]> {

    let customer$ = this.http.get(this.customersUrl)
                    .map(this.extractData)
                    .catch(this.handleError);

    return customer$;  
  } 

  getCustomer(id: number): Observable<Customer> {

    return this.getCustomers()
            .map(each => { return each.find(customer => customer.id === id)} )
            .do(o => console.log(o))
           .catch(this.handleError)
  } 

  private extractData(res: Response) {

    let body = res.json();
    return body.data || { };
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
    return Observable.throw(errMsg);
  }
}