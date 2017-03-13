import * as firebase from 'firebase';
import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseObjectFactory } from 'angularfire2';

import { Customer } from './dyn-customer.model';
import { DynToastService } from '../../dyn-shell/shared/dyn-toast.service';

@Injectable()
export class CustomerService {
  private customersList: FirebaseListObservable<any>;
  private customerRef = firebase.database().ref('/customers');
  private customers;

  constructor (
    private toastService: DynToastService,
    private af: AngularFire
  ) {  
    this.customersList = af.database.list('/customers');

    this.customersList.subscribe(data => { 
      this.customers = data
    });
  }
  
  getCustomers(): FirebaseListObservable<any> {
    return this.customersList;
  }

  getCustomer(id: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/customers/'+id);
  } 

  saveCustomer (customer: any) {

    if (customer.$key === 'new') {
      this.customerRef.push({ 'name': customer.name })
      .then(() => this.toastService.showToast({ Title: 'Save Customer', Msg: 'Customer Added', Type: 'success' }))
      .catch((e) => this.toastService.showToast({ Title: 'Save Customer', Msg: e.message, Type: 'error' }))
    } else {
      let item = this.af.database.object('/customers/'+customer.$key);
      item.update(customer)
      .then(() => this.toastService.showToast({ Title: 'Save Customer', Msg: 'Customer Updated', Type: 'success' }))
      .catch((e) => this.toastService.showToast({ Title: 'Save Customer', Msg: e.message, Type: 'error' }))
    }
  }
}