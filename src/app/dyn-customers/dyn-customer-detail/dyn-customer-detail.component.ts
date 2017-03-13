import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Customer } from '../shared/dyn-customer.model';
import { CustomerService } from '../shared/dyn-customer.service'

@Component({
  selector: 'dyn-customer-detail',
  templateUrl: './dyn-customer-detail.component.html',
  providers: [CustomerService]
})
export class CustomerDetailComponent {

  customer: Customer;
  customerId: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService
  ) {}
  
  ngOnInit() {
    
    this.route.params
      .switchMap((params: Params) => this.service.getCustomer(params['id']))
      .subscribe((customer: Customer) => { 
        this.customer = customer 
      });
  }

  onUpdate() {
    // this.service.updateCustomer(this.customer).subscribe(
    //    data => {
    //      // refresh the list
    //      return true;
    //    },
    //    error => {
    //      console.error("Error saving client!");
    //      console.log(error);
    //      return false;
    //    }
    // );
  }

  saveCustomer(){
    this.service.saveCustomer(this.customer);
    this.router.navigate(['/customers']);
 }
}