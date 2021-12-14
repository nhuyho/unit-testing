import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CustomerService } from '../service/customer.service';
import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let editBtn: any;
  let service: CustomerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [CustomerService],
      declarations: [CustomerListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    service = TestBed.inject(CustomerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have getData function', async () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });

  // it('should call the edit button ', () => {
  //   spyOn(component, 'onEdit');
  //   component.onFilter(params.customer);
  //   fixture.whenStable().then(() => {
  //     expect(component.onEdit).toHaveBeenCalled();
  //   });
  // });

  it('form valid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should disable the button when form is empty', () => {
    fixture.whenStable().then(() => {
      const button =
        fixture.debugElement.nativeElement.querySelector('#save-btn');
      button.triggerEventHandler('click', null);
      expect(button.disabled).toBeTruthy();
    });
  });

  it('should enable button when form is not empty', () => {
    fixture.whenStable().then(() => {
      const button =
        fixture.debugElement.nativeElement.querySelector('#save-btn');
      button.triggerEventHandler('click', null);
      expect(button.disabled).toBeFalsy();
    });
  });

  // it('should click edit button', async () => {
  //   fixture.whenStable().then(() => {
  //     const el = fixture.debugElement.nativeElement;
  //     const btnEdit = el.querySelector('#edit-btn');
  //     spyOn(component, 'updateCustomer');
  //     btnEdit.click();
  //     fixture.detectChanges();
  //     component.customerForm.setValue({
  //       id: 'ALFKI',
  //       companyName:
  //         'component.formOrders.controls.ShipVia.markAllAsTouched();',
  //       contactName: 'Maria Anders',
  //       contactTitle: 'Sales Representative',
  //       address: 'Obere Str. 57',
  //       city: 'Berlinn hihi',
  //       // Region: null,
  //       // PostalCode: '12209',
  //       country: 'Germany',
  //       phone: '030-0074321',
  //       fax: '030-0076545',
  //     });
  //     const btnUpdate = el.querySelector('#save-btn');
  //     component.customerForm.controls.companyName.markAllAsTouched();
  //     expect(btnUpdate.disabled).toBe(true);
  //     expect(component.customerForm).toHaveBeenCalled();
  //   });
  // });
  it('should fetch data', () => {
    const spy = spyOn(component, 'fetchData');
    component.fetchData();
    expect(spy).toHaveBeenCalled();
  });

  it('should check form is submitted', () => {
    // check form is invalid
    fixture.whenStable().then(() => {
      const el = fixture.debugElement.nativeElement;
      editBtn = el.querySelector('#edit-btn');
      spyOn(component, 'onEdit');
      editBtn.click();
      expect(component.customerForm.invalid).toBeTruthy();
      component.customerForm.setValue({
        id: 'ALFKI',
        companyName: '',
        contactName: 'Maria Anders',
        jobTitle: 'Sales Representative',
        address: 'Obere Str. 57',
        city: 'Berlinn hihi',
        country: 'Germany',
        phone: '030-0074321',
        fax: '030-0076545',
      });
      const button =
        fixture.debugElement.nativeElement.querySelector('#save-btn');
      button.triggerEventHandler('click', null);

      expect(button.disabled).toBeFalsy();
      fixture.detectChanges();
      component.onSave();
      fixture.detectChanges();
    });
  });

  // company name
  it('company name is not valid: empty', () => {
    const companyName = component.customerForm.controls.companyName;
    companyName.setValue('');

    component.customerForm.controls.companyName.markAllAsTouched();
    fixture.detectChanges();

    expect(companyName.hasError('required')).toBeFalsy();
  });

  it('company name is not number', () => {
    const companyName = component.customerForm.controls.companyName;
    companyName.setValue('hau ng da');

    companyName.markAllAsTouched();
    fixture.detectChanges();

    expect(companyName.hasError('pattern')).toBeTruthy();
  });

  it('company name not valid: less than 5 characters', () => {
    const companyName = component.customerForm.controls.companyName;
    companyName.setValue('nota');

    companyName.markAllAsTouched();
    fixture.detectChanges();

    expect(companyName.hasError('minlength')).toBeTruthy();
  });

  // contact name
  it('contact name is not valid: empty', () => {
    const contactName = component.customerForm.controls.contactName;
    contactName.setValue('');
    contactName.markAllAsTouched();
    fixture.detectChanges();
    expect(contactName.hasError('required')).toBeFalsy();
  });

  // job title
  it('jobTitle is not valid: empty', () => {
    const jobTitle = component.customerForm.controls.jobTitle;
    jobTitle.setValue('');
    jobTitle.markAllAsTouched();
    fixture.detectChanges();
    expect(jobTitle.hasError('required')).toBeFalsy();
  });

  it('should delete data', () => {
    fixture.whenStable().then(() => {
      const el = fixture.debugElement.nativeElement;
      let deleteBtn = el.querySelector('#delete-btn');
      spyOn(component, 'deleted');
      deleteBtn.click();
      // service.deleteCustomer('ALFKI');
      // expect(component.customerView.length).toBeLessThan(1);
    });
  });
});
