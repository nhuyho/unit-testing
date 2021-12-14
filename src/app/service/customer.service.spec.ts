import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { Customer } from '../models/customer-models';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });

    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });

  it('get customer should return expected data', fakeAsync(() => {
    const expectedData: Customer[] = [
      {
        id: 'ALFKI',
        CompanyName: 'Alfreds Futterkiste',
        ContactName: 'Maria Anders',
        ContactTitle: 'Sales Representative',
        Address: 'Obere Str. 57',
        City: 'Berlinn hihi',
        Region: null,
        PostalCode: '12209',
        Country: 'Germany',
        Phone: '030-0074321',
        Fax: '030-0076545',
      },
    ];

    service.getCustomer().subscribe((data) => {
      expect(data).toEqual(expectedData);
      // done();
    });
    const getRequest = httpTestingController.expectOne(
      'http://localhost:3000/customers'
    );
    expect(getRequest.request.method).toBe('GET');
    // getRequest.flush(expectedData);
    // tick();
  }));

  it('can test for 404 error', () => {
    const emsg = 'deliberate 404 error';
    const url = 'http://localhost:3000/customers';
    httpClient.get<Customer[]>(url).subscribe(
      (data: any) => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );
    const req = httpTestingController.expectOne(url);
    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('should remove the indicated hero from the customer list', () => {
    service.deleteCustomer('ALFKI').subscribe((data: any) => {
      expect(data).toBe(3);
    });
    const req = httpTestingController.expectOne(
      `http://localhost:3000/customers/ALFKI`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(3);
    httpTestingController.verify();
  });

  it('should update the correct data', () => {
    service
      .updateCustomer('ALFKI', { CompanyName: 'CompanyName' })
      .subscribe((data: any) => {
        expect(data.CompanyName).toBe('CompanyName');
      });
    const req = httpTestingController.expectOne(
      `http://localhost:3000/customers/ALFKI`
    );
    expect(req.request.method).toBe('PATCH');
    req.flush({
      CompanyName: 'CompanyName',
    });
    httpTestingController.verify();
  });
});
