import * as firebase from 'firebase';
import { Injectable }              from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/toPromise';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

import { Customer } from './dyn-customer.model';
import { DynToastService } from '../../dyn-shell/shared/dyn-toast.service';

@Injectable()
export class CustomerService {
  private customersList: FirebaseListObservable<any>;
  private customerRef = firebase.database().ref('/customers');
  private customers;

  constructor (
    private toastService: DynToastService,
    private db: AngularFireDatabase
  ) {  
    this.customersList = db.list('/customers');

    this.customersList.subscribe(data => { 
      this.customers = data
    });
  }
  
  getCustomers(): FirebaseListObservable<any> {
    return this.customersList;
  }

  getCustomer(id: string): FirebaseListObservable<any> {
    return this.db.list('/customers/', {
      query: { 
        orderByKey: true,
        equalTo: id
      }
    });
  } 

  saveCustomer (customer: any) {

    if (customer.$key === 'new') {
      this.customerRef.push({ 'name': customer.name })
        .then(() => this.toastService.showToast({ Title: 'Save Customer', Msg: 'Customer Added', Type: 'success' }))
        .catch((e) => this.toastService.showToast({ Title: 'Save Customer', Msg: e.message, Type: 'error' }))
    } else {
      let item = this.db.list('/customers/', {
        query: { 
          orderByKey: true,
          equalTo: customer.$key
        }
      });

      item.update(customer.$key, customer)
        .then(() => this.toastService.showToast({ Title: 'Save Customer', Msg: 'Customer Updated', Type: 'success' }))
        .catch((e) => this.toastService.showToast({ Title: 'Save Customer', Msg: e.message, Type: 'error' }))
    }
  }

  deleteCustomer(customer: any){
    let item = this.db.list('/customers/', {
      query: { 
        orderByKey: true,
        equalTo: customer.$key
      }
    });

    item.remove()
      .then(() => this.toastService.showToast({ Title: 'Delete Customer', Msg: 'Customer Deleted', Type: 'success' }))
      .catch((e) => this.toastService.showToast({ Title: 'Delete Customer', Msg: e.message, Type: 'error' }))
  }
}