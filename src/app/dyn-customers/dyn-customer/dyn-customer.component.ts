import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { Observable }       from 'rxjs/Observable';
import { Router }   from '@angular/router';

import { Customer } from '../shared/dyn-customer.model';
import { CustomerService } from '../shared/dyn-customer.service';

@Component({
  selector: 'dyn-customers',
  templateUrl: './dyn-customer.component.html',
  styleUrls: ['./dyn-customer.component.css'],
  providers: [CustomerService]
})

export class CustomerComponent {
  errorMessage: string;
  customers: Customer[];

  constructor (
    private router: Router, 
    private customerService: CustomerService,
  ) { 

  }

  ngOnInit() {
    this.getCustomers();
 }

  getCustomers() {
    this.customerService.getCustomers()
                     .subscribe(
                       customers => this.customers = customers,
                       error =>  this.errorMessage = <any>error);
  }

  onSelect(customer: Customer) {
    this.router.navigate(['/customers', customer.id]);
  }
}
