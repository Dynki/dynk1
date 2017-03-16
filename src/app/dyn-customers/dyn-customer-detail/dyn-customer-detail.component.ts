import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Customer } from '../shared/dyn-customer.model';
import { CustomerService } from '../shared/dyn-customer.service'
import { DynDialogService } from '../../dyn-shell/dyn-confirm/dyn-confirm.service';

@Component({
  selector: 'dyn-customer-detail',
  templateUrl: './dyn-customer-detail.component.html',
  providers: [CustomerService, DynDialogService]
})
export class CustomerDetailComponent {

  customer: Customer;
  customerId: String;
  result: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService,
    public dialogService: DynDialogService
  ) {}
  
  ngOnInit() {
    
    this.route.params
      .switchMap((params: Params) => this.service.getCustomer(params['id']))
      .subscribe((customer: Customer) => { 
        this.customer = customer 
      });
  }

  saveCustomer(){
    this.service.saveCustomer(this.customer);
    this.router.navigate(['/customers']);
  }

  deleteCustomer(){
    this.dialogService.confirm('Confirm Delete', 'Delete this customer, are you sure?') 
    .subscribe(result => {
      if (result) {
        this.service.deleteCustomer(this.customer);
        this.router.navigate(['/customers']);
      }
    });
  }
}