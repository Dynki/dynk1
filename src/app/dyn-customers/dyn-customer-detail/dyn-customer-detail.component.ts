import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService
  ) {}
  
  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.service.getCustomer(+params['id']))
      .subscribe((customer: Customer) => this.customer = customer);
  }
}