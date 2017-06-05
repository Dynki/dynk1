import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Customer } from '../shared/dyn-customer.interface';
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
          addresses: this.customer.addresses ? this.customer.addresses : [],
          phoneNumbers: this.customer.phoneNumbers ? this.customer.phoneNumbers : []
        });
      });
  }

  createForm() {
    this.customerForm = this.fb.group({
      name: '',
      addresses: this.fb.array([
        this.initAddress(),
      ]),
      phoneNumbers: this.fb.array([
        this.initPhoneNumber(),
      ]),
    });
  }

  initAddress() {
    return this.fb.group({
      addr1: ['', Validators.required],
      addr2: [''],
      addr3: [''],
      addr4: [''],
      addr5: [''],
      postcode: ['']
    });
  }

  addAddress() {
    const control = <FormArray>this.customerForm.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.customerForm.controls['addresses'];
    control.removeAt(i);
  }

  initPhoneNumber() {
    return this.fb.group({
      type: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  addPhoneNumber() {
    const control = <FormArray>this.customerForm.controls['phoneNumbers'];
    control.push(this.initPhoneNumber());
  }

  removePhoneNumber(i: number) {
    const control = <FormArray>this.customerForm.controls['phoneNumbers'];
    control.removeAt(i);
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