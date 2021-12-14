import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

import { Customer } from '../models/customer-models';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  clickEvent() {
    throw new Error('Method not implemented.');
  }
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  customers!: Customer[];
  customerView!: Customer[];
  dialogOpened = false;
  isEdit = false;
  mySelection: string[] = [];
  customerForm!: FormGroup;
  confirmDelete: boolean = false;
  currentId!: string;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchData();
    this.customerForm = new FormGroup({
      id: new FormControl(''),
      companyName: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('^([a-zA-Z]|s)*$'),
      ]),
      jobTitle: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      contactName: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      country: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      city: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      address: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      phone: new FormControl(''),
      fax: new FormControl(''),
    });
  }

  fetchData() {
    this.customerService.getCustomer().subscribe((res) => {
      this.customers = res;
      this.customerView = this.customers;
    });
  }

  onFilter(inputValue: string) {
    this.customerView = process(this.customers, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'id',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ContactTitle',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'CompanyName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ContactName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'Phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'Address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }

  onEdit(customer: Customer) {
    this.currentId = customer.id;
    this.isEdit = true;
    this.customerForm.patchValue({
      id: customer.id,
      companyName: customer.CompanyName,
      jobTitle: customer.ContactTitle,
      contactName: customer.ContactName,
      country: customer.Country,
      city: customer.City,
      address: customer.Address,
      phone: customer.Phone,
      fax: customer.Fax,
    });
  }

  onSave() {
    const payload = {
      id: this.customerForm.value.id,
      CompanyName: this.customerForm.value.companyName,
      ContactName: this.customerForm.value.contactName,
      ContactTitle: this.customerForm.value.jobTitle,
      Country: this.customerForm.value.country,
      City: this.customerForm.value.city,
      Address: this.customerForm.value.address,
      Phone: this.customerForm.value.phone,
      Fax: this.customerForm.value.fax,
    };

    this.customerService
      .updateCustomer(this.customerForm.value.id, payload)
      .subscribe();
    this.isEdit = false;
  }

  close() {
    this.isEdit = false;
    this.dialogOpened = false;
  }

  clear() {
    this.customerForm.reset();
  }

  deleted(customer: Customer) {
    this.dialogOpened = true;
    this.currentId = customer.id;
  }

  deleteCustomer(id: string) {
    this.customerService.deleteCustomer(id).subscribe((data) => {});
  }

  get form() {
    return this.customerForm.controls;
  }
}
