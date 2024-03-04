import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Customer, CustomerOrder, CustomerPurchases, CustomerRequest } from '../models/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly API = environment.apiUrl;

  constructor(private http: HttpClient) { }
    requestCustomerOrder(request: CustomerOrder): Observable<CustomerPurchases[]> {
      return this.http.post<any>(`/api/Customer/customer-order`, request);
    }

    getCustomerPurchases(id: number): Observable<CustomerPurchases[]> {
      return this.http.get<CustomerPurchases[]>(`/api/Customer/customer-purchase/${id}`);
    }

    geteCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(`/api/Customer`);
    }

    getCustomer(id: number): Observable<Customer> {
      return this.http.get<Customer>(`/api/Customer/${id}`);
    }

    updateCustomer(id: number, request: CustomerRequest): Observable<Customer> {
      return this.http.put<Customer>(`/api/Customer/${id}`, request);
    }

    addCustomer(request: CustomerRequest): Observable<Customer[]> {
      return this.http.post<Customer[]>(`/api/Customer`, request);
    }

    deleteCustomer(id: number): Observable<Customer> {
      return this.http.delete<Customer>(`/api/Customer/${id}`);
    }
  }
