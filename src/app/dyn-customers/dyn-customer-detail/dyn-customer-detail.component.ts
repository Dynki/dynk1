import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Customer } from '../shared/dyn-customer.model';
import { CustomerService } from '../shared/dyn-customer.service';
import { PhoneTypes } from '../shared/dyn-phone-types.enum';
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
  customerForm: FormGroup;
  phoneTypes = [{name: 'Mobile', value: 1}, {name: 'Land Line', value: 2}, {name: 'Business', value: 3}];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService,
    private fb: FormBuilder,
    public dialogService: DynDialogService
  ) { }

  ngOnInit() {

    this.createForm();

    this.route.params
      .switchMap((params: Params) => this.service.getCustomer(params['id']))
      .subscribe((customer: Customer) => {
        this.customer = customer[0]

        this.customerForm.patchValue({
          name: this.customer.name,
          addr1: this.customer.addr1,
          addr2: this.customer.addr2,
          addr3: this.customer.addr3,
          addr4: this.customer.addr4,
          addr5: this.customer.addr5,
          postcode: this.customer.postcode,
          
        });
      });
  }

  createForm() {
    this.customerForm = this.fb.group({
      name: '',
      addr1: '',
      addr2: '',
      addr3: '',
      addr4: '',
      addr5: '',
      postcode: '',
      phoneType: ['']
    });
  }

  saveCustomer() {
    const formModel = this.customerForm.value;
    this.customer.name = formModel.name as string;
    this.service.saveCustomer(this.customer);
    this.router.navigate(['/customers']);
  }


  deleteCustomer() {
    this.dialogService.confirm('Confirm Delete', 'Delete this customer, are you sure?')
      .subscribe(result => {
        if (result) {
          this.service.deleteCustomer(this.customer);
          this.router.navigate(['/customers']);
        }
      });
  }
}