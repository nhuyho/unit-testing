import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer-models';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  readonly API_CUSTOMER = 'http://localhost:3000/customers';
  constructor(private http: HttpClient) {}

  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API_CUSTOMER);
  }

  deleteCustomer(id: string) {
    return this.http.delete<Customer>(
      `${this.API_CUSTOMER}/${id}`,
      headerOption
    );
  }

  updateCustomer(id: string, customer: object): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.API_CUSTOMER}/${id}`,
      customer,
      headerOption
    );
  }
}
